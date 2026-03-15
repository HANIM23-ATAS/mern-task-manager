import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, LayoutDashboard, ClipboardList, RefreshCcw, CheckCircle2 } from 'lucide-react';
import api from '../api';
import { Toaster, toast } from 'react-hot-toast';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // States for filtering
    const [filterCategory, setFilterCategory] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch Tasks
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data.data);
        } catch (err) {
            toast.error('Görevler yüklenirken hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            // Optimistic upate
            const updatedTasks = tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t);
            setTasks(updatedTasks);

            // Request
            await api.put(`/tasks/${taskId}`, { status: newStatus });
            toast.success('Görev durumu güncellendi');
        } catch (err) {
            toast.error('Hata: Durum güncellenemedi!');
            // revert string
            fetchTasks();
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            if (!window.confirm('Bu görevi silmek istediğinize emin misiniz?')) return;

            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(t => t._id !== taskId));
            toast.success('Görev silindi.');
        } catch (err) {
            toast.error('Görev silinirken hata oluştu!');
        }
    }

    const handleCreateTask = async (taskData) => {
        try {
            const res = await api.post('/tasks', taskData);
            setTasks([res.data.data, ...tasks]);
            toast.success('Görev başarıyla eklendi!');
            setIsModalOpen(false);
        } catch (err) {
            toast.error(err.response?.data?.error?.[0] || 'Görev eklenirken hata oluştu!');
        }
    }

    // Filtering Logic
    const filteredTasks = tasks.filter(task => {
        const matchesCategory = filterCategory ? task.tags?.includes(filterCategory) : true;
        const matchesPriority = filterPriority ? task.priority === filterPriority : true;
        const matchesSearch = searchQuery ? task.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return matchesCategory && matchesPriority && matchesSearch;
    });

    const todoTasks = filteredTasks.filter(t => t.status === 'todo');
    const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress');
    const doneTasks = filteredTasks.filter(t => t.status === 'done');


    // Derived States for Summary Cards
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;

    // Custom logic for overdue and completed today based on dates
    const today = new Date();
    const overdueTasks = tasks.filter(t => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < today).length;
    const completedToday = tasks.filter(t => {
        if (t.status !== 'done') return false;
        const updatedAt = new Date(t.updatedAt);
        return updatedAt.getDate() === today.getDate() &&
            updatedAt.getMonth() === today.getMonth() &&
            updatedAt.getFullYear() === today.getFullYear();
    }).length;

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Header & Summary Cards */}
            <div className="bg-cardBg rounded-xl p-6 shadow-sm border border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3 text-primary">
                    <LayoutDashboard size={28} />
                    <h1 className="text-2xl font-bold uppercase tracking-wider text-white">Dashboard</h1>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
                    {/* Toplam */}
                    <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
                        <span className="text-sm font-medium">Toplam</span>
                        <span className="text-2xl font-bold">{totalTasks}</span>
                    </div>

                    {/* Tamamlanan */}
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-3 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
                        <span className="text-sm font-medium">Tamamlanan</span>
                        <span className="text-2xl font-bold">{completedTasks}</span>
                    </div>

                    {/* Geciken */}
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
                        <span className="text-sm font-medium">Geciken</span>
                        <span className="text-2xl font-bold">{overdueTasks}</span>
                    </div>

                    {/* Bugün Biten */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-6 py-3 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
                        <span className="text-sm font-medium">Bugün Biten</span>
                        <span className="text-2xl font-bold">{completedToday}</span>
                    </div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="bg-cardBg rounded-xl p-4 shadow-sm border border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="relative">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="appearance-none bg-darkBg text-slate-300 border border-slate-600 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                        >
                            <option value="">Tüm Kategoriler</option>
                            <option value="İş">İş</option>
                            <option value="Okul">Okul</option>
                            <option value="Kişisel">Kişisel</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                            <Filter size={16} />
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="appearance-none bg-darkBg text-slate-300 border border-slate-600 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                        >
                            <option value="">Tüm Öncelikler</option>
                            <option value="urgent">Acil</option>
                            <option value="high">Yüksek</option>
                            <option value="medium">Orta</option>
                            <option value="low">Düşük</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                            <Filter size={16} />
                        </div>
                    </div>

                    <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Görev ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg leading-5 bg-darkBg text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
                        />
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-auto bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                    <Plus size={20} />
                    <span>Yeni</span>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-6 lg:h-[70vh]">
                    {/* Columns */}
                    <TaskColumn
                        title="Yapılacak"
                        count={todoTasks.length}
                        tasks={todoTasks}
                        borderColor="border-orange-500/50"
                        icon={<ClipboardList size={20} className="text-orange-400" />}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteTask}
                    />
                    <TaskColumn
                        title="Devam Ediyor"
                        count={inProgressTasks.length}
                        tasks={inProgressTasks}
                        borderColor="border-blue-500/50"
                        icon={<RefreshCcw size={20} className="text-blue-400" />}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteTask}
                    />
                    <TaskColumn
                        title="Tamamlandı"
                        count={doneTasks.length}
                        tasks={doneTasks}
                        borderColor="border-green-500/50"
                        icon={<CheckCircle2 size={20} className="text-green-400" />}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteTask}
                    />
                </div>
            )}

            {/* Task Creation Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateTask}
            />

            <Toaster position="bottom-right" />
        </div>
    );
}

export default Dashboard;

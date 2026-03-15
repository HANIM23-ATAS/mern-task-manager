import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

function TaskModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [status, setStatus] = useState('todo');
    const [dueDate, setDueDate] = useState('');
    const [tags, setTags] = useState('');
    const [subtasks, setSubtasks] = useState([]);

    if (!isOpen) return null;

    const handleAddSubtask = () => {
        setSubtasks([...subtasks, { title: '', isCompleted: false }]);
    };

    const handleSubtaskChange = (index, value) => {
        const updated = [...subtasks];
        updated[index].title = value;
        setSubtasks(updated);
    };

    const handleRemoveSubtask = (index) => {
        const updated = subtasks.filter((_, i) => i !== index);
        setSubtasks(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        // tags array 
        const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
        // remove empty subtasks
        const validSubtasks = subtasks.filter(st => st.title.trim() !== '');

        const taskData = {
            title,
            description,
            priority,
            status,
            dueDate: dueDate || null,
            tags: tagArray,
            subtasks: validSubtasks
        };

        onSave(taskData);

        // Reset Form
        setTitle('');
        setDescription('');
        setPriority('medium');
        setStatus('todo');
        setDueDate('');
        setTags('');
        setSubtasks([]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-cardBg border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Yeni Görev Ekle</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Başlık & Durum */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Görev Başlığı *</label>
                            <input
                                type="text"
                                autoFocus
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-darkBg border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none"
                                placeholder="Görev adı..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Durum</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-darkBg border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none"
                            >
                                <option value="todo">Yapılacak</option>
                                <option value="in-progress">Devam Ediyor</option>
                                <option value="done">Tamamlandı</option>
                            </select>
                        </div>
                    </div>

                    {/* Açıklama */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Açıklama</label>
                        <textarea
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-darkBg border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none resize-none"
                            placeholder="Görev detayı (opsiyonel)..."
                        ></textarea>
                    </div>

                    {/* Öncelik & Bitiş Tarihi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Öncelik</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full bg-darkBg border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none"
                            >
                                <option value="low">Düşük</option>
                                <option value="medium">Orta</option>
                                <option value="high">Yüksek</option>
                                <option value="urgent">Acil</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Bitiş Tarihi</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full bg-darkBg border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    {/* Etiketler */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Kategori / Etiketler (Virgülle ayırın)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full bg-darkBg border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none"
                            placeholder="Örn: İş, Okul, Proje..."
                        />
                    </div>

                    {/* Alt Görevler */}
                    <div className="pt-2 border-t border-slate-700/50">
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-slate-400">Alt Görevler</label>
                            <button
                                type="button"
                                onClick={handleAddSubtask}
                                className="text-primary text-sm flex items-center gap-1 hover:text-blue-400 transition-colors bg-blue-500/10 px-3 py-1.5 rounded"
                            >
                                <Plus size={16} /> Ekle
                            </button>
                        </div>

                        <div className="space-y-2">
                            {subtasks.map((st, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <div className="w-6 h-6 rounded flex items-center justify-center border border-slate-600 bg-slate-800 text-slate-500">
                                        <span className="text-xs">{index + 1}</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={st.title}
                                        onChange={(e) => handleSubtaskChange(index, e.target.value)}
                                        className="flex-1 bg-darkBg border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-primary focus:border-transparent focus:outline-none"
                                        placeholder="Alt görev açıklaması..."
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSubtask(index)}
                                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            {subtasks.length === 0 && (
                                <div className="text-sm text-slate-500 italic block">Hiç alt görev eklenmedi.</div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 flex justify-end gap-3 border-t border-slate-700/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg font-medium bg-slate-700 text-white hover:bg-slate-600 transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg font-medium bg-primary text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all"
                        >
                            Görevi Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;

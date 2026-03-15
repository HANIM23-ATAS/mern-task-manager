import React from 'react';
import { formatDistanceToNow, isPast, format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { AlertCircle, CalendarClock, ListTodo, Trash2 } from 'lucide-react';

// Tailwind utils for colors based on priority
const priorityColors = {
    urgent: 'bg-red-500/20 text-red-500 border border-red-500/30',
    high: 'bg-orange-500/20 text-orange-500 border border-orange-500/30',
    medium: 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30',
    low: 'bg-blue-500/20 text-blue-500 border border-blue-500/30',
};

const priorityLabels = {
    urgent: 'Acil',
    high: 'Yüksek',
    medium: 'Orta',
    low: 'Düşük',
};

function TaskCard({ task, onStatusChange, onDelete }) {
    // calculate subtasks ratio
    const completedSubtasks = task.subtasks?.filter(st => st.isCompleted).length || 0;
    const totalSubtasks = task.subtasks?.length || 0;

    // Due date logic
    const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'done';
    const dueDateDisplay = task.dueDate
        ? (isOverdue
            ? `Gecikmiş: ${formatDistanceToNow(new Date(task.dueDate), { addSuffix: true, locale: tr })}`
            : format(new Date(task.dueDate), 'd MMM yyyy', { locale: tr })
        )
        : null;

    return (
        <div className="bg-cardBg p-4 border border-slate-700 rounded-lg shadow-sm hover:border-slate-500 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing mb-3 group relative">

            {/* Absolute Delete Button - Visible on hover */}
            <button
                onClick={() => onDelete(task._id)}
                className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                title="Görevi Sil"
            >
                <Trash2 size={16} />
            </button>

            {/* Title & priority */}
            <h3 className={`font-semibold pr-8 text-lg mb-2 ${task.status === 'done' ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                {task.title}
            </h3>

            {/* Tags & Priority */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${priorityColors[task.priority]}`}>
                    {priorityLabels[task.priority]}
                </span>

                {task.tags && task.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-md font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Due date & Subtask progress */}
            <div className="flex items-center justify-between text-xs text-slate-400 mt-4 border-t border-slate-700/50 pt-3">
                {dueDateDisplay && (
                    <div className={`flex items-center gap-1.5 ${isOverdue ? 'text-red-400 font-medium' : ''}`}>
                        {isOverdue ? <AlertCircle size={14} /> : <CalendarClock size={14} />}
                        <span>{dueDateDisplay}</span>
                    </div>
                )}
                {!dueDateDisplay && <div></div> /* empty flex spacer */}

                {totalSubtasks > 0 && (
                    <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-md">
                        <ListTodo size={14} className={completedSubtasks === totalSubtasks ? 'text-green-400' : 'text-primary'} />
                        <span>{completedSubtasks}/{totalSubtasks}</span>
                    </div>
                )}
            </div>

            {/* Quick Actions (Opacity 0 by default, hover to show) */}
            <div className="mt-3 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                {task.status !== 'done' && (
                    <button
                        onClick={() => onStatusChange(task._id, task.status === 'todo' ? 'in-progress' : 'done')}
                        className="text-xs text-white bg-primary/20 hover:bg-primary/40 px-2 py-1 rounded transition-colors"
                    >
                        {task.status === 'todo' ? 'Devam Edenlere Taşı' : 'Tamamla'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default TaskCard;

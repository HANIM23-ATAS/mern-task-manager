import React from 'react';
import TaskCard from './TaskCard';

function TaskColumn({ title, count, icon, borderColor, tasks, onStatusChange, onDelete }) {
    return (
        <div className={`flex flex-col flex-1 min-w-[300px] border-2 ${borderColor} rounded-xl bg-darkBg/50 overflow-hidden`}>
            {/* Column Header */}
            <div className={`p-4 border-b ${borderColor} bg-slate-800/30 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    {icon}
                    <h2 className="font-bold text-lg text-slate-200">{title}</h2>
                </div>
                <span className="bg-slate-700 text-slate-300 text-xs font-bold px-2 py-1 rounded-full">
                    {count}
                </span>
            </div>

            {/* Column Body: Scrollable list of tasks */}
            <div className="p-3 flex-1 overflow-y-auto h-[600px] max-h-[70vh]">
                {tasks.length === 0 ? (
                    <div className="text-center p-6 text-slate-500 text-sm border-2 border-dashed border-slate-700 rounded-lg mt-2">
                        Bu alanda görev bulunmuyor.
                    </div>
                ) : (
                    tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TaskColumn;

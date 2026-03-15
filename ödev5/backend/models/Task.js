const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Alt görev başlığı zorunludur']
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Görev başlığı zorunludur'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    tags: [{
        type: String,
        trim: true
    }],
    dueDate: {
        type: Date
    },
    subtasks: [SubtaskSchema]
}, {
    timestamps: true // createdAt ve updatedAt otomatik eklenecek
});

module.exports = mongoose.model('Task', TaskSchema);

const Task = require('../models/Task');

// @desc    Tüm görevleri getir
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); // En yeni en üstte
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Sunucu Hatası: Görevler getirilemedi.'
        });
    }
};

// @desc    Tek bir görev getir
// @route   GET /api/tasks/:id
// @access  Public
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Görev bulunamadı.'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Sunucu Hatası: Görev getirilemedi.'
        });
    }
};

// @desc    Yeni görev oluştur
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (err) {
        // Validation hatalarını yakala
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Sunucu Hatası: Görev oluşturulamadı.'
            });
        }
    }
};

// @desc    Görev güncelle (Status, başlık vb.)
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Görev bulunamadı.'
            });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true // Modele eklediğimiz validasyonları çalıştırır
        });

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Sunucu Hatası: Görev güncellenemedi.'
        });
    }
};

// @desc    Görev sil
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Görev bulunamadı.'
            });
        }

        await task.deleteOne(); // Mongoose 6+ için silme yöntemi

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Sunucu Hatası: Görev silinemedi.'
        });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};

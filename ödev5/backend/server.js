const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Route dosyalarını içe aktar
const taskRoutes = require('./routes/taskRoutes');

// Çevre değişkenlerini yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Veritabanı Bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Bağlantısı Başarılı.'))
    .catch((err) => console.error('❌ MongoDB Bağlantı Hatası:', err));

// Routes
app.use('/api/tasks', taskRoutes);

// Temel API Test Route
app.get('/api', (req, res) => {
    res.json({ message: 'Task Manager API Çalışıyor! 🚀' });
});

app.listen(PORT, () => {
    console.log(`📡 Sunucu ${PORT} portunda çalışmaya başladı.`);
});

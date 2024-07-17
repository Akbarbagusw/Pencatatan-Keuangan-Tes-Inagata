const connection = require('../config/Database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.login = (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({
                status: false,
                message: 'Login gagal, email tidak ditemukan.'
            });
        }

        const user = results[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                status: false,
                message: 'Login gagal, password salah.'
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            status: true,
            data: token,
            message: 'Login berhasil.'
        });
    });
};

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            return res.status(400).json({
                status: false,
                message: 'Email sudah digunakan.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, results) => {
            if (err) throw err;

            res.json({
                status: true,
                message: 'Registrasi berhasil.'
            });
        });
    });
};
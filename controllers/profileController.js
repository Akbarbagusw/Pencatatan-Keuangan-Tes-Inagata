const connection = require('../config/Database');

exports.updateProfile = (req, res) => {
    const { name, email } = req.body;

    connection.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, req.user.id],
        (err, results) => {
            if (err) throw err;

            res.json({
                status: true,
                data: req.user.id,
                message: 'Update profil sukses.'
            });
        }
    );
};

exports.getLoggedInProfile = (req, res) => {
    connection.query('SELECT id, name, email FROM users WHERE id = ?', [req.user.id], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Data profil tidak ditemukan.'
            });
        }

        res.json({
            status: true,
            data: results[0],
            message: 'Get profil sukses.'
        });
    });
};

exports.getAllProfiles = (req, res) => {
    connection.query('SELECT id, name, email FROM users ',  (err, results) => {
        if (err) throw err;

        res.json({
            status: true,
            data: results,
            message: 'Get all profiles sukses.'
        });
    });
};
const connection = require('../config/Database');

exports.addTransaction = (req, res) => {
    const { amount, category } = req.body;

    connection.query(
        'INSERT INTO transactions (userId, amount, category) VALUES (?, ?, ?)',
        [req.user.id, amount, category],
        (err, results) => {
            if (err) throw err;

            res.json({
                status: true,
                data: results.insertId,
                message: 'Transaksi berhasil ditambahkan.'
            });
        }
    );
};

exports.updateTransaction = (req, res) => {
    const { transactionId, amount, category } = req.body;

    connection.query(
        'SELECT * FROM transactions WHERE id = ? AND userId = ?',
        [transactionId, req.user.id],
        (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Transaksi tidak ditemukan'
                });
            }

            connection.query(
                'UPDATE transactions SET amount = ?, category = ? WHERE id = ?',
                [amount, category, transactionId],
                (err, results) => {
                    if (err) throw err;

                    res.json({
                        status: true,
                        data: transactionId,
                        message: 'Update transaksi sukses.'
                    });
                }
            );
        }
    );
};
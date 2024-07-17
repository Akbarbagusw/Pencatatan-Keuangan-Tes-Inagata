const connection = require('../config/Database');

exports.getAllUsersWithTransactions = (req, res) => {
    connection.query(
        `SELECT 
            u.id AS user_id, 
            u.name AS user_name, 
            u.email AS user_email, 
            t.id AS transaction_id, 
            t.amount, 
            t.category 
        FROM users u 
        LEFT JOIN transactions t ON u.id = t.userId`,
        (err, results) => {
            if (err) throw err;

            const users = {};
            results.forEach(row => {
                if (!users[row.user_id]) {
                    users[row.user_id] = {
                        id: row.user_id,
                        name: row.user_name,
                        email: row.user_email,
                        transactions: []
                    };
                }
                if (row.transaction_id) {
                    users[row.user_id].transactions.push({
                        id: row.transaction_id,
                        amount: row.amount,
                        category: row.category
                    });
                }
            });

            const userList = Object.values(users);

            res.json({
                status: true,
                data: userList,
                message: 'Get list user dan transaksi sukses.'
            });
        }
    );
};

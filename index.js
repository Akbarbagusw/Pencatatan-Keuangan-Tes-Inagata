const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const transactionRoutes = require('./routes/transaction');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(profileRoutes);
app.use(transactionRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

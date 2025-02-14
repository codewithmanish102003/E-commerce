const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
// const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

require('dotenv').config();

const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/indexRouter');

const db = require('./config/mongoose_connection');


app.use(flash());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET || 'default_secret',
    })
);

app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/owners', ownersRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
require('dotenv').config();
const express = require("express");
const productsRouter = require('./components/products');
const app = express();
const cors = require('cors');


app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/produtos', productsRouter);

app.options('*', cors());

const PORT = 3000;
app.listen(PORT, () => {
   console.log("Server is up on port " + PORT);
});

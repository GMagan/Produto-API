require('dotenv').config();
const express = require("express");
const productsRouter = require('./components/products');
const app = express();

app.use(express.json());
app.use('/produtos', productsRouter);

const PORT = 3000;
app.listen(PORT, () => {
   console.log("Server is up in " + PORT);
});
const express = require('express');
const debug = require('debug')('app:main');

const { Config } = require("./src/config/index");
const { ProductsAPI } = require("./src/products");
const { UsersAPI } = require("./src/users");

const PORT = Config.port;

const app = express();
app.use(express.json());

ProductsAPI(app);
UsersAPI(app);

app.listen( PORT, () => {
    debug(`Server running on port ${PORT}`)
})
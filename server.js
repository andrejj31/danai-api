const app = require("./app");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const port = process.env.PORT || 3080;

const fs = require("fs");

const path = require("path");



dotenv.config({ path: "./config.env" });

const DB = 'mongodb+srv://danaifarm:Andrejue@cluster0.lmlfv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// const DB = process.env.DATABASE.replace(

//   "<PASSWORD>",

//   process.env.DATABASE_PASSWORD

// );



mongoose

  .connect(DB, {

    useUnifiedTopology: true,

    autoIndex: true,

  })

  .then(() => console.log("DB connection successful"))

  .catch((err) => console.log(err));



app.listen(port, () => {

  console.log(`Server listening on the port::${port}`);

});


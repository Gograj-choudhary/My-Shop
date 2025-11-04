const {Sequelize} = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME || "myshoplocal",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
    }
);

( async () => {
    try{
        await db.authenticate();
        console.log("MySQL Database connected successfully ");
    }catch(err){
        console.error("Unable to connect to database", err);
    }
})();

module.exports = db;


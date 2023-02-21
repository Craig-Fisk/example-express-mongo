const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.db_connection);
        console.log("DB connection successful");
    } catch (error) {
        console.log(error);
    }
};
connection();

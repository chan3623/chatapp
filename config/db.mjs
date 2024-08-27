import mySQL from 'mysql2';
import dotenv from 'dotenv';
dotenv.configDotenv({path:'./config/.env'});

const db_info = {
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
}

const connection = mySQL.createConnection(db_info);

connection.connect(err => {
    if(err) throw err;
    console.log("Connected to the database!!");
});

export default connection;
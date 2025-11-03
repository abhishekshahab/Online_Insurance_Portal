import { createConnection } from "mysql2/promise";


let connection=null;
export async function connectDb(){
    try {
        connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'cdac',
            database: 'insurance_db',
            port: 7000
        });
        console.log("db connected");
    } catch (error) {
        console.log(error, "db connection error");
    }
};
export function getConnectionObject(){
    return connection;
}
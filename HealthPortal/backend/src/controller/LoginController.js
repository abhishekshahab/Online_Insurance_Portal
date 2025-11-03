import { getConnectionObject } from "../config/dbconfig.js";
import { ROLES } from "../constants/roleconstants.js";
import { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';


// USER REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password, phone, address) VALUES (?,?,?,?,?)",
      [name, email, hashed, phone, address]
    );
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export async function login(request, response) {
    try {
        const connection = getConnectionObject();
        const { phone, password, role } = request.body;
        const tableName  = role === ROLES.ADMIN ? 'admin' : 'customer';
        const qry = `SELECT * FROM ${tableName} WHERE phone='${phone}'`;
        const [rows] = await connection.query(qry);
        if (rows.length === 0) {
            response.status(400).send({ message: "Login failed, phone doesn't exist" });
        }
        else {
            if(compareSync(password,rows[0].password)){
                const token = jwt.sign({
                    userId:rows[0].id,
                    role:role
                } ,'user1234');
                response.status(200).send({token,message:'Login successful'});
            }
            else{
                response.status(400).send({ message: "Login failed, password is invalid" });
            }
            // compare the password
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
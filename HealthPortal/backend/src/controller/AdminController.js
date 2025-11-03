import { getConnectionObject } from "../configs/dbconfigs.js";

// Get all users
export async function getAllUsers(req, res) {
  try {
    const db = getConnectionObject();
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all policies purchased by a user
export async function getUserPolicies(req, res) {
  const user_id = req.params.user_id;
  try {
    const db = getConnectionObject();
    const [rows] = await db.query(
      `SELECT up.*, p.policy_name 
       FROM user_policies up 
       JOIN policies p ON up.policy_id = p.policy_id 
       WHERE up.user_id=?`,
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all claims of a user
export async function getUserClaims(req, res) {
  const user_id = req.params.user_id;
  try {
    const db = getConnectionObject();
    const [rows] = await db.query(
      `SELECT c.*, p.policy_name 
       FROM claims c 
       JOIN policies p ON c.policy_id = p.policy_id 
       WHERE c.user_id=?`,
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

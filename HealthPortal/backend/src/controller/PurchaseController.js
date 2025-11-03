import { getConnectionObject } from "../configs/dbconfigs.js";

// User purchases a policy
export async function purchasePolicy(req, res) {
  const { user_id, policy_id } = req.body;
  try {
    const db = getConnectionObject();
    await db.query("INSERT INTO user_policies (user_id, policy_id) VALUES (?,?)", [user_id, policy_id]);
    res.json({ message: "Policy purchased successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// User views their purchased policies
export async function getUserPurchases(req, res) {
  const user_id = req.params.user_id;
  try {
    const db = getConnectionObject();
    const [rows] = await db.query(
      `SELECT up.*, p.policy_name, p.premium_amount, p.duration_years
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

// Admin views all purchases
export async function getAllPurchases(req, res) {
  try {
    const db = getConnectionObject();
    const [rows] = await db.query(
      `SELECT up.*, u.name AS user_name, p.policy_name 
       FROM user_policies up 
       JOIN users u ON up.user_id = u.user_id 
       JOIN policies p ON up.policy_id = p.policy_id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

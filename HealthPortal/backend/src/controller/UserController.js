import { getConnectionObject } from "../configs/dbconfigs.js";

// Get user profile
export async function getUserProfile(req, res) {
  const user_id = req.params.user_id;
  try {
    const db = getConnectionObject();
    const [rows] = await db.query("SELECT * FROM users WHERE user_id=?", [user_id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update user profile
export async function updateUserProfile(req, res) {
  const user_id = req.params.user_id;
  const { name, email, phone, address } = req.body;
  try {
    const db = getConnectionObject();
    await db.query(
      "UPDATE users SET name=?, email=?, phone=?, address=? WHERE user_id=?",
      [name, email, phone, address, user_id]
    );
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

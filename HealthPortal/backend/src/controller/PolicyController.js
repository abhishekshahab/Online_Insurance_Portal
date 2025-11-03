import { getConnectionObject } from "../configs/dbconfigs.js";

// Get all policies
export async function getPolicies(req, res) {
  try {
    const db = getConnectionObject();
    const [rows] = await db.query("SELECT * FROM policies");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get policy by ID
export async function getPolicyById(req, res) {
  try {
    const db = getConnectionObject();
    const [rows] = await db.query("SELECT * FROM policies WHERE policy_id=?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Policy not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin adds a new policy
export async function addPolicy(req, res) {
  const { policy_name, short_desc, long_desc, premium_amount, duration_years } = req.body;
  try {
    const db = getConnectionObject();
    await db.query(
      "INSERT INTO policies (policy_name, short_desc, long_desc, premium_amount, duration_years) VALUES (?,?,?,?,?)",
      [policy_name, short_desc, long_desc, premium_amount, duration_years]
    );
    res.json({ message: "Policy added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin updates a policy
export async function updatePolicy(req, res) {
  const { id } = req.params;
  const { policy_name, short_desc, long_desc, premium_amount, duration_years } = req.body;
  try {
    const db = getConnectionObject();
    await db.query(
      "UPDATE policies SET policy_name=?, short_desc=?, long_desc=?, premium_amount=?, duration_years=? WHERE policy_id=?",
      [policy_name, short_desc, long_desc, premium_amount, duration_years, id]
    );
    res.json({ message: "Policy updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin deletes a policy
export async function deletePolicy(req, res) {
  try {
    const db = getConnectionObject();
    await db.query("DELETE FROM policies WHERE policy_id=?", [req.params.id]);
    res.json({ message: "Policy deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

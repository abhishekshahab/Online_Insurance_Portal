import { getConnectionObject } from "../configs/dbconfigs.js";

// User submits a claim
export async function submitClaim(req, res) {
  const { user_id, policy_id, claim_reason, claim_amount } = req.body;
  try {
    const db = getConnectionObject();
    await db.query(
      "INSERT INTO claims (user_id, policy_id, claim_reason, claim_amount) VALUES (?,?,?,?)",
      [user_id, policy_id, claim_reason, claim_amount]
    );
    res.json({ message: "Claim submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// User views their claims
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

// Admin views all claims
export async function getAllClaims(req, res) {
  try {
    const db = getConnectionObject();
    const [rows] = await db.query(
      `SELECT c.*, u.name AS user_name, p.policy_name 
       FROM claims c 
       JOIN users u ON c.user_id = u.user_id 
       JOIN policies p ON c.policy_id = p.policy_id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin updates claim status
export async function updateClaimStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const db = getConnectionObject();
    await db.query("UPDATE claims SET claim_status=? WHERE claim_id=?", [status, id]);
    res.json({ message: "Claim status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// backend/controllers/staffController.js
import { fetchMembersByRole, botReady } from "../services/presenceBot.js";

export const getMembersByRole = async (req, res) => {
  const { roleId } = req.params;

  try {
    const members = await fetchMembersByRole(roleId);

    return res.json({
      success: true,
      members
    });

  } catch (error) {
    console.log("❌ Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
      raw: error.stack,
      debug: {
        botReady,
        roleId,
      },
      members: []
    });
  }
};
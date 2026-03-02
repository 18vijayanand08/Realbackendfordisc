import { fetchMembersByRole, botReady } from "../services/presenceBot.js";

export const getMembersByRole = async (req, res) => {
  const roleId = req.params.roleId;

  if (!botReady) {
    return res.json({
      success: false,
      error: "Discord bot is starting up. Please wait...",
      members: []
    });
  }

  const result = await fetchMembersByRole(roleId);

  if (result.error) {
    return res.json({
      success: false,
      error: result.error,
      details: result.message,
      members: result.members || []
    });
  }

  return res.json({
    success: true,
    members: result.members
  });
};

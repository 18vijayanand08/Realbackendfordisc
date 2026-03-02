import { fetchMembersByRole } from "../services/presenceBot.js";
import { botReady } from "../services/presenceBot.js";

export const getMembersByRole = async (req, res) => {
  const { roleId } = req.params;

  // ❗ PREVENT 500 ERROR — Do NOT throw inside try/catch
  if (!botReady) {
    return res.status(200).json({
      success: false,
      error: "Discord bot is starting up. Please wait…",
      botReady: false,
      members: [],
      debug: {
        botReady,
        roleId
      }
    });
  }

  try {
    const members = await fetchMembersByRole(roleId);

    return res.status(200).json({
      success: true,
      botReady: true,
      count: members.length,
      members
    });

  } catch (err) {
    // ❗ STILL NO 500 ERROR — Always send status 200
    return res.status(200).json({
      success: false,
      botReady,
      error: err.message,
      members: [],
      debug: {
        botReady,
        roleId
      }
    });
  }
};

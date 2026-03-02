import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export let botReady = false;

// ==========================
// CLIENT SETUP (PRESENCE REMOVED)
// ==========================
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers   // ONLY this is required
  ],
  partials: [Partials.User, Partials.GuildMember]
});

// ==========================
// BOT LOGIN
// ==========================
async function startBot() {
  try {
    console.log("🔄 Logging in bot...");
    await client.login(process.env.BOT_TOKEN);
  } catch (err) {
    console.error("❌ Bot login failed:", err);
  }
}

startBot();

// ==========================
// READY EVENT
// ==========================
client.on("ready", () => {
  botReady = true;
  console.log(`⚡ Bot logged in as ${client.user.tag}`);
});

// ==========================
// FETCH MEMBERS BY ROLE
// ==========================
export const fetchMembersByRole = async (roleId) => {
  if (!botReady) return { error: "Bot not ready yet.", members: [] };

  try {
    const guild = await client.guilds.fetch(process.env.SERVER_ID);

    // Fetch ALL members (SAFE — no presence)
    await guild.members.fetch();

    const role = guild.roles.cache.get(roleId);
    if (!role) {
      return { error: "Role not found", members: [] };
    }

    const members = role.members.map(member => ({
      id: member.id,
      username: member.user.username,
      avatar: member.user.avatar
        ? `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${Number(member.id) % 5}.png`
    }));

    return { members };

  } catch (err) {
    return {
      error: "Failed to fetch role members",
      message: err?.message,
      members: []
    };
  }
};

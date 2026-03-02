// backend/services/presenceBot.js
import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export let botReady = false;

// ==========================
// CLIENT SETUP
// ==========================
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
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
client.on("clientReady", () => {
  botReady = true;
  console.log(`⚡ Discord Bot Ready: ${client.user.tag}`);
});

// ==========================
// FETCH MEMBERS BY ROLE
// ==========================
export const fetchMembersByRole = async (roleId) => {
  if (!botReady) {
    throw new Error("Bot not ready yet. Please wait.");
  }

  try {
    const guild = await client.guilds.fetch(process.env.SERVER_ID);

    // Fetch all members
    await guild.members.fetch();

    const role = guild.roles.cache.get(roleId);
    if (!role) throw new Error(`Role not found: ${roleId}`);

    return role.members.map(member => ({
      id: member.id,
      username: member.user.username,
      avatar: member.user.avatar
        ? `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${Number(member.id) % 5}.png`,
      status: member.presence?.status || "offline",
      custom_status: member.presence?.activities?.[0]?.state || null,
      activity: member.presence?.activities?.[0]?.name || null
    }));

  } catch (err) {
    console.error("❌ Role fetch error:", err.message);

    // Return the EXACT real discord error
    throw new Error(`Discord Fetch Error: ${err.message}`);
  }
};
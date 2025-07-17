const axios = require("axios");
const { getUser } = require("../../db/api/users")
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const season_prefix = "division.bro.official.pc-2018";

async function getRankStats(discord_id, season, gameMode) {
  // console.log(discord_id);
  
  const player = await getUser(discord_id);

  if (player.status === "not_found") {
    console.error("❌ ไม่พบข้อมูลผู้ใช้ในฐานข้อมูล");
    return { status: "failed", message: "User not found" };
  }

  const gamepad = player.data.platform === "steam" ? "false" : "true";
  const url = `https://api.pubg.com/shards/${player.data.platform}/players/${player.data.pubg_id}/seasons/${season_prefix}-${season}/ranked`

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });

    const rankStats = res.data.data.attributes.rankedGameModeStats[gameMode];

    return { status: "ok", stats: rankStats };
  } catch (error) {
    console.error(
      "❌ Error fetching Stats:",
      error.response?.data || error.message
    );
    return { status: "failed" };
  }
}

module.exports = { getRankStats }
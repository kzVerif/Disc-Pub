const axios = require("axios");
const { getUser } = require("../../db/api/users")
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const season_prefix = "division.bro.official.pc-2018";

async function getStats(discord_id, season, gameMode) {
  // console.log(discord_id);
  
  const player = await getUser(discord_id);

  if (player.status === "not_found") {
    console.error("❌ ไม่พบข้อมูลผู้ใช้ในฐานข้อมูล");
    return { status: "failed", message: "User not found" };
  }

  const gamepad = player.data.platform === "steam" ? "false" : "true";
  const url = `https://api.pubg.com/shards/${player.data.platform}/players/${player.data.pubg_id}/seasons/${season_prefix}-${season}?filter[gamepad]=${gamepad}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });

    const squadFppStats = res.data.data.attributes.gameModeStats[gameMode];
    // console.log({ status: "ok", stats: squadFppStats });

    return { status: "ok", stats: squadFppStats };
  } catch (error) {
    console.error(
      "❌ Error fetching Stats:",
      error.response?.data || error.message
    );
    return { status: "failed" };
  }
}

async function getStatsAllModes(discord_id, season) {
  const player = await getUser(discord_id);

  if (player.status === "not_found") {
    console.error("❌ ไม่พบข้อมูลผู้ใช้ในฐานข้อมูล");
    return { status: "failed", message: "User not found" };
  }

  const gamepad = player.data.platform === "steam" ? "false" : "true";
  const url = `https://api.pubg.com/shards/${player.data.platform}/players/${player.data.pubg_id}/seasons/${season_prefix}-${season}?filter[gamepad]=${gamepad}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });

    const allGameModes = res.data.data.attributes.gameModeStats;
    
    return { 
      status: "ok", 
      stats: {
        solo: allGameModes.solo,
        "solo-fpp": allGameModes["solo-fpp"],
        duo: allGameModes.duo,
        "duo-fpp": allGameModes["duo-fpp"],
        squad: allGameModes.squad,
        "squad-fpp": allGameModes["squad-fpp"]
      }
    };
  } catch (error) {
    console.error(
      "❌ Error fetching Stats:",
      error.response?.data || error.message
    );
    return { status: "failed" };
  }
}

module.exports = { getStats, getStatsAllModes }
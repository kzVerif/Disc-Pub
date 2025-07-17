const axios = require("axios");
const { getPubgActiveSeason } = require("./getseason");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

async function getPubgRankFPP(platform, pubg_id) {
  const season_id = await getPubgActiveSeason();

  const url = `https://api.pubg.com/shards/${platform}/players/${pubg_id}/seasons/${season_id.id}/ranked`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });

    const stats = res.data.data.attributes.rankedGameModeStats;

    if (!stats || !stats["squad-fpp"]) {
      return {
        status: "warn",
        message: "ยังไม่เคยเล่นแรงก์ในโหมด Squad FPP",
      };
    }

    const tierData = stats["squad-fpp"].currentTier;
    if (!tierData) {
      return {
        status: "warn",
        message: "ไม่มีข้อมูล Tier ปัจจุบัน",
      };
    }

    return {
      status: "ok",
      ranked: `${tierData.tier}`,
    };

  } catch (error) {
    console.error(
      "❌ Error fetching PUBG rank:",
      error.response?.data || error.message
    );
    return { status: "failed" };
  }
}

module.exports = { getPubgRankFPP };

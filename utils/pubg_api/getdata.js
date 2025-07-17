const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
// console.log(API_KEY);

async function getPubgData(platform, pubg_name) {
  const url = `https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${pubg_name}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });

    const playerData = res.data.data[0];
    return { status: "ok", id: playerData.id, platform: playerData.attributes.shardId };
    // console.log("Player ID:", playerData.id);
    // console.log("Player Name:", playerData.attributes.name);
  } catch (err) {
    console.error(
      "❌ Error fetching PUBG data:",
      err.response?.data || err.message
    );
    return { status: "failed"};
  }
}

module.exports = {getPubgData}
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

async function getPubgActiveSeason() {
  const url = `https://api.pubg.com/shards/steam/seasons`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`, // ✅ แก้ Baerer → Bearer
        Accept: "application/vnd.api+json",
      },
    });

    const seasons = res.data.data; // ✅ ได้ array เต็มๆ
    const activeSeasonIds = seasons
      .filter((season) => season.attributes.isCurrentSeason)
    // console.log(activeSeasonIds[0].id);
    
    
    return {status: "ok", id: activeSeasonIds[0].id}
  } catch (error) {
    console.error("❌ Error fetching PUBG season:", error.response?.data || error.message);
    return {status: "failed"}
  }
}
module.exports ={getPubgActiveSeason}

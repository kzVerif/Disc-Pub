const { db } = require("../index");
async function createUser(discord_id, pubg_id, pubg_rank, platform) {
  const check = db
    .prepare(`SELECT * FROM users WHERE discord_id = ?`)
    .get(discord_id);

  if (check) {
    return { status: "duplicate", message: "User already exists." };
  }

  const check_pubg_player = db
    .prepare(`SELECT * FROM users WHERE pubg_id = ?`)
    .get(pubg_id);

  if (check_pubg_player) {
    return { status: "duplicate_pubg", message: "User already exists." };
  }
  try {
    const insert = db.prepare(
      `INSERT INTO users (discord_id, pubg_id, pubg_rank, platform) VALUES (?,?,?,?)`
    );
    insert.run(discord_id, pubg_id, pubg_rank, platform);

    return { status: "ok" };
  } catch (error) {
    console.error("❌ Error CreateUsers:", error);
    return { status: "failed" };
  }
}

async function updateRank(discord_id, pubg_rank) {
  try {
    const update = db.prepare(
      `UPDATE users SET pubg_rank = ? WHERE discord_id = ?`
    );
    update.run(discord_id, pubg_rank);
    return { status: "ok" };
  } catch (error) {
    console.error("❌ Error updateRank:", error);
    return { status: "failed" };
  }
}

async function getUser(discord_id) {
  try {
    const get = db.prepare(`SELECT * FROM users WHERE discord_id = ?`);
    const user = get.get(discord_id); 
    // console.log("User from DB:", user);

    if (!user) {
      return {
        status: "not_found",
        message: "not found user",
      };
    }

    return { status: "ok", data: user };
  } catch (error) {
    console.error("❌ Error getUser:", error);
    return { status: "failed", error: error.message };
  }
}


module.exports = { createUser, updateRank, getUser };

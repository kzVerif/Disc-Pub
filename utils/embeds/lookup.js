const { EmbedBuilder } = require("discord.js");

function createStatsEmbed(playerData, stats, gameMode = "squad-fpp") {  
    // console.log(playerData);
      
  const kd =
    stats.roundsPlayed > 0
      ? (stats.kills / Math.max(stats.roundsPlayed - stats.wins, 1)).toFixed(2)
      : "0.00";
  const winRate =
    stats.roundsPlayed > 0
      ? ((stats.wins / stats.roundsPlayed) * 100).toFixed(1)
      : "0.0";
  const avgDamage =
    stats.roundsPlayed > 0
      ? (stats.damageDealt / stats.roundsPlayed).toFixed(0)
      : "0";
  const headshotRate =
    stats.kills > 0
      ? ((stats.headshotKills / stats.kills) * 100).toFixed(1)
      : "0.0";
  const avgSurvivalTime =
    stats.roundsPlayed > 0
      ? (stats.timeSurvived / stats.roundsPlayed / 60).toFixed(1)
      : "0.0";
  const top10Rate =
    stats.roundsPlayed > 0
      ? ((stats.top10s / stats.roundsPlayed) * 100).toFixed(1)
      : "0.0";

  // สร้าง embed
  const embed = new EmbedBuilder()
    .setTitle(`🎮 PUBG Stats - ${gameMode.toUpperCase()}`)
    .setColor(0xf39c12) // สีส้ม
    .setThumbnail("https://www.icegif.com/wp-content/uploads/2023/02/icegif-237.gif") // ใส่ลิงค์โลโก้ PUBG
    .setTimestamp()
    .setFooter({
      text: `Season ${playerData.season || "Current"}`,
      iconURL: "https://www.icegif.com/wp-content/uploads/2023/02/icegif-237.gif",
    });

  // เพิ่มข้อมูลหลัก
  embed.addFields(
    {
      name: "🏆 **Performance**",
      value: `\`\`\`
📊 K/D Ratio    : ${kd}
🏅 Win Rate     : ${winRate}%
🎯 Headshot %   : ${headshotRate}%
💥 Avg Damage   : ${avgDamage}
\`\`\``,
      inline: false,
    },
    {
      name: "📈 **Match Stats**",
      value: `\`\`\`
🎮 Matches      : ${stats.roundsPlayed.toLocaleString()}
🏆 Wins         : ${stats.wins.toLocaleString()}
💀 Kills        : ${stats.kills.toLocaleString()}
🤝 Assists      : ${stats.assists.toLocaleString()}
\`\`\``,
      inline: false,
    },
    {
      name: "🎯 **Combat Info**",
      value: `\`\`\`
🎯 Headshots    : ${stats.headshotKills.toLocaleString()}
🔫 Longest Kill : ${stats.longestKill.toFixed(0)}m
🔥 Best Streak  : ${stats.maxKillStreaks}
🏆 Best Round   : ${stats.roundMostKills} kills
\`\`\``,
      inline: false,
    }
  );

  // เพิ่มข้อมูลเสริม
  embed.addFields(
    {
      name: "⏱️ **Survival**",
      value: `\`\`\`
🏆 Top 10s      : ${stats.top10s.toLocaleString()} (${top10Rate}%)
⏱️ Avg Survival : ${avgSurvivalTime} min
🏃 Walk Distance: ${(stats.walkDistance / 1000).toFixed(1)} km
🚗 Ride Distance: ${(stats.rideDistance / 1000).toFixed(1)} km
\`\`\``,
      inline: false,
    },
    {
      name: "🩹 **Support**",
      value: `\`\`\`
💊 Heals        : ${stats.heals.toLocaleString()}
⚡ Boosts       : ${stats.boosts.toLocaleString()}
🚑 Revives      : ${stats.revives.toLocaleString()}
⬇️ Knockdowns   : ${stats.dBNOs.toLocaleString()}
\`\`\``,
      inline: false,
    },
    {
      name: "🎯 **Extras**",
      value: `\`\`\`
🚗 Road Kills   : ${stats.roadKills}
🚘 Vehicle Dest : ${stats.vehicleDestroys}
🔫 Weapons      : ${stats.weaponsAcquired.toLocaleString()}
💀 Team Kills   : ${stats.teamKills}
\`\`\``,
      inline: false,
    }
  );

  // เพิ่มแถบความคืบหน้า
  const progressBars = createProgressBars(stats);
  embed.addFields({
    name: "📊 **Progress Bars**",
    value: progressBars,
    inline: false,
  });

  return embed;
}

function createProgressBars(stats) {
  const winRate =
    stats.roundsPlayed > 0 ? (stats.wins / stats.roundsPlayed) * 100 : 0;
  const top10Rate =
    stats.roundsPlayed > 0 ? (stats.top10s / stats.roundsPlayed) * 100 : 0;
  const headshotRate =
    stats.kills > 0 ? (stats.headshotKills / stats.kills) * 100 : 0;

  const createBar = (percentage, maxLength = 10) => {
    const filled = Math.floor((percentage / 100) * maxLength);
    const empty = maxLength - filled;
    return "█".repeat(filled) + "░".repeat(empty);
  };

  return `\`\`\`
Win Rate   : ${createBar(winRate)} ${winRate.toFixed(1)}%
Top 10 Rate: ${createBar(top10Rate)} ${top10Rate.toFixed(1)}%
Headshot % : ${createBar(headshotRate)} ${headshotRate.toFixed(1)}%
\`\`\``;
}

// ฟังก์ชันสำหรับสร้าง embed สำหรับหลายโหมด
function createMultiModeEmbed(playerData, allStats) {
  const embed = new EmbedBuilder()
    .setTitle("🎮 PUBG Stats Overview")
    .setColor(0x3498db)
    .setTimestamp()
    .setFooter({
      text: `Season ${playerData.season || "Current"} • All Game Modes`,
      iconURL: "https://i.imgur.com/platform-icon.png",
    });

  Object.entries(allStats).forEach(([mode, stats]) => {
    if (stats.roundsPlayed > 0) {
      const kd = (
        stats.kills / Math.max(stats.roundsPlayed - stats.wins, 1)
      ).toFixed(2);
      const winRate = ((stats.wins / stats.roundsPlayed) * 100).toFixed(1);

      embed.addFields({
        name: `🎯 **${mode.toUpperCase()}**`,
        value: `\`\`\`
Matches: ${stats.roundsPlayed}
Wins: ${stats.wins} (${winRate}%)
K/D: ${kd}
Kills: ${stats.kills}
\`\`\``,
        inline: false,
      });
    }
  });

  return embed;
}

// ฟังก์ชันสำหรับข้อผิดพลาด
function createErrorEmbed(message) {
  return new EmbedBuilder()
    .setTitle("❌ Error")
    .setDescription(message)
    .setColor(0xe74c3c)
    .setTimestamp();
}

// ฟังก์ชันสำหรับไม่พบผู้ใช้
function createNotFoundEmbed() {
  return new EmbedBuilder()
    .setTitle("🔍 User Not Found")
    .setDescription("ไม่พบข้อมูลผู้ใช้ในฐานข้อมูล กรุณาลงทะเบียนก่อน")
    .setColor(0xf39c12)
    .addFields({
      name: "💡 วิธีลงทะเบียน",
      value: "```/reg <pubg_username>```",
      inline: false,
    })
    .setTimestamp();
}

module.exports = {
  createStatsEmbed,
  createMultiModeEmbed,
  createErrorEmbed,
  createNotFoundEmbed,
};

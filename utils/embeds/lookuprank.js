const { EmbedBuilder } = require("discord.js");

function createRankedStatsEmbed(playerData, stats, gameMode = "squad-fpp") {
  // Calculate statistics from your data
  const kd =
    stats.deaths > 0
      ? (stats.kills / stats.deaths).toFixed(2)
      : stats.kills.toFixed(2);
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
  const top10Rate =
    stats.roundsPlayed > 0 ? (stats.top10Ratio * 100).toFixed(1) : "0.0";
  const avgRank = stats.avgRank.toFixed(1);

  // Create embed with beautiful styling
  const embed = new EmbedBuilder()
    .setTitle(`🏆 PUBG Ranked Stats - ${gameMode.toUpperCase()}`)
    .setColor(0xffd700) // Gold color for ranked
    .setThumbnail(
      "https://www.icegif.com/wp-content/uploads/2023/02/icegif-237.gif"
    )
    .setTimestamp()
    .setFooter({
      text: `Ranked Season • ${stats.currentTier.tier} ${stats.currentTier.subTier}`,
      iconURL:
        "https://www.icegif.com/wp-content/uploads/2023/02/icegif-237.gif",
    });

  // Add rank information
  embed.addFields({
    name: "🎖️ **Current Rank**",
    value: `\`\`\`
🏆 Tier         : ${stats.currentTier.tier} ${stats.currentTier.subTier}
⭐ Rank Points  : ${stats.currentRankPoint.toLocaleString()} RP
🥇 Best Rank    : ${stats.bestTier.tier} ${stats.bestTier.subTier}
💎 Best RP      : ${stats.bestRankPoint.toLocaleString()} RP
\`\`\``,
    inline: false,
  });

  // Performance stats
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
🔥 Most Kills   : ${stats.roundMostKills}
⬇️ Knockdowns   : ${stats.dBNOs.toLocaleString()}
\`\`\``,
      inline: false,
    }
  );

  // Survival and ranking stats
  embed.addFields(
    {
      name: "⏱️ **Survival & Ranking**",
      value: `\`\`\`
🏆 Top 10 Rate  : ${top10Rate}%
📊 Avg Rank     : #${avgRank}
💀 Deaths       : ${stats.deaths.toLocaleString()}
🎖️ KDA         : ${stats.kda.toFixed(2)}
\`\`\``,
      inline: false,
    },
    {
      name: "🩹 **Support**",
      value: `\`\`\`
💊 Heals        : ${stats.heals.toLocaleString()}
⚡ Boosts       : ${stats.boosts.toLocaleString()}
🚑 Revives      : ${stats.revives.toLocaleString()}
🔄 Revive Rate  : ${(stats.reviveRatio * 100).toFixed(1)}%
\`\`\``,
      inline: false,
    },
    {
      name: "🎯 **Extras**",
      value: `\`\`\`
🔫 Weapons      : ${stats.weaponsAcquired.toLocaleString()}
💀 Team Kills   : ${stats.teamKills}
🔥 Kill Streak  : ${stats.killStreak}
⏱️ Play Time    : ${stats.playTime} hrs
\`\`\``,
      inline: false,
    }
  );

  // Add progress bars
  const progressBars = createRankedProgressBars(stats);
  embed.addFields({
    name: "📊 **Progress Bars**",
    value: progressBars,
    inline: false,
  });

  // Add description with rank summary
  embed.setDescription(
    `**🏆 สรุปผลงานอันดับ**\n` +
      `• ปัจจุบันอยู่ที่ **${stats.currentTier.tier} ${
        stats.currentTier.subTier
      }** (${stats.currentRankPoint.toLocaleString()} RP)\n` +
      `• ทำแอสซิสต์ได้  **${stats.assists}** ครั้ง และล้มคู่แข่งได้ **${stats.dBNOs}** ครั้ง\n` +
      `• ผลงานสม่ำเสมอ มีอัตราติดท็อป 10 อยู่ที่  **${top10Rate}%** และอันดับเฉลี่ยอยู่ที่**${avgRank}**`
  );

  return embed;
}

function createRankedProgressBars(stats) {
  const winRate =
    stats.roundsPlayed > 0 ? (stats.wins / stats.roundsPlayed) * 100 : 0;
  const top10Rate = stats.top10Ratio * 100;
  const headshotRate =
    stats.kills > 0 ? (stats.headshotKills / stats.kills) * 100 : 0;
  const kdaProgress = Math.min((stats.kda / 5) * 100, 100); // KDA out of 5 as max

  const createBar = (percentage, maxLength = 10) => {
    const filled = Math.floor((percentage / 100) * maxLength);
    const empty = maxLength - filled;
    return "█".repeat(filled) + "░".repeat(empty);
  };

  return `\`\`\`
Win Rate   : ${createBar(winRate)} ${winRate.toFixed(1)}%
Top 10 Rate: ${createBar(top10Rate)} ${top10Rate.toFixed(1)}%
Headshot % : ${createBar(headshotRate)} ${headshotRate.toFixed(1)}%
KDA Score  : ${createBar(kdaProgress)} ${stats.kda.toFixed(2)}
\`\`\``;
}

module.exports = {createRankedStatsEmbed}

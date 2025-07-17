const { Client, Routes, REST, GatewayIntentBits } = require("discord.js");
const { commands } = require("./utils/commands");
const { getPubgData } = require("./utils/pubg_api/getdata");
const { getPubgRankFPP } = require("./utils/pubg_api/getrank");
const { createUser, getUser, updateRank } = require("./db/api/users");
const { getStats } = require("./utils/pubg_api/getstat");
const {
  createStatsEmbed,
  createErrorEmbed,
  createNotFoundEmbed,
} = require("./utils/embeds/lookup");
const { getRankStats } = require("./utils/pubg_api/getrankstat");
const {
  createPUBGStatsEmbed,
  createRankedStatsEmbed,
} = require("./utils/embeds/lookuprank");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const allCommands = commands;

const rest = new REST({ version: 10 }).setToken(process.env.DISCORD_TOKEN);
(async () => {
  try {
    console.log("Loading Commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: allCommands,
    });
    console.log("Success Loading Commands!!");
  } catch (error) {
    console.error("Cannot loading Commands", error);
  }
})();

client.once("ready", () =>
  console.log(`Your Bot ${client.user.tag} is ready to use!!`)
);

client.on("interactionCreate", async (interaction) => {
  const discord_id = interaction.user.id;
  interaction.deferReply({ flags: 64 });
  if (interaction.isChatInputCommand()) {
    switch (interaction.commandName) {
      case "reg":
        const pubg_name = interaction.options.getString("pubg_name");
        const platform = interaction.options.getString("platform");

        const pubg_player = await getPubgData(platform, pubg_name);
        if (pubg_player.status !== "ok") {
          return await interaction.followUp({
            content: ":x: ไม่พบข้อมูลผู้เล่นจาก PUBG API",
            flags: 64,
          });
        }

        const rank_player = await getPubgRankFPP(
          pubg_player.platform,
          pubg_player.id
        );

        const create_user = await createUser(
          discord_id,
          pubg_player.id,
          rank_player.ranked,
          pubg_player.platform
        );

        if (create_user.status === "ok") {
          await interaction.followUp({
            content: `✅ บันทึกข้อมูลผู้เล่น ${pubg_name} เรียบร้อยแล้ว!`,
          });
        } else if (create_user.status === "duplicate") {
          await interaction.followUp({
            content: `⚠️ คุณมีบัญชีอยู่แล้ว!`,
          });
        } else if (create_user.status === "duplicate_pubg") {
          await interaction.followUp({
            content: `⚠️ มีคนใช้ Account Pubg นี้ไปแล้วติดต่อแอดมินเพื่อแจ้งเรื่อง`,
          });
        } else {
          await interaction.followUp({
            content: "❌ เกิดข้อผิดพลาดในการลงทะเบียน",
          });
        }

        break;
      case "myrank":
        const player = await getUser(discord_id);
        if (player.status !== "ok") {
          return await interaction.followUp({
            content: "❌ เกิดข้อผิดพลาดในการดึงข้อมูล",
          });
        }

        const old_myrank = player.data.pubg_rank;

        const myrank = await getPubgRankFPP(
          player.data.platform,
          player.data.pubg_id
        );

        if (myrank.status !== "ok") {
          return await interaction.followUp({
            content: `❌ ${myrank.message}`,
          });
        }

        const res_updateRank = await updateRank(discord_id, myrank.ranked);
        if (res_updateRank.status !== "ok") {
          return await interaction.followUp({
            content: "❌ เกิดข้อผิดพลาดในการอัพเดตแรงก์",
          });
        }

        const guild = interaction.guild;
        const member = await guild.members.fetch(discord_id);

        const newRole = guild.roles.cache.find(
          (r) => r.name.toLowerCase() === myrank.ranked.toLowerCase()
        );

        const oldRole = guild.roles.cache.find(
          (r) => r.name.toLowerCase() === old_myrank.toLowerCase()
        );

        if (newRole) {
          if (oldRole.id !== newRole.id) {
            await member.roles.remove(oldRole);
          }

          await member.roles.add(newRole);

          return await interaction.followUp({
            content: `🎖️ อัพเดตแรงก์เรียบร้อย: ${old_myrank} → ${myrank.ranked}`,
          });
        } else {
          return await interaction.followUp({
            content: `⚠️ ไม่พบ Role ชื่อ ${myrank.ranked} บนเซิร์ฟเวอร์`,
          });
        }
        break;
      case "allstats":
        const season = interaction.options.getInteger("seasons");
        const gameMode = interaction.options.getString("mode");
        try {
          const result = await getStats(discord_id, season, gameMode);

          if (result.status === "failed") {
            if (result.message === "User not found") {
              const embed = createNotFoundEmbed();
              return await interaction.editReply({ embeds: [embed] });
            } else {
              const embed = createErrorEmbed("❌ ไม่สามารถดึงข้อมูลสถิติได้");
              return await interaction.editReply({ embeds: [embed] });
            }
          }

          // ดึงข้อมูลทั้งหมดและเลือกโหมดที่ต้องการ
          const allStats = result.stats;

          const playerData = {
            season: season,
            platform: "N/A",
            username: interaction.user.username,
          };

          const embed = createStatsEmbed(playerData, allStats, gameMode);
          await interaction.editReply({ embeds: [embed], flags: 64 });
        } catch (error) {
          console.error("Error in stats command:", error);
          const embed = createErrorEmbed("❌ เกิดข้อผิดพลาดในการดึงข้อมูล");
          await interaction.editReply({ embeds: [embed], flags: 64 });
        }
        break;
      case "rankstats":
        const season_rank = interaction.options.getInteger("seasons");
        const gameMode_rank = interaction.options.getString("mode");
        try {
          const result = await getRankStats(
            discord_id,
            season_rank,
            gameMode_rank
          );

          if (result.status === "failed") {
            if (result.message === "User not found") {
              const embed = createNotFoundEmbed();
              return await interaction.editReply({ embeds: [embed] });
            } else {
              const embed = createErrorEmbed("❌ ไม่สามารถดึงข้อมูลสถิติได้");
              return await interaction.editReply({ embeds: [embed] });
            }
          }

          // ดึงข้อมูลทั้งหมดและเลือกโหมดที่ต้องการ
          const allStats = result.stats;

          const playerData = {
            season: season_rank,
            platform: "N/A",
            username: interaction.user.username,
          };

          const embed = createRankedStatsEmbed(
            playerData,
            allStats,
            gameMode_rank
          );
          await interaction.editReply({ embeds: [embed], flags: 64 });
        } catch (error) {
          console.error("Error in stats command:", error);
          const embed = createErrorEmbed("❌ เกิดข้อผิดพลาดในการดึงข้อมูล");
          await interaction.editReply({ embeds: [embed], flags: 64 });
        }
        break;
      default:
        break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

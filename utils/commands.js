const { SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("reg")
    .setDescription("เชื่อมบัญชี Discord กับ PUBG")
    .addStringOption((option) =>
      option
        .setName("pubg_name")
        .setDescription("กรอกชื่อในเกม PUBG")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("platform")
        .setDescription("เลือกแพลตฟอร์มที่ใช้เล่น PUBG")
        .setRequired(true)
        .addChoices(
          { name: "Steam", value: "steam" },
          { name: "Kakao", value: "kakao" },
          { name: "Xbox", value: "xbox" },
          { name: "PSN", value: "psn" },
          { name: "Stadia", value: "stadia" }
        )
    ),
  new SlashCommandBuilder()
    .setName("myrank")
    .setDescription("รับยศตามแรงก์ PubG"),
  new SlashCommandBuilder()
    .setName("allstats")
    .setDescription("Look up Stats แต่ละ Seasons")
    .addIntegerOption((option) =>
      option
        .setName("seasons")
        .setDescription("กรอก Seasons ที่ต้องการค้นหา")
        .setRequired(true)
        .setMinValue(1)
    )
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("โหมดเกม")
        .setRequired(true)
        .addChoices(
          { name: "Squad FPP", value: "squad-fpp" },
          { name: "Squad TPP", value: "squad" },
          { name: "Duo FPP", value: "duo-fpp" },
          { name: "Duo TPP", value: "duo" },
          { name: "Solo FPP", value: "solo-fpp" },
          { name: "Solo TPP", value: "solo" }
        )
    ),  
    new SlashCommandBuilder()
    .setName("rankstats")
    .setDescription("Look up Rank Stats")
    .addIntegerOption((option) =>
      option
        .setName("seasons")
        .setDescription("กรอก Seasons ที่ต้องการค้นหา")
        .setRequired(true)
        .setMinValue(1)
    )
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("โหมดเกม")
        .setRequired(true)
        .addChoices(
          { name: "Squad FPP", value: "squad-fpp" },
          { name: "Squad TPP", value: "squad" },
        )
    ),
].map((command) => command.toJSON());

module.exports = {
  commands,
};

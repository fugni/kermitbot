const discord = require("discord.js");
require("dotenv").config();

const client = new discord.Client({ intents: [
    discord.GatewayIntentBits.Guilds, 
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.GuildMembers,
    discord.GatewayIntentBits.MessageContent
]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// on join give role
const roleID = process.env.ROLE_ID;
client.on("guildMemberAdd", (member) => {
    member.roles.add(roleID);
});

client.on("messageCreate", (message) => {
    // if (message.author.bot) return;

    switch (message.content) {
        case "!info":
            message.channel.send("ip = **" + process.env.MC_SERVER_IP + "**\nversion = **1.21**");
            break;
        case "!gay":
            message.channel.send("no u");
            break;

        default:
            break;
    }
});

client.login(process.env.BOT_TOKEN);
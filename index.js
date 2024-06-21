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

    if (message.content.startsWith("!")) {
        const args = message.content.split(/ (.*)/s);
        //args[0] = command
        //args[1] = anything after command

        switch (args[0].toLowerCase()) {
            case "!info":
                message.channel.send("ip = **" + process.env.MC_SERVER_IP + "**\nversion = **1.21**");
                break;
            case "!gay":
                if (args.length > 1) {
                    const mentionedUser = message.mentions.users.first();
                    if (mentionedUser) {
                        const mentionedMember = message.guild.members.cache.get(mentionedUser.id);
                        if (mentionedMember) {
                            message.channel.send(mentionedMember.displayName + " is gay");
                        }
                    } else {
                        message.channel.send(args[1] + " is gay");
                    }
                } else {
                    message.channel.send(message.author.displayName + " is gay");
                }
                break;
            default:
                break;
        }

    }
});

client.login(process.env.BOT_TOKEN);
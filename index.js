const mod = require('revchatapi');
const revolt = ""; // Revolt Bot Token
const discord = ""; // Discord Bot Token
const revChannels = []; // Revolt channels
const discordChannels = []; // Discord Channels
const Discord = require('discord.js');

const Client = new mod.Client(revolt, true);
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

Client.on('ready', () => {
    console.log(`Now logged in as ${Client.username}`);
})

Client.on('message', (msg) => {
    if (!revChannels.includes(msg.channel.id)) return;
    if (msg.author.isBot) return;

    let rcnt = `[REVOLT] **@${msg.author.username}:** ${msg.content}`;
    let dcnt = `[REVOLT] **@${msg.author.username}:** ${msg.content}`;

    for (const channelID of revChannels) {
        Client.sendToChannel(channelID, { content: rcnt });
    }
    for (const channelID of discordChannels) {
        const channel = client.channels.cache.get(channelID) || client.channels.fetch(channelID).catch((e) => { console.log(e); return });

        channel.send({ content: dcnt });
    }
})

client.on('message', (msg) => {
    if(!discordChannels.includes(msg.channel.id)) return;
    if(msg.author.bot) return;
    
    let rcnt = `[DISCORD] **${msg.author.tag}:** ${msg.content}`;
    let dcnt = `[DISCORD] **${msg.author.tag}:** ${msg.content}`;

    for (const channelID of revChannels) {
        Client.sendToChannel(channelID, { content: rcnt });
    }
    for (const channelID of discordChannels) {
        const channel = client.channels.cache.get(channelID) || client.channels.fetch(channelID).catch((e) => { console.log(e); return });

        channel.send({ content: dcnt });
    }
})

client.login(discord)

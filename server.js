const { Client, GatewayIntentBits } = require("discord.js");
const http = require("http");

http
  .createServer((req, res) => {
    res.write("Hello from server!");
    res.end();
  })
  .listen(443);

const discordClient = new Client({
  // https://discordjs.guide/popular-topics/intents.html#privileged-intents
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

discordClient.on("ready", () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on("message", (msg) => {
  if (msg.author !== discordClient.user) {
    if (msg.content === "!ping") msg.reply("Hi!");
    else msg.reply(msg.content);
  }
});

discordClient.login(process.env.DISCORD_BOT_TOKEN);

var Discord = require('discord.js');
var auth = require('./auth.json');

// Initialize Discord Bot
var bot = new Discord.Client();

bot.login(auth.token);

bot.on('ready', function (evt) {
    console.log('Connected');

    console.log("Currently a member in " + bot.guilds.array().length + " guilds.");
    console.log("with a total of " + bot.channels.array().length + " voice and text channels");

    process.exit();
});



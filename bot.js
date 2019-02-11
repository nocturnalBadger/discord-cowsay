var cowsay = require('cowsay');
var Discord = require('discord.js');
var auth = require('./auth.json');
var blacklist = require('./blacklist.json');
var parsing = require('parsing.js');

// Initialize Discord Bot
var bot = new Discord.Client();

bot.login(auth.token);

bot.on('ready', function (evt) {
    console.log('Connected');
});

var helpText = "Tell me to say something by\n" +
               "typing: cowsay <message>\n\n" +
               "Also try: cowthink <message>";
var deniedText = "I'm sorry, I will not say that.";

bot.on('message', message => {
    if (message.content.startsWith('cowsay')||message.content.startsWith('Cowsay')) {
        var text = message.content.substring('cowsay'.length + 1);
        console.log("Request received");
        if (blacklist.indexOf(message.author.id) != -1) {
            console.log("User is blacklisted. Request will be denied.");
            text = deniedText;
        }

        if (text == "")
            text = helpText;
        var parsing = new parsing(text);
        var cowSaid = cowsay.say(parsing);

        message.channel.send('```' + cowSaid + '```');
        console.log("Message sent");
    }
    else if (message.content.startsWith('cowthink')||message.content.startsWith('Cowthink')) {
        var text = message.content.substring('cowthink'.length + 1);
        console.log("Request received");
        if (blacklist.indexOf(message.author.id) != -1) {
            console.log("User is blacklisted. Request will be denied.");
            text = deniedText;
        }
        if (text == "")
            text = helpText;
        var parsing = new parsing(text);
        var cowSaid = cowsay.think(parsing);

        message.channel.send('```' + cowSaid + '```');
        console.log("Message sent");
    }
});

var cleanupFn = function cleanup() {
    console.log("Logging off");
    bot.destroy();
}

process.on('SIGINT', cleanupFn);
process.on('SIGTERM', cleanupFn);


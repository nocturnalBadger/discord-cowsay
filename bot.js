var cowsay = require('cowsay');
var Discord = require('discord.js');
var auth = require('./auth.json');
var blacklist = require('./blacklist.json');

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
    if (message.content.startsWith('cowsay')) {
        var text = message.content.substring('cowsay'.length + 1);
        console.log("Discord user " + message.author.id + " requested that cow say: " + text);
        if (blacklist.indexOf(message.author.id) != -1) {
            console.log("User is blacklisted. Request will be denied.");
            text = deniedText;
        }

        if (text == "")
            text = helpText;

        var cowSaid = cowsay.say({
            text: text,
        });

        message.channel.send('```' + cowSaid + '```');
    }
    else if (message.content.startsWith('cowthink')) {
        var text = message.content.substring('cowthink'.length + 1);
        console.log("Discord user " + message.author.id + " requested that cow think: " + text);
        if (blacklist.indexOf(message.author.id) != -1) {
            console.log("User is blacklisted. Request will be denied.");
            text = deniedText;
        }
        if (text == "")
            text = helpText;

        var cowSaid = cowsay.think({
            text: text,
        });

        message.channel.send('```' + cowSaid + '```');

    }
});

var cleanupFn = function cleanup() {
    console.log("Logging off");
    bot.destroy();
}

process.on('SIGINT', cleanupFn);
process.on('SIGTERM', cleanupFn);


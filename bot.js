var cowsay = require('cowsay');
var Discord = require('discord.js');
var auth = require('./auth.json');

// Initialize Discord Bot
var bot = new Discord.Client();

bot.login(auth.token);

bot.on('ready', function (evt) {
    console.log('Connected');
});

var helpText = "Tell me to say something by typing:\n" +
               "cowsay <message>\n\n" +
               "Also try: cowthink <message>";

bot.on('message', message => {
    if (message.content.startsWith('cowsay')) {
        var text = message.content.split('cowsay')[1];
        if (text == "")
            text = helpText;

        var cowSaid = cowsay.say({
            text: text,
        });

        message.channel.send('```' + cowSaid + '```');

    }
    else if (message.content.startsWith('cowthink')) {
        var text = message.content.split('cowthink')[1];
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


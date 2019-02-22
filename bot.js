var cowsay = require('cowsay');
var Discord = require('discord.js');
var auth = require('./auth.json');

// Initialize Discord Bot
var bot = new Discord.Client();

bot.login(auth.token);

bot.on('ready', function (evt) {
    console.log('Connected');
});

var helpText = "Tell me to say something by\n" +
               "typing: cowsay <message>\n\n" +
               "Also try: cowthink <message>";

bot.on('message', message => {
    console.log("Request received");
    var cowAction = null;
    var messageText = message.content;

    if (messageText.startsWith('cowsay') || messageText.startsWith('Cowsay')) {
        cowAction = cowsay.say;
    }
    else if (messageText.startsWith('cowthink') || messageText.startsWith('Cowthink')) {
        cowAction = cowsay.think;
    }

    if (cowAction != null) {
        var text = messageText.substring(messageText.indexOf(" ") + 1);

        if (text == "")
            text = helpText;

        text = text.replace(/```/g, '\'\'\''); // ```

        var cowSaid = cowAction({
            text: text,
        });

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


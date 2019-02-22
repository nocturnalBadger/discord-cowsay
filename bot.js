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
    var action = null;
    if (message.content.startsWith('cowsay') || message.content.startsWith('Cowsay')) {
        action = cowsay.say;
    }
    else if (message.content.startsWith('cowthink') || message.content.startsWith('Cowthink')) {
        action = cowsay.think;
    }

    if (action != null) {
        var text = message.content.substring(message.content.indexOf(" ") + 1);

        if (text == "")
            text = helpText;

            text = text.replace(/```/g, '\'\'\''); // ```

            var cowSaid = action({
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


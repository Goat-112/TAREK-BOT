const fs = require('fs');
const login = require('fb-chat-api');
const path = require('path');
const CONFIG = require('./config.json');

login({appState: JSON.parse(fs.readFileSync(CONFIG.fbstatePath, 'utf8'))}, (err, api) => {
  if (err) return console.error('Login error:', err);

  api.setOptions({ listenEvents: true });
  console.log("🤖 Bot is now online!");

  const commands = {};
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.config.name] = command;
  }

  api.listenMqtt((err, message) => {
    if (err) return console.error(err);
    if (!message.body || !message.body.startsWith(CONFIG.prefix)) return;

    const args = message.body.slice(CONFIG.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands[commandName];
    if (command) {
      command.onStart({ api, event: message, args });
    }
  });
});
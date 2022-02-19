import 'dotenv/config';
import { Client, Intents } from 'discord.js';

const connectBot = () => {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('message', (message) => {
    if (message.content.startsWith('!')) {
      message.reply(`Replying to ${message.author.username}`);
    }
  });

  client.login(process.env.BOT_TOKEN);
};

connectBot();

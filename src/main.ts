import 'dotenv/config';
import { Client, Intents, Message, MessageOptions, MessagePayload } from 'discord.js';

const connectBot = () => {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('messageCreate', (message) => {
    if (message.content.startsWith('!')) {
      sendMessage(`Replying to ${message.author.username}`, message.channel);
    }
  });

  client.login(process.env.BOT_TOKEN);
};

const sendMessage = (
  message: string | MessagePayload | MessageOptions,
  channel: Message['channel'],
  typingTimeout = 1500,
) => {
  channel.sendTyping();
  setTimeout(() => {
    channel.send(message);
  }, typingTimeout);
};

connectBot();

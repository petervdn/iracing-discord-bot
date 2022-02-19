import { Client, Intents, Message, MessageOptions, MessagePayload } from 'discord.js';

const botCommands = ['addUser', 'listUsers'] as const;
type BotCommand = typeof botCommands[number];
const COMMAND_PREFIX = '!';

export const connectBot = (token?: string) =>
  new Promise((resolve) => {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

    client.once('ready', resolve);

    client.on('messageCreate', (message) => {
      const command = parseCommand(message.content);
      if (command) {
        typeMessage(JSON.stringify(command), message.channel);
      }
    });

    client.login(token);
  });

const parseCommand = (
  messageText: string,
): { command: BotCommand; args: Array<string> } | undefined => {
  if (!messageText.startsWith(COMMAND_PREFIX)) {
    return undefined;
  }

  const split = messageText.substring(1).split(' ');
  const [firstWord, ...args] = split;
  if (isCommand(firstWord)) {
    return { command: firstWord, args };
  }

  return undefined;
};

const isCommand = (value: string): value is BotCommand => (botCommands as any).includes(value);

const typeMessage = (
  message: string | MessagePayload | MessageOptions,
  channel: Message['channel'],
  typingTimeout = 1500,
) => {
  channel.sendTyping();
  setTimeout(() => {
    channel.send(message);
  }, typingTimeout);
};

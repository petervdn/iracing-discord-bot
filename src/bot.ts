import { Client, Intents, Message, MessageOptions, MessagePayload } from 'discord.js';

export const botCommandTypes = ['adduser', 'listusers', 'help'] as const;
type BotCommandType = typeof botCommandTypes[number];
export type BotCommand = { type: BotCommandType; args: Array<string> };

const COMMAND_PREFIX = '!';

export const connectBot = (token?: string) =>
  new Promise<Client>((resolve) => {
    const client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
    });

    client.once('ready', () => resolve(client));
    client.login(token);
  });

export const parseCommand = (messageText: string): BotCommand | undefined => {
  if (messageText.startsWith(COMMAND_PREFIX)) {
    const [firstWord, ...args] = messageText.substring(1).split(' ');
    if (isCommandType(firstWord)) {
      return { type: firstWord, args };
    }
  }

  return undefined;
};

const isCommandType = (value: string): value is BotCommandType =>
  (botCommandTypes as any).includes(value);

export const typeMessage = (
  message: string | MessagePayload | MessageOptions,
  channel: Message['channel'],
  typingTimeout = 1400,
) => {
  channel.sendTyping();
  setTimeout(() => {
    channel.send(message);
  }, typingTimeout);
};

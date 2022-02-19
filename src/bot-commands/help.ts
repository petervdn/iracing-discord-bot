import { Message } from 'discord.js';
import { botCommandTypes, typeMessage } from '../bot';

type Props = {
  message: Message;
};

export const help = ({ message }: Props) => {
  typeMessage(`Available commands: \`${botCommandTypes}\``, message.channel);
};

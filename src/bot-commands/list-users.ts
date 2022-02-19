import { typeMessage } from '../bot';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { Message } from 'discord.js';

type Props = {
  users: Repository<User>;
  message: Message;
};

export const listUsers = async ({ users, message }: Props) => {
  typeMessage(JSON.stringify(await users.find()), message.channel);
};

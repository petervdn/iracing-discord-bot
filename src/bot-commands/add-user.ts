import { BotCommand, typeMessage } from '../bot';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { Message } from 'discord.js';

type Props = {
  command: BotCommand;
  users: Repository<User>;
  message: Message;
};

export const addUsers = async ({ command, users, message }: Props) => {
  const discordUserId = message.author.id;
  const iRacingUserId = command.args[0];
  if (!iRacingUserId) {
    typeMessage(`You need to specify an iRacing user id`, message.channel);
  } else if (!(await users.findOne({ discordUserId }))) {
    const newUser = new User();
    newUser.discordUserId = discordUserId;
    newUser.iRacingUserId = iRacingUserId;
    newUser.iRatingHistory = '';

    await users.save(newUser);
    typeMessage(`User added`, message.channel);
  } else {
    typeMessage(`Discord user already exists`, message.channel);
  }
};

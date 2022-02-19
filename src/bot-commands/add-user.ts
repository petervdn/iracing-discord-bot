import { BotCommand, typeMessage } from '../bot';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { Message } from 'discord.js';

type Props = {
  command: BotCommand;
  users: Repository<User>;
  message: Message;
};

export const addUser = async ({ command, users, message }: Props) => {
  if (!message.guild) {
    // message was not sent in a server channel
    return;
  }

  (await message.guild.members.fetch()).each((member) => {
    console.log(member.nickname);
  });

  const [iRacingUserId, usernameInChannel] = command.args;
  const discordUserId = usernameInChannel
    ? (await message.guild.members.fetch()).find(
        (member) =>
          member.nickname
            ? member.nickname === usernameInChannel // if there is a nickname, use that
            : member.user.username === usernameInChannel, // otherwise check username
      )?.user.id
    : message.author.id;

  if (!discordUserId) {
    typeMessage(`No user in channel with name ${usernameInChannel}`, message.channel);
    return;
  }

  if (!iRacingUserId) {
    typeMessage(`You need to specify an iRacing user id`, message.channel);
  } else if (!(await users.findOne({ discordUserId }))) {
    const newUser = new User();
    newUser.discordUserId = discordUserId;
    newUser.iRacingUserId = iRacingUserId;
    newUser.iRatingHistory = ''; // todo figure out how to make field optional

    await users.save(newUser);
    typeMessage(`User added`, message.channel);
  } else {
    typeMessage(`Discord user already exists`, message.channel);
  }
};

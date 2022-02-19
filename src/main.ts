import 'dotenv/config';
import { connectBot, parseCommand } from './bot';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { listUsers } from './bot-commands/list-users';
import { addUsers } from './bot-commands/add-user';

const main = async () => {
  try {
    const db = await createConnection();
    console.log('Database connection created');
    const botClient = await connectBot(process.env.BOT_TOKEN);
    console.log('Bot running');

    botClient.on('messageCreate', async (message) => {
      const command = parseCommand(message.content);
      if (command) {
        let users = db.getRepository(User);

        switch (command.type) {
          case 'adduser': {
            addUsers({ users, message, command });
            break;
          }
          case 'listusers': {
            listUsers({ users, message });
            break;
          }
        }
      }
    });
  } catch (error) {
    console.log('error');
  }
};

main();

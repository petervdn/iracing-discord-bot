import 'dotenv/config';
import { connectBot, parseCommand, typeMessage } from './bot';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

const main = async () => {
  try {
    const db = await createConnection();
    console.log('Database connection created');
    const botClient = await connectBot(process.env.BOT_TOKEN);
    console.log('Bot running');

    botClient.on('messageCreate', async (message) => {
      const command = parseCommand(message.content);
      if (command) {
        switch (command.type) {
          case 'adduser': {
            break;
          }
          case 'listusers': {
            typeMessage(JSON.stringify(await db.manager.find(User)), message.channel);
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

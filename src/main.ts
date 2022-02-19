import 'dotenv/config';
import { connectBot } from './bot';

const main = async () => {
  await connectBot(process.env.BOT_TOKEN);
  console.log('Bot connected');
};

main();

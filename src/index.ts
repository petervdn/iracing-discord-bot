import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    // const user = new User();
    // user.firstName = 'Peter';
    // user.lastName = 'vdn';
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.id);

    const users = await connection.manager.find(User);
    console.log(users);
  })
  .catch((error) => console.log(error));

import pkg from 'pg';

async function getConection (){

  const {Client} = pkg
  const client = new Client({
    host:'localhost',
    port: 5432,
    user: 'john',
    password: 'admin123',
    database:'my_store'
  });

  await client.connect();
  return client;
}

export {getConection};

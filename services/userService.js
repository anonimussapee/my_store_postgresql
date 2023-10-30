import boom from '@hapi/boom';
import { users } from '../content/index.js';
import {idGen} from '../idGen/index.js';
import { pool } from '../libs/postgresPool.js';

class UsersService {

  constructor (){

    this.users = users;
    this.pool = pool;
    this.pool.on('error', (err)=>console.error(err));
  }

  async create(obj){
    return new Promise((resolve, reject) => {

      let newid;
      idGen(this.users, (err,id)=>{
        if(err){
          console.error('no se pudo generar un id para el post users: ', err);
          return false;
        }
        newid = id;
      })
      const newUser = {...obj, id:newid};
      this.users.push(newUser);
      const userCreated = this.users.find(user => user.id == newid);
      if(userCreated){
        resolve(newUser);
      }else{
        // reject(new Error('Bad request'));
        reject(boom.notFound('user not published'))
      }
    });


  }

  async find(){
    const query = `SELECT * FROM users`;
    const response = await this.pool.query(query);
    return response.rows;

  }

  async findOne(id){
    return new Promise(async(resolve, reject) => {
      const query = `SELECT * FROM users WHERE user_id = ${id}`;
      const response = await this.pool.query(query);
      if(response.rows.length == 0){
        reject(boom.notFound('User not found'));
      }else{
        resolve(response.rows);
      }
    });
  }

  async findLimitOffset(limit,offset){

    return new Promise((resolve, reject) => {
      const userLimitsOffset = this.users.filter(user=> user.id >= offset);
      resolve(userLimitsOffset.slice(0,limit));
    })
  }

  async update(obj, id){

    return new Promise((resolve, reject) => {

      const userFinded = users.find(user => user.id == id);

      if(!userFinded){
        reject(boom.notFound('User not found'));
      }else{
        const userIndex = users.findIndex(user => user.id == id);
        const updateuser = {...obj, id}
        this.users.splice(userIndex, 1, updateuser);
        resolve(updateuser);

      }
    })



  }

  async patch(obj, id){
    return new Promise((resolve, reject) => {

      const userFinded = users.find(user => user.id == id);

      if(!userFinded){
        reject(boom.notFound('User not found'));
      }else{

        const userIndex = users.findIndex(user => user.id == id);
        const newUser = {...userFinded, ...obj, id};
        this.users.splice(userIndex, 1, newUser);
        resolve(obj);

    }
    })


  }


  async delete(id){

    return new Promise((resolve, reject) => {

      const userFinded = users.find(user => user.id == id);

      if(!userFinded){
        reject( boom.notFound('User not found'));
      }else{

        const userIndex = users.findIndex(user => user.id == id);
        this.users.splice(userIndex, 1);
        resolve(userIndex+1);
      }

    });

  }


}

export {UsersService};

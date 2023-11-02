import boom from '@hapi/boom';
import { users } from '../content/index.js';
import { pool } from '../libs/postgresPool.js';
import {sequelize} from '../libs/sequelize.js';

class UsersService {

  constructor (){

    this.users = users;
    this.pool = pool;
    this.pool.on('error', (err)=>console.error(err));
  }

  async create(obj){
    return new Promise(async(resolve, reject) => {
      try {
        // const emailExists = await sequelize.models.User.findOne({
        //   where:{
        //     email:obj.email
        //   }
        // });

        // if(emailExists){
        //   reject(new Error('Email existente, usa otro email diferente para registrarte '));
        // }

        const newUser = await sequelize.models.User.create(obj);

        resolve(newUser);

      } catch (error) {
        reject(boom.notFound(error) );
      }
    });


  }

  async find(){
    const query = `SELECT * FROM users`;
    const response = await sequelize.models.User.findAll();
    // const [data] = await sequelize.query(query);
    // const response = await this.pool.query(query);
    // return response.rows;
    // return data;
    return response;


  }

  async findOne(id){

    return new Promise(async(resolve, reject) => {
      // const query = `SELECT * FROM users WHERE user_id = ${id}`;
      // const response = await this.pool.query(query);
      const response = await sequelize.models.User.findOne({
        where:{
          id: id
        }
      })
      if(!response){
        reject(boom.notFound('User not found'));
      }else{
        resolve(response);
      }
    });
  }

  async findLimitOffset(limit,offset){

    return new Promise(async(resolve, reject) => {
      try {

        const allUsers = await sequelize.models.User.findAll();

        const userLimitsOffset = allUsers.filter(user=> user.id >= offset);
        resolve(userLimitsOffset.slice(0,limit));

      } catch (error) {
         reject(error);
      }
    })
  }

  async update(obj, id){

    return new Promise(async(resolve, reject) => {

      const userFinded = await sequelize.models.User.findByPk(id);


      if(!userFinded){
        reject(boom.notFound('User not found'));
      }else{
        const userUpdate= await userFinded.update(obj);
        resolve(userUpdate);

      }
    })



  }


  async delete(id){

    return new Promise(async (resolve, reject) => {

      const userFinded = await sequelize.models.User.findByPk(id);

      if(!userFinded){
        reject( boom.notFound('User not found'));
      }else{

        await userFinded.destroy();
        resolve('user deleted successfully',);
      }

    });

  }


}

export {UsersService};

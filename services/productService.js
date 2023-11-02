import boom from '@hapi/boom';
import { pool } from '../libs/postgresPool.js';
import { sequelize } from '../libs/sequelize.js';

class ProductsService {

  constructor (){

    this.pool = pool;
    this.pool.on('error',(err)=>console.error(err));
  }

  async create(data){
    return new Promise(async(resolve, reject) => {
      try {

        const userNew = await sequelize.models.Product.create(data);
        resolve(userNew);

      } catch (error) {
        reject(boom.notFound('not found, not posted'));
      }
    });
  }

  async find(){
    return new Promise((resolve, reject) => {

      try {
        const response = sequelize.models.Product.findAll();
        resolve( response);

      } catch (error) {
        reject(boom.notFound('Product not found'));
      }
    })
    // const query = 'SELECT * FROM products';
    // const response = await this.pool.query(query)
    // return response.rows;
  }

  async findOne(id){
    return new Promise(async(resolve,reject)=>{
      // const query = `SELECT * FROM "products" WHERE product_id = ${id}`;
      // const response = await this.pool.query(query);
      // if(!response){
      //   reject(boom.notFound('Product not found'));
      // }else{
      //   resolve(response.rows);
      // }
      try {
        const userFinded = await sequelize.models.Product.findOne({
          where:{
            id:id
          }
        })
        if(!userFinded){

          reject(boom.notFound('Product not found'));

        }
        resolve(userFinded);
      } catch (error) {
        reject(boom.notFound(error));
      }
    })
  }

  async findLimitOffset(limit,offset){
    return new Promise(async(resolve, reject)=>{
      try {
        const allProducts = await  sequelize.models.Product.findAll();
        const prodLimitOffset = allProducts.filter(product=> product.id >= offset);
        resolve(prodLimitOffset.slice(0,limit));

      } catch (error) {
        reject(boom.notFound(error));
      }
    });
  }

  async update(obj, id){
    return new Promise( async(resolve, reject) => {
      try {

        const productFind = await sequelize.models.Product.findByPk(id);
        if(!productFind){
          reject(boom.notFound('Product not found'));
        }else{
          const productUpdate = await productFind.update(obj);
          resolve(productUpdate);
        }

      } catch (error) {
        reject(boom.notFound(error));
      }

    });
  }

  async delete(id){
    return new Promise(async(resolve, reject) => {

      try {
        const userFinded = await sequelize.models.Product.findByPk(id);
        if(!userFinded){
          reject(boom.notFound('Product not found'));
        }else{
          await userFinded.destroy();
          resolve('Product deleted successfully');
        }

      } catch (error) {
        reject(boom.notFound(error));
      }

    });
  }


}

export {ProductsService};

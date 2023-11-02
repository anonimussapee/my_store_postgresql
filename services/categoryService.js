import boom from '@hapi/boom';
import { pool } from '../libs/postgresPool.js';
import { sequelize } from '../libs/sequelize.js';

class CategoriesService {

  constructor (){

    this.pool = pool;
    this.pool.on('error',(err)=>console.error(err));
  }

  async create(obj){
    return new Promise(async(resolve, reject) => {
      try {
        const userNew = await sequelize.models.Category.create(obj);
        resolve(userNew);
      } catch (error) {
        reject(boom.notFound(error));
      }

    });

  }

  async find(){
    return new Promise(async(resolve, reject) => {

      try {

        const response = await sequelize.models.Category.findAll();
        if(!response){
          reject(boom.notFound('Category not found'));
        }else{

          resolve(response);
        }

      } catch (error) {
        reject(boom.notFound('Category not found'));
      }
      // const query = 'SELECT * FROM categories';
      // const response = await this.pool.query(query);

    })
  }

  async findOne(id){
    return new Promise(async(resolve, reject) => {
      // const query = `SELECT * FROM categories WHERE category_id = ${id}`;
      // const response = await this.pool.query(query);
      // if(response.rows.length == 0 ){
      //   reject(boom.notFound('Category not found'));
      // }else{
      //   resolve(response.rows);
      // }
      try {

        const categoryFinded = await sequelize.models.Category.findOne({
          where:{
            id:id
          }
        });
        if(!categoryFinded){
          reject(boom.notFound('Category not found'));
        }else{
          resolve(categoryFinded);
        }

      } catch (error) {
        reject(boom.notFound(error));
      }

    })

  }

  async filterForCategory(id){
    return new Promise(async(resolve, reject) => {

      try {
        const categoryFinded = await sequelize.models.Category.findByPk(id);
        if(!categoryFinded){
          reject(boom.notFound('Category not found'));
        }else{

          const productsByCategory = await sequelize.models.Product.findAll();
          const allProducts = productsByCategory.filter(product=> product.category.id == id);
          resolve(allProducts);
        }
      } catch (error) {
        reject(boom.notFound(error));
      }
      // const query1 = `SELECT * FROM categories`;
      // const response1 = await this.pool.query(query1);
      // const categoryExists = response1.rows.some(category => category['category_id'] == id);
      // console.log(categoryExists);
      // if(!categoryExists){
      //   reject(boom.notFound('Category not found'));

      // }
      // const query2 = `SELECT * FROM products WHERE "product_category" = ${id}`;
      // const response2 = await this.pool.query(query2);
      // if(response2){
      //   resolve(response2.rows);
      // }else{
      //   reject(boom.notFound('products not found'));

      // }
    });
  }

  async findLimitOffset(limit,offset){

    return new Promise(async(resolve, reject) => {
      try {
        const allCategories = await sequelize.models.Category.findAll();
        const catLimitsOffset = allCategories.filter(category=> category.id >= offset);
        resolve(catLimitsOffset.slice(0,limit));

      } catch (error) {
        reject(boom.notFound(error));
      }

    })
  }

  async update(obj, id){

    return new Promise(async(resolve, reject) => {

      try {
        const categoryFinded =  await sequelize.models.Category.findByPk(id);
        if(!categoryFinded){
          reject(boom.notFound('Category not found'));
        }else{
          const categoryUpdate = await categoryFinded.update(obj);
          resolve(categoryUpdate);
        }
      } catch (error) {
        reject(boom.notFound(error))
      }
    });
  }


  async delete(id){

    return new Promise(async(resolve, reject) => {

      try {
        const categoryFinded = await sequelize.models.Category.findByPk(id);
        if(!categoryFinded){
          reject(boom.notFound('Category not found'));
        }else{
          await categoryFinded.destroy();
          resolve('Category deleted successfully');
        }
      } catch (error) {
        reject(boom.notFound(error));
      }

    })


  }


}

export {CategoriesService};

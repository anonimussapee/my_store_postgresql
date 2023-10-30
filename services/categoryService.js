import boom from '@hapi/boom';
import { categories, products } from '../content/index.js'
import { idGen } from '../idGen/index.js';
import { pool } from '../libs/postgresPool.js';

class CategoriesService {

  constructor (){

    this.categories = categories;
    this.products = products;
    this.pool = pool;
    this.pool.on('error',(err)=>console.error(err));
  }

  async create(obj){
    return new Promise((resolve, reject) => {
      let newId;
      idGen(this.categories, (err,id)=>{
        if(err){
          console.error('hubo un error en generar el id para el port de las categorias: ', err);
          return false;
        }
        newId = id;
      });
      const newCategory = {...obj, id: newId};
      this.categories.push(newCategory);
      if(!this.categories[this.categories.length-1].id == newId){

        reject(boom.badRequest('bad Request'));
      }else{
        resolve(newCategory);
      }

    });

  }

  async find(){
    return new Promise(async(resolve, reject) => {
      const query = 'SELECT * FROM categories';
      const response = await this.pool.query(query);
      if(!response){
        reject(boom.notFound('Product not found'));
      }else{

        resolve(response.rows);
      }

    })
  }

  async findOne(id){
    return new Promise(async(resolve, reject) => {
      const query = `SELECT * FROM categories WHERE category_id = ${id}`;
      const response = await this.pool.query(query);
      if(response.rows.length == 0 ){
        reject(boom.notFound('Category not found'));
      }else{
        resolve(response.rows);
      }

    })

  }

  async filterForCategory(id){
    return new Promise(async(resolve, reject) => {
      const query1 = `SELECT * FROM categories`;
      const response1 = await this.pool.query(query1);
      const categoryExists = response1.rows.some(category => category['category_id'] == id);
      console.log(categoryExists);
      if(!categoryExists){
        reject(boom.notFound('Category not found'));

      }
      const query2 = `SELECT * FROM products WHERE "product_category" = ${id}`;
      const response2 = await this.pool.query(query2);
      if(response2){
        resolve(response2.rows);
      }else{
        reject(boom.notFound('products not found'));

      }
    });
  }

  async findLimitOffset(limit,offset){

    return new Promise((resolve, reject) => {
      const catLimitsOffset = this.categories.filter(category=> category.id >= offset);
      resolve(catLimitsOffset.slice(0,limit));

    })
  }

  async update(obj, id){

    return new Promise((resolve, reject) => {

      const categoryFinded = this.categories.find(category => category.id == id);

      if(!categoryFinded){

        reject(boom.notFound('Category not found'));

      }else{

        const categoryIndex = this.categories.findIndex(category => category.id == id);
        const objCreated = { ...obj, id};
        this.categories.splice(categoryIndex,1,objCreated);
        resolve(objCreated);
      }
    })


  }

  async patch(obj, id){

    return new Promise((resolve, reject) => {

      const categoryFinded = this.categories.find(category => category.id == id);

      if(!categoryFinded){

        reject(boom.notFound('Category not found'))

      }else{

        const categoryIndex = this.categories.findIndex(category => category.id == id);
        const objCreated = {...categoryFinded, ...obj, id};
        this.categories.splice(categoryIndex,1,objCreated);
        resolve(objCreated);

      }
    });

  }

  async delete(id){

    return new Promise((resolve, reject) => {

      const categoryFinded = this.categories.find(category => category.id == id);

      if(!categoryFinded){
        reject(boom.notFound('Category not found'));
      }else{
        const categoryIndex = this.categories.findIndex(category => category.id == id);
        this.categories.splice(categoryIndex, 1)
        resolve(id);
      }
    })


  }


}

export {CategoriesService};

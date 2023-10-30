import boom from '@hapi/boom';
import { products } from '../content/index.js';
import { idGen } from '../idGen/index.js';
import { pool } from '../libs/postgresPool.js';

class ProductsService {

  constructor (){

    this.products = products;
    this.pool = pool;
    this.pool.on('error',(err)=>console.error(err));
  }

  async create(data){
    return new Promise((resolve, reject) => {

      let idNew;
      idGen(this.products,(err, id)=>{
        if(err){
          console.error('error al generar el id', err);
          return false;
        }
        idNew = id;
      })
      const newProduct = {
        id :  idNew,
        ...data
      };
      this.products.push(newProduct);
      if(this.products[this.products.length-1].id == idNew){

        resolve(newProduct);

      }else{
        reject(boom.notFound('Product not Posted'));
      }

    });
  }

  async find(){

    const query = 'SELECT * FROM products';
    const response = await this.pool.query(query)
    return response.rows;
  }

  async findOne(id){
    return new Promise(async(resolve,reject)=>{
      const query = `SELECT * FROM "products" WHERE product_id = ${id}`;
      const response = await this.pool.query(query);
      if(!response){
        reject(boom.notFound('Product not found'));
      }else{
        resolve(response.rows);
      }
    })
  }

  async findLimitOffset(limit,offset){
    return new Promise((resolve, reject)=>{
        const prodLimitOffset = this.products.filter(product=> product.id >= offset);
        if(prodLimitOffset.length == 0){

          resolve(prodLimitOffset);

        }else{

          resolve(prodLimitOffset.slice(0,limit));

        }
    });
  }

  async update(obj, id){
    return new Promise((resolve, reject) => {

      const productFind = this.products.find(product => product.id == id);
      const productFindIndex = this.products.findIndex(product => product.id == id);

      if(productFind){
        const objProcess = { ...obj, id:id};
        this.products.splice(productFindIndex,1,objProcess);
        resolve(this.products[productFindIndex]);
      }else{
        reject(boom.notFound('Product not found'));
      }

    });
  }
  async patch(obj, id){
    return new Promise((resolve, reject) => {

      const productFind = this.products.find(product => product.id == id);
      const productFindIndex = this.products.findIndex(product => product.id == id);
      if(productFind){
        const objProcess = {...productFind, ...obj,  id:id,};
        this.products.splice(productFindIndex,1,objProcess);
        resolve(this.products[productFindIndex]);
      }else{
        reject(boom.notFound('Product not found'));
      }

    });
  }
  async delete(id){
    return new Promise((resolve, reject) => {

      const productIndex = this.products.findIndex(product=> product.id == id);
      if(productIndex == -1){
        reject(boom.notFound('Product not found'));
      }else{
        this.products.splice(productIndex, 1);
        resolve(id);
      }

    });
  }


}

export {ProductsService};

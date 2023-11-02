import { User, UserSchema } from './userModel.js';
import { Category, CategorySchema } from './categoryModel.js';
import { Product, ProductSchema } from './productModel.js';
function setupModels (sequelize){
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
}

export {setupModels};

import { Model, DataTypes, Sequelize} from 'sequelize';
import moment from 'moment-timezone';
import { faker } from '@faker-js/faker';

const Product_TABLE = 'products';

const CategorySchema = {
  id:{
    type:DataTypes.STRING,
    defaultValue: '1'
  }
}
const ProductSchema = {
  id:{
    allowNull: false,
    autoIncrement :true,
    primaryKey: true ,
    type: DataTypes.INTEGER
  },
  title:{
    allowNull: false,
    type: DataTypes.STRING
  },
  price:{
    allowNull:false,
    type: DataTypes.DECIMAL(5,2)
  },
  description:{
    allowNull: false,
    type: DataTypes.STRING
  },
  image:{
    type:DataTypes.ARRAY(DataTypes.STRING),
    defaultValue:[ faker.image.url()]

  },
  category:{
    type: DataTypes.JSON(DataTypes.STRING),
    default: CategorySchema,
  },
  'created_at': {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    get() {
      return moment(this.getDataValue('createdAt')).tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss');
    }
  }

};

class Product extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: Product_TABLE,
      modelName: 'Product',
      timestamps:false
    }
  }
};

export {Product_TABLE, ProductSchema, Product};

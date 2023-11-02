import { faker } from '@faker-js/faker';
import moment from 'moment-timezone';
import { Model, DataTypes, Sequelize} from 'sequelize';

const Category_TABLE = 'categories';

const CategorySchema = {
  id:{
    allowNull: false,
    autoIncrement :true,
    primaryKey: true ,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  image:{
    type:DataTypes.STRING,
    defaultValue: faker.image.url()

  },
  'created_at': {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    get() {
      return moment(this.getDataValue('createdAt')).tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

class Category extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: Category_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
};

export {Category_TABLE, CategorySchema, Category};

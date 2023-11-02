import moment from 'moment-timezone';
import { Model, DataTypes, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';
const USER_TABLE = 'users';

const UserSchema = {
  id:{
    allowNull: false,
    autoIncrement :true,
    primaryKey: true ,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull:false,
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    allowNull:false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
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

class User extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
};

export {USER_TABLE, UserSchema, User};

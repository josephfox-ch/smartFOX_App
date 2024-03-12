import sequelize from '../../../database/config.js'
import {DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';


const UserDetails = sequelize.define("UserDetails", {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users', 
        key: 'id',
      }
    },
  });

  export default UserDetails;
  
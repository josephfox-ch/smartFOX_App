import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Door = sequelize.define('Door', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  homeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Homes',
      key: 'id',
    },
  },
  roomId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Rooms',
      key: 'id',
    },
  },
});

export default Door;



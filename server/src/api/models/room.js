import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    homeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Homes",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "Rooms",
  }
);

export default Room;

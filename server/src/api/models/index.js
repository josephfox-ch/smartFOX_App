import User from "./user.js";
import Home from "./home.js";
import OTP from "./otp.js";
import Device from "./device.js";
import Event from "./event.js";
import AccessControl from "./accessControl.js";
import ClimateControl from "./climateControl.js";
import EnergyCertificate from "./energyCertificate.js";
import EnergyUsage from "./energyUsage.js";
import TemperatureRecord from "./temperatureRecord.js";
import HVACSystemLog from "./hvacSystemLog.js";
import AlertLog from "./alertLog.js";
import UserPreferences from "./userPreferences.js";
import Room from "./room.js";
import LightingControl from "./lightingControl.js";
import RoomTemperature from "./roomTemperature.js";
import LightingReport from "./lightingReport.js";

// User - UserPreferences
User.hasOne(UserPreferences, { foreignKey: "userId", onDelete: "CASCADE" });
UserPreferences.belongsTo(User, { foreignKey: "userId" });

// User - Home (One-to-Many)
User.hasMany(Home, { foreignKey: "userId", onDelete: "CASCADE" });
Home.belongsTo(User, { foreignKey: "userId" });

// Home - Device (One-to-Many)
Home.hasMany(Device, { foreignKey: "homeId", onDelete: "CASCADE" });
Device.belongsTo(Home, { foreignKey: "homeId" });

// Device - Event (One-to-Many)
Device.hasMany(Event, { foreignKey: "deviceId", onDelete: "CASCADE" });
Event.belongsTo(Device, { foreignKey: "deviceId" });

// User - Home (Many-to-Many through AccessControl)
User.belongsToMany(Home, {
  through: AccessControl,
  foreignKey: "userId",
  otherKey: "homeId",
  onDelete: "CASCADE",
});
Home.belongsToMany(User, {
  through: AccessControl,
  foreignKey: "homeId",
  otherKey: "userId",
  onDelete: "CASCADE",
});

// Home - ClimateControl (One-to-One)
Home.hasOne(ClimateControl, { foreignKey: "homeId", onDelete: "CASCADE" });
ClimateControl.belongsTo(Home, { foreignKey: "homeId" });

// Home - EnergyCertificate (One-to-One)
Home.hasOne(EnergyCertificate, { foreignKey: "homeId", onDelete: "CASCADE" });
EnergyCertificate.belongsTo(Home, { foreignKey: "homeId" });

// Home - EnergyUsage (One-to-Many)
Home.hasMany(EnergyUsage, { foreignKey: "homeId", onDelete: "CASCADE" });
EnergyUsage.belongsTo(Home, { foreignKey: "homeId" });

// Home - TemperatureRecord (One-to-Many)
Home.hasMany(TemperatureRecord, { foreignKey: "homeId", onDelete: "CASCADE" });
TemperatureRecord.belongsTo(Home, { foreignKey: "homeId" });

// Home - HVACSystemLog (One-to-Many)
Home.hasMany(HVACSystemLog, { foreignKey: "homeId", onDelete: "CASCADE" });
HVACSystemLog.belongsTo(Home, { foreignKey: "homeId" });

// Home - AlertLog (One-to-Many)
Home.hasMany(AlertLog, { foreignKey: "homeId", onDelete: "CASCADE" });
AlertLog.belongsTo(Home, { foreignKey: "homeId" });

// Room - Home (One-to-Many)
Home.hasMany(Room, { foreignKey: "homeId", onDelete: "CASCADE" });
Room.belongsTo(Home, { foreignKey: "homeId" });

// Home - LightingControl (One-to-Many)
Home.hasMany(LightingControl, { foreignKey: "homeId", onDelete: "CASCADE" });
LightingControl.belongsTo(Home, { foreignKey: "homeId" });

// LightingControl - Room (One-to-One)
Room.hasOne(LightingControl, { foreignKey: "roomId", onDelete: "CASCADE" });
LightingControl.belongsTo(Room, { foreignKey: "roomId" });

// RoomTemperature - Room (One-to-Many)
Room.hasMany(RoomTemperature, { foreignKey: "roomId", onDelete: "CASCADE" });
RoomTemperature.belongsTo(Room, { foreignKey: "roomId" });

// Home - LightingReport (One-to-Many)
Home.hasMany(LightingReport, { foreignKey: "homeId", onDelete: "CASCADE" });
LightingReport.belongsTo(Home, { foreignKey: "homeId" });

// Room - LightingReport (One-to-Many)
Room.hasMany(LightingReport, { foreignKey: "roomId", onDelete: "CASCADE" });
LightingReport.belongsTo(Room, { foreignKey: "roomId" });


export {
  User,
  Home,
  Room,
  LightingControl,
  LightingReport,
  RoomTemperature,
  OTP,
  Device,
  AccessControl,
  ClimateControl,
  EnergyCertificate,
  EnergyUsage,
  TemperatureRecord,
  HVACSystemLog,
  Event,
  AlertLog,
  UserPreferences,
};


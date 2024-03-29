import User from "./user.js";
import UserDetails from "./userDetails.js";
import Home from "./home.js";
import OTP from "./otp.js";
import Device from "./device.js";
import AccessControl from "./accessControl.js";
import ClimateControl from "./climateControl.js";
import EnergyCertificate from "./energyCertificate.js";
import Event from "./event.js";
import ExternalTemperature from "./externalTemperature.js";

User.hasOne(UserDetails, { foreignKey: "userId", onDelete: "CASCADE" });
UserDetails.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Home, { foreignKey: "userId", onDelete: "CASCADE" });
Home.belongsTo(User, { foreignKey: "userId" });

Home.hasMany(Device, { foreignKey: "homeId", onDelete: "CASCADE" });
Device.belongsTo(Home, { foreignKey: "homeId" });

Device.hasMany(Event, { foreignKey: "deviceId" });
Event.belongsTo(Device, { foreignKey: "deviceId" });

User.belongsToMany(Home, {
  through: AccessControl,
  foreignKey: "userId",
  otherKey: "homeId",
});
Home.belongsToMany(User, {
  through: AccessControl,
  foreignKey: "homeId",
  otherKey: "userId",
});

Home.hasOne(ClimateControl, { foreignKey: "homeId" });
ClimateControl.belongsTo(Home, { foreignKey: "homeId" });

Home.hasOne(ExternalTemperature, { foreignKey: "homeId" });
ExternalTemperature.belongsTo(Home, { foreignKey: "homeId" });

Home.hasOne(EnergyCertificate, { foreignKey: "homeId" });
EnergyCertificate.belongsTo(Home, { foreignKey: "homeId" });

export {
  User,
  UserDetails,
  Home,
  OTP,
  Device,
  AccessControl,
  ClimateControl,
  EnergyCertificate,
  Event,
  ExternalTemperature,
};

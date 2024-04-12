import User from "./user.js";
import Home from "./home.js";
import OTP from "./otp.js";
import Device from "./device.js";
import AccessControl from "./accessControl.js";
import ClimateControl from "./climateControl.js";
import EnergyCertificate from "./energyCertificate.js";
import Event from "./event.js";
import ExternalTemperature from "./externalTemperature.js";
import UserPreferences from "./userPreference.js";
import RefreshToken from "./refreshToken.js";

User.hasOne(UserPreferences, {foreignKey: 'userId',onDelete: "CASCADE"});
UserPreferences.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Home, { foreignKey: "userId", onDelete: "CASCADE" });
Home.belongsTo(User, { foreignKey: "userId" });

User.hasMany(RefreshToken, { foreignKey: 'userId',onDelete: "CASCADE" });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

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
  Home,
  OTP,
  Device,
  RefreshToken,
  AccessControl,
  ClimateControl,
  EnergyCertificate,
  Event,
  ExternalTemperature,
  UserPreferences,
};

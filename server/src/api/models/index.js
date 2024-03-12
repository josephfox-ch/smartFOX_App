import User from "./user.js";
import UserDetails from "./userDetails.js";
import Home from "./home.js";


User.hasOne(UserDetails, {
  foreignKey: "userId", 
  as: "UserDetails", 
});
UserDetails.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


User.hasMany(Home, {
  foreignKey: "userId", 
  as: "Homes", 
});
Home.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

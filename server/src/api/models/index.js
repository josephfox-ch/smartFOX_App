import User from "./user.js";
import UserDetails from "./userDetails.js";
import Home from "./home.js";
import UserHome from "./userHome.js";

User.hasOne(UserDetails, {
  foreignKey: "userId",

  onDelete: "CASCADE",
});
UserDetails.belongsTo(User, {
  foreignKey: "userId",
});

User.belongsToMany(Home, { through: UserHome, foreignKey: "userId" });
Home.belongsToMany(User, { through: UserHome, foreignKey: "homeId" });

export { User, UserDetails, Home, UserHome };

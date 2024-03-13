import User from "./user.js";
import UserDetails from "./userDetails.js";
import Home from "./home.js";
import UserHome from './userHome.js'; 

User.hasOne(UserDetails, {
  foreignKey: "userId", 
  as: "UserDetails",
  onDelete: 'CASCADE', 
});
UserDetails.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


User.belongsToMany(Home, { through: UserHome, as: 'homes', foreignKey: 'userId' });
Home.belongsToMany(User, { through: UserHome, as: 'users', foreignKey: 'homeId' });

export { User, UserDetails, Home, UserHome }; 





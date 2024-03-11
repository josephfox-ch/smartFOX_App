import "dotenv/config";
import { connectDB } from "./database/config.js";
import app from "./src/app.js";

const PORT = process.env.EXPRESS_PORT || 3000;



connectDB().then(async ()=>{
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
}).catch((error)=>{
  console.log('Database Connection Error ' + error.message);
  process.exit(1);
})


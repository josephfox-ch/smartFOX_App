import Sequelize from 'sequelize';

const sequelize  = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host: 'localhost',
    port: process.env.DB_PORT,
    dialect:'mysql',
    logging:false,
});

export const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync()
        console.log("Database has been synced.");
    } catch (error) {
       console.error("Unable to connect to Database",error);
       throw error;   
    }
}

export default sequelize;
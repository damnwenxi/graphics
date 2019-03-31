module.exports = {
    APP_PORT:process.env.PORT||8081,
    MYSQL:{
        host:"localhost",
        user:"root",
        password:"root",
        port:3306,
        database:"image",
        timezone:"08:00"
    }
};
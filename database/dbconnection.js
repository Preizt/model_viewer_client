const mongoose  = require('mongoose')

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then(()=>{
    console.log("Successfully connected with MongoDB Atlas ");
    
}).catch(()=>{
    console.log("Error Ocuurred");
    
})
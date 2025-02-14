const mongoose=require('mongoose')
const config = require('config');
const debug=require('debug')("development:mongoose")


mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(()=>{
    debug("connected");  
    // console.log("Connected");
    
})
.catch((err)=>{
debug(err);
// console.log(err);

})

module.exports=mongoose.connection;
const express= require('express');
const mongoose= require('mongoose');

const app=express();
const port=process.env.PORT||5000;

const DB='mongodb+srv://sac6inarya:<password>@cluster0.xj7f5.mongodb.net/<dbname>mydatabase?retryWrites=true&w=majority'

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(()=>{
    console.log("conncted");
}).catch((err)=>console.log(err));




app.listen(port,()=>{
    console.log(`server listning on port ${port}`);
})

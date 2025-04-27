const mongoose=require('mongoose')

const schema=mongoose.Schema({
    name:{
        type : String ,
        unique : true,
        required : true,
        dropDups: true
    },
      regNo:{
        type:String,
        required:true
    },
    username:{
        type : String ,
        unique : true,
        required : true,
        dropDups: true
    },
    password:{
        type : String ,
        required:true
    },
    ho:{
        type : String ,
        required:true
    },
    isactive:{
        type:Boolean,
        default:true
    }
    
    
})
module.exports=mongoose.model("airports",schema)

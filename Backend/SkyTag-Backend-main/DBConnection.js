const mongoose=require('mongoose') //third-party module - for node and mongoDb connection

// mongoose.connect("mongodb://127.0.0.1:27017/flightQR",
mongoose.connect("mongodb://127.0.0.1:27017/SuitcasePro",
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}
    )
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open',function(){console.log("ok connected")})
    module.exports=db
const express=require("express");
const app=express();
const http=require("http").createServer(app);

const PORT=process.env.PORT || 3000

app.use(express.static(__dirname+'/public'))

http.listen(PORT,function(){
    console.log(`Server started on port ${PORT}`)
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});



//socket Logic

const io=require("socket.io")(http);

io.on("connection",function(socket){
    console.log("connected....");

    socket.on("message",(msg)=>{
        socket.broadcast.emit('message',msg);
    });

});
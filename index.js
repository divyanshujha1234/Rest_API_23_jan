const express = require("express");

const app= express();

const users= require("./MOCK_DATA.json");
const fs= require("fs");

const port= 8000;

app.use(express.urlencoded({extended: false})); // plugin or a middleware

//routes

app.get("/api/users", (req,res)=>{
   return  res.json(users);
});


app.get("/api/users/:id", (req,res)=>{  //Dynamic Path Parammeters

    const id = Number(req.params.id);
    const user = users.find((user) => user.id===id);
    return res.json(user);

});


app.post("/api/users" , (req,res)=>{
    const body = req.body;
    users.push({...body, id: users.length +1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
         
        return res.json({Status: "pending"});
    });

    //TODO - create the user
    
});

app.patch("/api/users/:id" , (req,res)=>{
   
    //TODO - edit the th user id = id
    return res.json({Status: "pending"});
});

app.delete("/api/users/:id" , (req,res)=>{
   
    //TODO - delete the user id with id
    return res.json({Status: "pending"});
});


app.listen(port, ()=> console.log(`Server Started at port ${port}`));
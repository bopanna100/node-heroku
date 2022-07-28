

import express from "express";
import { MongoClient } from "mongodb";
import dotenv from'dotenv';

dotenv.config();

//console.log(process.env.MONGO_URL);


const app = express();

 
const PORT=process.env.PORT||4000;
//const MONGO_URL="mongodb://localhost";// node js 16 and before

const MONGO_URL=process.env.MONGO_URL;

 async function createConnection(){
const clint=new MongoClient(MONGO_URL);
 await clint.connect();
 console.log("mongo is connected");
return clint;
}

const clint=await createConnection();


app.use(express.json());



app.get('/', function (req, res) {
  res.send('Hello World');

});


  app.get("/movies", async function(req,res){
   

    console.log(req.query);
if(req.query.rating){
  req.query.rating=+req.query.rating;
}
console.log(req.query);
    const movies= await clint
       .db("b36")
       .collection("movies")
       .find(req.query)
       .toArray();
       res.send(movies);

  });
    

   
  
  
  app.get('/movies/:id', async function (req, res) {
   
   
   
    const{ id }=req.params;
        console.log(req.params,id);
      //  const movie=movies.find((mv) =>mv.id ===id);
      //  console.log(movie);
       const movie= await clint
       .db("b36")
       .collection("movies")
       .findOne({id:id});
      
      
      movie
       ? res.send(movie)
       :res.status(404).send({msg:"movie not found"});


      
      });


    app.post("/movies",  async function(req,res){
   
    const data=req.body;
    const result= await clint
    .db("b36")
    .collection("movies")
    .insertMany(data);
       
    res.send(result);
    
      });

      app.delete('/movies/:id', async function (req, res) {
   

        const{ id }=req.params;
            console.log(req.params,id);
         
           const result= await clint
           .db("b36")
           .collection("movies")
           .deleteOne({id:id});
          
          
          result.deletedCount >0
          
           ? res.send({msg:"movie sucessfully deleted"})
           :res.status(404).send({msg:"movie not found"});

          });
    
      
          app.put('/movies/:id', async function (req, res) {
   
   
   
            const{ id }=req.params;
                console.log(req.params,id);
               const data=req.body;


               const result= await clint
               .db("b36")
               .collection("movies")
               .updateOne({id:id},{$set:data});
              
              
               result.modifiedCount >0
          
               ? res.send({msg:"movie sucessfully updated"})
               :res.status(400).send({msg:"movie not found"});
    
        
              
              });
      
      
      
      app.listen(PORT,()=> console.log(`app is atarted in ${PORT}`));



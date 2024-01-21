// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {MongoClient} from "mongodb";
import {connectDatabase, insertDocument} from "@/helpers/db-util";


export default async function handler(req, res) {
    if(req.method==='POST'){
     const userEmail=req.body.email;
     if(!userEmail || !userEmail.includes('@')){
       res.status(422).json({message:'Invalid email address'})
       return;
     }
     let client;
     try {
         client = await connectDatabase();
     }
     catch(error){
         res.status(500).json({message:'Connecting with the database failed'})
         client.close();
         return;
     }
     try{
        await insertDocument(client,'newsletter',{email:userEmail})
         res.status(200).json({message:'comments successfully retrieved'})

         client.close()
     }
     catch(error){
         res.status(500).json({message:'Inserting failed'})
         client.close();
     }


     await client.close();
     res.status(201).json({message:'Signed up'})
  }
}

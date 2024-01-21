import {MongoClient} from "mongodb";
import {connectDatabase, getAllDocuments, insertDocument} from "@/helpers/db-util";

export default async function handler(req, res) {

    const eventId = req.query.eventId;
    let client;
    try{
        client = await connectDatabase()

    }
    catch(error){
        res.status(500).json({message: 'Connection failed'})
        return;
    }

    if (req.method === 'POST') {
        const {email, name, text} = req.body;
        if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({message: 'Invalid input'})
            await client.close()

            return;
        }
        const newComment = {
            email,
            name,
            text,
            eventId
        }
        let result;
        try{
            result = await insertDocument(client,'comments',newComment)
            newComment._id=result.insertedId
            res.status(201).json({message: 'Added comment'})

        }
        catch(error){
            res.status(500).json({message: 'Inserting comment failed'})

        }

    } else if (req.method === 'GET') {
        try{
        const documents=await getAllDocuments (client,'comments',{id:-1});
        res.status(200).json({comments: documents})

        }
        catch(error){
            res.status(500).json({message: 'Adding comment failed'})
            return;
        }
    }
    await client.close()
}
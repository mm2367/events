import {MongoClient} from "mongodb";

export async function connectDatabase(){
    const uri = `mongodb+srv://milammilhouse:NY7xxUTNwgQzVUTy@cluster0.gujedhq.mongodb.net/events?retryWrites=true&w=majority`;
    return await MongoClient.connect(uri);
}
export async function insertDocument(client, collectionName,document){
    const db=client.db();
    const result =await db.collection(collectionName).insertOne(document);
    return result;
}
export async function getAllDocuments(client, collection, sort){
    const db =client.db();
    const documents=await db.collection(collection).find().sort(sort).toArray()
    return documents
}
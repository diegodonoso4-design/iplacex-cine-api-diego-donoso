import { MongoClient, ServerApiVersion } from 'mongodb';


const uri = "mongodb+srv://api-cine:aBL4FYUDiu5NGBAl@cine-db.gptpu2q.mongodb.net/cine?retryWrites=true&w=majority&appName=Cine-DB";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


export default client;
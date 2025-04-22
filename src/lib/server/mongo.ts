// src/lib/server/mongo.ts
import { MongoClient, Db } from 'mongodb';
import { env } from '$env/dynamic/private';

const uri = env.MONGODB_URI;
const dbName = env.MONGODB_DB;

if (!uri) throw new Error('MONGODB_URI not set');
if (!dbName) throw new Error('MONGODB_DB not set');

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient>;
}

if (!globalThis._mongoClientPromise) {
    const client = new MongoClient(uri, {
        serverApi: { version: '1', strict: true, deprecationErrors: true }
    });
    globalThis._mongoClientPromise = client.connect();
}

const clientPromise: Promise<MongoClient> = globalThis._mongoClientPromise;

export async function getDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db(dbName);
}

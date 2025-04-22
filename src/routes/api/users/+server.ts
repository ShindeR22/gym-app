// src/routes/api/users/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/mongo';

export const POST: RequestHandler = async ({ request }) => {
        const { uid, phone, firstName, lastName, address } = await request.json();

        // optional: validate these fields, or verify a Firebase ID token here
        if (!uid || !phone || !firstName || !lastName) {
                return json({ error: 'Missing required user fields' }, { status: 400 });
        }

        const db = await getDb();
        const users = db.collection('users');

        // upsert so you don’t create duplicates if the same UID calls twice
        const { upsertedId } = await users.updateOne(
                { uid },
                { $set: { phone, firstName, lastName, address, updatedAt: new Date() } },
                { upsert: true }
        );

        return json(
                { message: 'User saved', uid, upsertedId },
                { status: upsertedId ? 201 : 200 }
        );
};

// src/lib/server/api/selected-plans.ts
import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/server/mongo';
import { ObjectId } from 'mongodb';

export const POST: RequestHandler = async ({ request }) => {
    const { plan, userId } = await request.json();

    if (!plan || !userId) {
        return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
    }

    try {
        const db = await getDb();
        const plans = db.collection('selectedPlans');
        const users = db.collection('users');

        // Insert into selectedPlans for history
        await plans.insertOne({
            userId: new ObjectId(userId),
            plan,
            selectedAt: new Date()
        });

        // Calculate startDate and endDate
        const startDate = new Date();
        let endDate;
        if (plan.duration === 'month') {
            endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
        } else if (plan.duration === 'year') {
            endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
        } else {
            // Default to 1 month if duration is unknown
            endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
        }

        // Define the userPlan object with additional fields
        const userPlan = {
            name: plan.name,
            price: plan.price,
            duration: plan.duration,
            features: plan.features,
            startDate: startDate,
            endDate: endDate,
            timeSlot: 'default' // Placeholder; adjust as needed
        };

        // Update the user's plan in the users collection
        await users.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { plan: userPlan } }
        );

        // Fetch the updated user document
        const updatedUser = await users.findOne({ _id: new ObjectId(userId) });

        return new Response(JSON.stringify({ message: 'Plan saved', user: updatedUser }), { status: 200 });
    } catch (err) {
        console.error('DB error:', err);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};

import { onMount } from 'svelte';
import { user } from "../../../lib/stores"; // Adjust the import path as necessary

let loading = true;

onMount(async () => {
    try {
        const response = await fetch('/api/user', {
            method: 'GET',
            credentials: 'include' // Include cookies if authentication is session-based
        });
        if (response.ok) {
            const userData = await response.json();
            user.set(userData); // Update the user store with fetched data
        } else {
            console.error('Failed to fetch user data');
        }
    } catch (err) {
        console.error('Error fetching user data:', err);
    } finally {
        loading = false; // Hide loading state after fetch attempt
    }
});
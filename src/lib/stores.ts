import { writable } from 'svelte/store';
import type { UserProfile, GymPlan, WorkoutSession, Notification } from './types';

// Mock user data
const mockUser: UserProfile = {
        id: 'user123',
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        profileImage: '/api/placeholder/100/100',
        membershipStatus: 'Active',
        plan: {
                name: 'Premium Fitness',
                startDate: '2025-03-01',
                endDate: '2025-09-01',
                timeSlot: 'Evening (6:00 PM - 8:00 PM)',
                progress: 35
        },
        dietPlan: {
                name: 'High Protein Diet',
                description: 'Balanced nutrition plan optimized for muscle growth',
                downloadLink: '#'
        },
        payments: [
                {
                        amount: 89.99,
                        dueDate: '2025-05-01',
                        status: 'Pending'
                }
        ],
        stats: {
                weight: [82, 81.5, 80.8, 80.2, 79.5, 79],
                dates: ['2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01', '2025-05-01', '2025-06-01'],
                workoutsCompleted: 24,
                caloriesBurned: 18500
        }
};

// Mock gym plans
const mockGymPlans: GymPlan[] = [
        {
                id: 'basic',
                name: 'Basic Fit',
                duration: '1 Month',
                price: 49.99,
                features: ['Access to gym equipment', 'Basic fitness assessment', 'Mobile app access'],
                popular: false
        },
        {
                id: 'pro',
                name: 'Pro Fitness',
                duration: '3 Months',
                price: 129.99,
                features: [
                        'All Basic features',
                        '2 Personal training sessions',
                        'Nutrition consultation',
                        'Group classes'
                ],
                popular: true
        },
        {
                id: 'elite',
                name: 'Elite Performance',
                duration: '6 Months',
                price: 249.99,
                features: [
                        'All Pro features',
                        'Unlimited personal training',
                        'Custom diet plans',
                        'Recovery sessions',
                        'Performance tracking'
                ],
                popular: false
        }
];

// Mock workout sessions
const mockWorkoutSessions: WorkoutSession[] = [
        {
                id: 'ws1',
                name: 'HIIT Training',
                trainer: 'Sarah Miller',
                date: '2025-04-21',
                time: '18:00',
                duration: '45 min',
                status: 'upcoming'
        },
        {
                id: 'ws2',
                name: 'Strength Building',
                trainer: 'Mike Reynolds',
                date: '2025-04-23',
                time: '19:00',
                duration: '60 min',
                status: 'upcoming'
        },
        {
                id: 'ws3',
                name: 'Yoga Flow',
                trainer: 'Lisa Wong',
                date: '2025-04-18',
                time: '17:30',
                duration: '50 min',
                status: 'completed'
        }
];

// Mock notifications
const mockNotifications: Notification[] = [
        {
                id: 'n1',
                title: 'Payment Reminder',
                message: 'Your monthly payment is due in 3 days',
                date: '2025-04-18',
                read: false,
                type: 'payment'
        },
        {
                id: 'n2',
                title: 'New Workout Plan',
                message: 'Your trainer has updated your workout plan',
                date: '2025-04-17',
                read: true,
                type: 'workout'
        },
        {
                id: 'n3',
                title: 'Achievement Unlocked',
                message: 'Congratulations! Youve completed 20 workouts',
                date: '2025-04-15',
                read: false,
                type: 'achievement'
        }
];

export const user = writable<UserProfile>(mockUser);
export const gymPlans = writable<GymPlan[]>(mockGymPlans);
export const workoutSessions = writable<WorkoutSession[]>(mockWorkoutSessions);
export const notifications = writable<Notification[]>(mockNotifications);
export const showNotifications = writable<boolean>(false);
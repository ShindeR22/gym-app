export interface UserProfile {
        id: string;
        name: string;
        email: string;
        profileImage: string;
        membershipStatus: string;
        plan: {
                name: string;
                startDate: string;
                endDate: string;
                timeSlot: string;
                progress: number;
        };
        dietPlan: {
                name: string;
                description: string;
                downloadLink: string;
        };
        payments: {
                amount: number;
                dueDate: string;
                status: string;
        }[];
        stats?: {
                weight: number[];
                dates: string[];
                workoutsCompleted: number;
                caloriesBurned: number;
        };
}

export interface GymPlan {
        id: string;
        name: string;
        duration: string;
        price: number;
        features: string[];
        popular: boolean;
}

export interface WorkoutSession {
        id: string;
        name: string;
        trainer: string;
        date: string;
        time: string;
        duration: string;
        status: 'upcoming' | 'completed' | 'canceled';
}

export interface Notification {
        id: string;
        title: string;
        message: string;
        date: string;
        read: boolean;
        type: 'info' | 'payment' | 'workout' | 'achievement';
}
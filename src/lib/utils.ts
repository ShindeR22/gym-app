export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getDaysRemaining(endDate: string): number {
	const end = new Date(endDate);
	const now = new Date();
	const diffTime = end.getTime() - now.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getProgressBarColor(progress: number): string {
	if (progress < 30) return 'bg-red-500';
	if (progress < 70) return 'bg-yellow-500';
	return 'bg-green-500';
}
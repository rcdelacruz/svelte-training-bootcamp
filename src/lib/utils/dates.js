// Date utility functions

// Format date for display
export function formatDate(date, options = {}) {
	const {
		format = 'short',
		locale = 'en-US'
	} = options;
	
	const dateObj = new Date(date);
	
	if (isNaN(dateObj.getTime())) {
		return 'Invalid Date';
	}
	
	switch (format) {
		case 'short':
			return dateObj.toLocaleDateString(locale, {
				month: 'short',
				day: 'numeric'
			});
			
		case 'medium':
			return dateObj.toLocaleDateString(locale, {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
			
		case 'long':
			return dateObj.toLocaleDateString(locale, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
			
		default:
			return dateObj.toLocaleDateString(locale);
	}
}

// Check if date is overdue
export function isOverdue(date) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const dateObj = new Date(date);
	dateObj.setHours(0, 0, 0, 0);
	
	return dateObj < today;
}

// Get relative time (e.g., "2 hours ago", "in 3 days")
export function getRelativeTime(date) {
	const now = new Date();
	const dateObj = new Date(date);
	const diffInSeconds = (dateObj - now) / 1000;
	
	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 },
		{ label: 'week', seconds: 604800 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 1 }
	];
	
	for (const interval of intervals) {
		const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds);
		
		if (count >= 1) {
			const plural = count !== 1 ? 's' : '';
			
			if (diffInSeconds > 0) {
				return `in ${count} ${interval.label}${plural}`;
			} else {
				return `${count} ${interval.label}${plural} ago`;
			}
		}
	}
	
	return 'just now';
}

// Get ISO date string (YYYY-MM-DD)
export function toISODateString(date) {
	const dateObj = new Date(date);
	return dateObj.toISOString().split('T')[0];
}
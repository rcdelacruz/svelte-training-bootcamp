import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Default theme
const defaultTheme = 'light';

// Get initial theme from localStorage or system preference
function getInitialTheme() {
	if (!browser) return defaultTheme;
	
	// Check localStorage first
	const stored = localStorage.getItem('flowboard-theme');
	if (stored && ['light', 'dark'].includes(stored)) {
		return stored;
	}
	
	// Fall back to system preference
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	
	return defaultTheme;
}

// Create theme store
function createThemeStore() {
	const { subscribe, set, update } = writable(getInitialTheme());

	return {
		subscribe,
		
		// Toggle between light and dark
		toggle: () => update(current => current === 'light' ? 'dark' : 'light'),
		
		// Set specific theme
		set: (theme) => {
			if (['light', 'dark'].includes(theme)) {
				set(theme);
			}
		},
		
		// Reset to system preference
		resetToSystem: () => {
			if (browser) {
				const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
				set(systemTheme);
			}
		}
	};
}

export const theme = createThemeStore();

// Apply theme to document when it changes
if (browser) {
	theme.subscribe((currentTheme) => {
		// Save to localStorage
		localStorage.setItem('flowboard-theme', currentTheme);
		
		// Apply to document
		document.documentElement.setAttribute('data-theme', currentTheme);
		
		// Update meta theme-color for mobile browsers
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (metaThemeColor) {
			metaThemeColor.setAttribute('content', currentTheme === 'dark' ? '#0f172a' : '#ffffff');
		}
	});
}
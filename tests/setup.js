import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock browser environment
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	}))
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
	value: {
		getItem: vi.fn(),
		setItem: vi.fn(),
		removeItem: vi.fn(),
		clear: vi.fn()
	}
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn()
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn()
}));

// Set up global fetch mock
global.fetch = vi.fn();

// Mock crypto.randomUUID for Node.js environment
if (!global.crypto) {
	global.crypto = {
		randomUUID: () => Math.random().toString(36).substring(2, 15)
	};
}
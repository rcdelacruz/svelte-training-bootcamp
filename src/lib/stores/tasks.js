import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Create tasks store
function createTasksStore() {
	const { subscribe, set, update } = writable([]);

	// Load tasks from localStorage on initialization
	if (browser) {
		const stored = localStorage.getItem('flowboard-tasks');
		if (stored) {
			try {
				set(JSON.parse(stored));
			} catch (error) {
				console.error('Failed to parse stored tasks:', error);
			}
		}
	}

	// Save to localStorage whenever tasks change
	if (browser) {
		subscribe((tasks) => {
			localStorage.setItem('flowboard-tasks', JSON.stringify(tasks));
		});
	}

	return {
		subscribe,
		
		// Add a new task
		addTask: (task) => {
			const newTask = {
				id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				...task
			};
			update(tasks => [...tasks, newTask]);
			return newTask;
		},

		// Update an existing task
		updateTask: (taskId, updates) => {
			update(tasks => tasks.map(task => 
				task.id === taskId 
					? { ...task, ...updates, updatedAt: new Date().toISOString() }
					: task
			));
		},

		// Delete a task
		deleteTask: (taskId) => {
			update(tasks => tasks.filter(task => task.id !== taskId));
		},

		// Move task to different status
		moveTask: (taskId, newStatus) => {
			update(tasks => tasks.map(task => 
				task.id === taskId 
					? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
					: task
			));
		},

		// Clear all tasks
		clearAll: () => set([]),

		// Import tasks
		importTasks: (tasks) => {
			const validTasks = tasks.filter(task => 
				task.id && task.title && task.status
			);
			set(validTasks);
		}
	};
}

export const tasks = createTasksStore();

// Derived stores for filtered views
export const tasksByStatus = derived(
	tasks,
	($tasks) => {
		return $tasks.reduce((acc, task) => {
			if (!acc[task.status]) {
				acc[task.status] = [];
			}
			acc[task.status].push(task);
			return acc;
		}, {});
	}
);

export const overdueTasks = derived(
	tasks,
	($tasks) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		return $tasks.filter(task => {
			if (!task.dueDate || task.status === 'done') return false;
			const dueDate = new Date(task.dueDate);
			return dueDate < today;
		});
	}
);

export const taskStats = derived(
	tasks,
	($tasks) => {
		const total = $tasks.length;
		const completed = $tasks.filter(t => t.status === 'done').length;
		const inProgress = $tasks.filter(t => t.status === 'in-progress').length;
		const todo = $tasks.filter(t => t.status === 'todo').length;
		
		return {
			total,
			completed,
			inProgress,
			todo,
			completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
		};
	}
);
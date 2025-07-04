<script>
	import { onMount } from 'svelte';
	import Board from '$lib/components/Board.svelte';
	import { tasks, taskStats } from '$lib/stores/tasks.js';
	import { theme } from '$lib/stores/theme.js';
	
	// Column configuration
	let columns = [
		{ id: 'todo', title: 'To Do', status: 'todo' },
		{ id: 'in-progress', title: 'In Progress', status: 'in-progress' },
		{ id: 'done', title: 'Done', status: 'done' }
	];

	// Initialize with sample data if no tasks exist
	onMount(() => {
		if ($tasks.length === 0) {
			const sampleTasks = [
				{
					title: 'Setup project structure',
					description: 'Initialize SvelteKit project and create basic components',
					status: 'done',
					priority: 'high',
					dueDate: '2025-07-08'
				},
				{
					title: 'Create TaskCard component',
					description: 'Build reusable task card with editing capabilities',
					status: 'in-progress',
					priority: 'high',
					dueDate: '2025-07-09'
				},
				{
					title: 'Implement drag & drop',
					description: 'Add drag and drop functionality to kanban board',
					status: 'todo',
					priority: 'medium',
					dueDate: '2025-07-10'
				},
				{
					title: 'Add local storage',
					description: 'Persist tasks to local storage',
					status: 'todo',
					priority: 'medium',
					dueDate: '2025-07-11'
				}
			];
			
			sampleTasks.forEach(task => tasks.addTask(task));
		}
	});

	// Add new task
	function addTask() {
		const newTask = {
			title: 'New Task',
			description: 'Double-click to edit this task',
			status: 'todo',
			priority: 'medium',
			dueDate: new Date().toISOString().split('T')[0]
		};
		tasks.addTask(newTask);
	}

	// Handle task moved between columns
	function handleTaskMoved(event) {
		const { taskId, toStatus } = event.detail;
		tasks.moveTask(taskId, toStatus);
	}

	// Handle task updated
	function handleTaskUpdated(event) {
		const { taskId, updates } = event.detail;
		tasks.updateTask(taskId, updates);
	}

	// Handle task created
	function handleTaskCreated(event) {
		const newTask = event.detail;
		tasks.addTask(newTask);
	}

	// Handle task deleted
	function handleTaskDeleted(event) {
		const { taskId } = event.detail;
		tasks.deleteTask(taskId);
	}

	// Toggle theme
	function toggleTheme() {
		theme.toggle();
	}
</script>

<svelte:head>
	<title>FlowBoard - Modern Project Management</title>
	<meta name="description" content="A modern kanban board built with SvelteKit" />
</svelte:head>

<div class="container">
	<header class="header">
		<div class="header-content">
			<div class="header-main">
				<h1>🚀 FlowBoard</h1>
				<p>Modern Project Management Platform</p>
			</div>
			
			<div class="header-stats">
				<div class="stat">
					<span class="stat-number">{$taskStats.total}</span>
					<span class="stat-label">Total Tasks</span>
				</div>
				<div class="stat">
					<span class="stat-number">{$taskStats.completed}</span>
					<span class="stat-label">Completed</span>
				</div>
				<div class="stat">
					<span class="stat-number">{$taskStats.completionRate}%</span>
					<span class="stat-label">Progress</span>
				</div>
			</div>
		</div>
		
		<div class="header-actions">
			<button class="btn btn-secondary" on:click={toggleTheme}>
				{$theme === 'light' ? '🌙' : '☀️'} 
				{$theme === 'light' ? 'Dark' : 'Light'} Mode
			</button>
			<button class="btn btn-primary" on:click={addTask}>
				+ Add Task
			</button>
		</div>
	</header>

	<Board 
		{columns}
		tasks={$tasks}
		on:taskMoved={handleTaskMoved}
		on:taskUpdated={handleTaskUpdated}
		on:taskCreated={handleTaskCreated}
		on:taskDeleted={handleTaskDeleted}
	/>
	
	{#if $tasks.length === 0}
		<div class="welcome">
			<div class="welcome-content">
				<h2>Welcome to FlowBoard! 👋</h2>
				<p>Get started by creating your first task.</p>
				<button class="btn btn-primary" on:click={addTask}>
					Create First Task
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--spacing-lg);
		min-height: 100vh;
	}

	.header {
		margin-bottom: var(--spacing-xl);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.header-main h1 {
		font-size: 2.5rem;
		margin: 0 0 var(--spacing-sm);
		color: var(--primary-color);
		font-weight: 700;
	}

	.header-main p {
		color: var(--text-secondary);
		margin: 0;
		font-size: var(--font-size-lg);
	}

	.header-stats {
		display: flex;
		gap: var(--spacing-lg);
	}

	.stat {
		text-align: center;
		padding: var(--spacing-md);
		background-color: var(--bg-primary);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-color);
		box-shadow: var(--shadow-sm);
		min-width: 80px;
	}

	.stat-number {
		display: block;
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--primary-color);
		margin-bottom: var(--spacing-xs);
	}

	.stat-label {
		display: block;
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.header-actions {
		display: flex;
		gap: var(--spacing-md);
		align-items: center;
	}

	.welcome {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 400px;
		margin-top: var(--spacing-xl);
	}

	.welcome-content {
		text-align: center;
		padding: var(--spacing-xl);
		background-color: var(--bg-primary);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-color);
		box-shadow: var(--shadow-md);
		max-width: 400px;
	}

	.welcome-content h2 {
		margin: 0 0 var(--spacing-md);
		color: var(--text-primary);
		font-size: var(--font-size-xl);
	}

	.welcome-content p {
		margin: 0 0 var(--spacing-lg);
		color: var(--text-secondary);
	}

	/* Responsive design */
	@media (max-width: 1024px) {
		.header-content {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-lg);
		}
		
		.header-stats {
			align-self: stretch;
			justify-content: space-around;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: var(--spacing-md);
		}
		
		.header-main h1 {
			font-size: 2rem;
		}
		
		.header-stats {
			gap: var(--spacing-sm);
		}
		
		.stat {
			padding: var(--spacing-sm);
			min-width: 60px;
		}
		
		.header-actions {
			flex-direction: column;
			width: 100%;
		}
		
		.header-actions .btn {
			width: 100%;
		}
	}
</style>
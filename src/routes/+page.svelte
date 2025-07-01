<script>
	import TaskCard from '$lib/components/TaskCard.svelte';
	
	// Sample data for Week 1
	let tasks = [
		{
			id: '1',
			title: 'Setup project structure',
			description: 'Initialize SvelteKit project and create basic components',
			status: 'done',
			priority: 'high',
			dueDate: '2024-07-08'
		},
		{
			id: '2',
			title: 'Create TaskCard component',
			description: 'Build reusable task card with editing capabilities',
			status: 'in-progress',
			priority: 'high',
			dueDate: '2024-07-09'
		},
		{
			id: '3',
			title: 'Implement drag & drop',
			description: 'Add drag and drop functionality to kanban board',
			status: 'todo',
			priority: 'medium',
			dueDate: '2024-07-10'
		},
		{
			id: '4',
			title: 'Add local storage',
			description: 'Persist tasks to local storage',
			status: 'todo',
			priority: 'medium',
			dueDate: '2024-07-11'
		}
	];

	let columns = [
		{ id: 'todo', title: 'To Do', status: 'todo' },
		{ id: 'in-progress', title: 'In Progress', status: 'in-progress' },
		{ id: 'done', title: 'Done', status: 'done' }
	];

	// Get tasks for a specific column
	function getTasksForColumn(status) {
		return tasks.filter(task => task.status === status);
	}

	// Add new task (placeholder for Week 1)
	function addTask() {
		const newTask = {
			id: Date.now().toString(),
			title: 'New Task',
			description: 'Click to edit this task',
			status: 'todo',
			priority: 'medium',
			dueDate: new Date().toISOString().split('T')[0]
		};
		tasks = [...tasks, newTask];
	}
</script>

<svelte:head>
	<title>FlowBoard - Kanban Board</title>
</svelte:head>

<div class="container">
	<header class="header">
		<h1>🚀 FlowBoard</h1>
		<p>Modern Project Management - Week 1 Demo</p>
		<button class="btn btn-primary" on:click={addTask}>
			+ Add Task
		</button>
	</header>

	<div class="board">
		{#each columns as column (column.id)}
			<div class="column">
				<div class="column-header">
					<h3>{column.title}</h3>
					<span class="task-count">{getTasksForColumn(column.status).length}</span>
				</div>
				
				<div class="task-list">
					{#each getTasksForColumn(column.status) as task (task.id)}
						<TaskCard {task} />
					{/each}
					
					{#if getTasksForColumn(column.status).length === 0}
						<div class="empty-state">
							<p>No tasks yet</p>
							<small>Drag tasks here or create new ones</small>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--spacing-lg);
	}

	.header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.header h1 {
		font-size: var(--font-size-2xl);
		margin: 0 0 var(--spacing-sm);
		color: var(--primary-color);
	}

	.header p {
		color: var(--text-secondary);
		margin: 0 0 var(--spacing-lg);
	}

	.board {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-lg);
		margin-top: var(--spacing-xl);
	}

	.column {
		background-color: var(--bg-primary);
		border-radius: var(--radius-lg);
		padding: var(--spacing-md);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--border-color);
	}

	.column-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-md);
		padding-bottom: var(--spacing-sm);
		border-bottom: 1px solid var(--border-light);
	}

	.column-header h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		color: var(--text-primary);
	}

	.task-count {
		background-color: var(--bg-tertiary);
		color: var(--text-secondary);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		font-weight: 500;
	}

	.task-list {
		min-height: 200px;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl);
		text-align: center;
		color: var(--text-muted);
		border: 2px dashed var(--border-color);
		border-radius: var(--radius-md);
		margin-top: var(--spacing-md);
	}

	.empty-state p {
		margin: 0 0 var(--spacing-xs);
		font-weight: 500;
	}

	.empty-state small {
		font-size: var(--font-size-sm);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.container {
			padding: var(--spacing-md);
		}
		
		.board {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}
	}
</style>
<script>
	import { createEventDispatcher } from 'svelte';
	import TaskCard from './TaskCard.svelte';

	export let column;
	export let tasks = [];
	export let allowDrop = true;

	const dispatch = createEventDispatcher();

	// Handle task updates
	function handleTaskUpdate(event) {
		dispatch('taskUpdated', event.detail);
	}

	// Handle task deletion
	function handleTaskDelete(event) {
		dispatch('taskDeleted', event.detail);
	}

	// Get column theme color
	function getColumnColor(status) {
		const colors = {
			todo: '#64748b',
			'in-progress': '#f59e0b', 
			done: '#10b981',
			blocked: '#ef4444',
			review: '#8b5cf6'
		};
		return colors[status] || '#64748b';
	}
</script>

<div 
	class="column" 
	style="--column-color: {getColumnColor(column.status)}"
>
	<div class="column-header">
		<div class="column-title">
			<h3>{column.title}</h3>
			<span class="task-count">{tasks.length}</span>
		</div>
	</div>

	<div class="task-list">
		{#each tasks as task (task.id)}
			<div class="task-wrapper">
				<TaskCard 
					{task}
					on:taskUpdated={handleTaskUpdate}
					on:taskDeleted={handleTaskDelete}
				/>
			</div>
		{/each}
	</div>

	{#if tasks.length === 0}
		<div class="empty-state">
			<div class="empty-icon">📄</div>
			<p>No tasks yet</p>
			<small>Drag tasks here or click + to add</small>
		</div>
	{/if}
</div>

<style>
	.column {
		background-color: var(--bg-primary);
		border: 1px solid var(--border-color);
		border-top: 3px solid var(--column-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-md);
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		min-height: 400px;
		transition: all var(--transition-fast);
	}

	.column:hover {
		box-shadow: var(--shadow-md);
	}

	.column-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-md);
		padding-bottom: var(--spacing-sm);
		border-bottom: 1px solid var(--border-light);
	}

	.column-title {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.column-title h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		color: var(--text-primary);
		font-weight: 600;
	}

	.task-count {
		background-color: var(--column-color);
		color: white;
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		font-weight: 500;
		min-width: 24px;
		text-align: center;
	}

	.task-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		min-height: 100px;
	}

	.task-wrapper {
		transition: transform var(--transition-fast);
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
		transition: all var(--transition-fast);
	}

	.empty-state:hover {
		border-color: var(--column-color);
		color: var(--text-secondary);
	}

	.empty-icon {
		font-size: 2rem;
		margin-bottom: var(--spacing-sm);
	}

	.empty-state p {
		margin: 0 0 var(--spacing-xs);
		font-weight: 500;
		color: var(--text-secondary);
	}

	.empty-state small {
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}
</style>
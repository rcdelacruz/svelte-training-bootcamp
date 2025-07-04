<script>
	import { createEventDispatcher } from 'svelte';
	import Column from './Column.svelte';

	export let columns = [];
	export let tasks = [];
	export let allowDrop = true;

	const dispatch = createEventDispatcher();

	// Get tasks for a specific column
	function getTasksForColumn(status) {
		return tasks.filter(task => task.status === status);
	}

	// Handle task drop between columns
	function handleTaskDrop(event) {
		const { fromColumn, toColumn, task } = event.detail;
		
		if (fromColumn !== toColumn) {
			dispatch('taskMoved', {
				taskId: task.id,
				fromStatus: fromColumn,
				toStatus: toColumn
			});
		}
	}

	// Handle task updates
	function handleTaskUpdate(event) {
		dispatch('taskUpdated', event.detail);
	}

	// Handle task creation
	function handleTaskCreate(event) {
		dispatch('taskCreated', event.detail);
	}

	// Handle task deletion
	function handleTaskDelete(event) {
		dispatch('taskDeleted', event.detail);
	}
</script>

<div class="board" class:drop-disabled={!allowDrop}>
	{#each columns as column (column.id)}
		<Column 
			{column}
			tasks={getTasksForColumn(column.status)}
			{allowDrop}
			on:taskMoved={handleTaskDrop}
			on:taskUpdated={handleTaskUpdate}
			on:taskCreated={handleTaskCreate}
			on:taskDeleted={handleTaskDelete}
		/>
	{/each}
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-lg);
		padding: var(--spacing-lg);
		min-height: 500px;
	}

	.board.drop-disabled {
		pointer-events: none;
		opacity: 0.6;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.board {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
			padding: var(--spacing-md);
		}
	}
</style>
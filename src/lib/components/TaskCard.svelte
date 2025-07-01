<script>
	export let task;

	// Local state for editing
	let isEditing = false;
	let editTitle = task.title;
	let editDescription = task.description;

	// Priority colors
	const priorityColors = {
		high: '--danger-color',
		medium: '--warning-color',
		low: '--success-color'
	};

	// Handle double-click to edit
	function startEdit() {
		isEditing = true;
		editTitle = task.title;
		editDescription = task.description;
	}

	// Save changes
	function saveEdit() {
		task.title = editTitle;
		task.description = editDescription;
		isEditing = false;
	}

	// Cancel editing
	function cancelEdit() {
		editTitle = task.title;
		editDescription = task.description;
		isEditing = false;
	}

	// Handle keyboard events
	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			saveEdit();
		} else if (event.key === 'Escape') {
			cancelEdit();
		}
	}

	// Get priority color
	function getPriorityColor(priority) {
		return `var(${priorityColors[priority] || priorityColors.medium})`;
	}

	// Format date
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	// Check if task is overdue
	function isOverdue(dueDate) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const due = new Date(dueDate);
		return due < today;
	}
</script>

<div 
	class="task-card" 
	class:editing={isEditing}
	class:overdue={isOverdue(task.dueDate)}
	style="--priority-color: {getPriorityColor(task.priority)}"
	on:dblclick={startEdit}
	role="button"
	tabindex="0"
	on:keydown={(e) => e.key === 'Enter' && startEdit()}
>
	{#if isEditing}
		<!-- Edit mode -->
		<div class="edit-form">
			<input
				class="edit-title"
				bind:value={editTitle}
				on:keydown={handleKeydown}
				placeholder="Task title..."
				autofocus
			/>
			<textarea
				class="edit-description"
				bind:value={editDescription}
				on:keydown={handleKeydown}
				placeholder="Task description..."
				rows="2"
			></textarea>
			<div class="edit-actions">
				<button class="btn btn-sm btn-primary" on:click={saveEdit}>
					Save
				</button>
				<button class="btn btn-sm btn-secondary" on:click={cancelEdit}>
					Cancel
				</button>
			</div>
		</div>
	{:else}
		<!-- Display mode -->
		<div class="task-content">
			<h4 class="task-title">{task.title}</h4>
			{#if task.description}
				<p class="task-description">{task.description}</p>
			{/if}
		</div>
		
		<div class="task-meta">
			<div class="task-priority">
				<span class="priority-dot"></span>
				{task.priority}
			</div>
			<div class="task-due-date" class:overdue={isOverdue(task.dueDate)}>
				📅 {formatDate(task.dueDate)}
			</div>
		</div>
		
		<div class="task-actions">
			<button class="action-btn" on:click={startEdit} title="Edit task">
				✏️
			</button>
			<button class="action-btn danger" title="Delete task">
				🗑️
			</button>
		</div>
	{/if}
</div>

<style>
	.task-card {
		background-color: var(--bg-primary);
		border: 1px solid var(--border-color);
		border-left: 4px solid var(--priority-color);
		border-radius: var(--radius-md);
		padding: var(--spacing-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		position: relative;
		box-shadow: var(--shadow-sm);
	}

	.task-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--primary-color);
	}

	.task-card.editing {
		border-color: var(--primary-color);
		box-shadow: var(--shadow-md);
		cursor: default;
	}

	.task-card.overdue {
		background-color: #fef2f2;
		border-left-color: var(--danger-color);
	}

	[data-theme='dark'] .task-card.overdue {
		background-color: #450a0a;
	}

	.task-content {
		margin-bottom: var(--spacing-sm);
	}

	.task-title {
		margin: 0 0 var(--spacing-xs);
		font-size: var(--font-size-base);
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.task-description {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		line-height: 1.4;
	}

	.task-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-sm);
		font-size: var(--font-size-sm);
	}

	.task-priority {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--text-secondary);
		text-transform: capitalize;
	}

	.priority-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--priority-color);
	}

	.task-due-date {
		color: var(--text-muted);
	}

	.task-due-date.overdue {
		color: var(--danger-color);
		font-weight: 500;
	}

	.task-actions {
		display: flex;
		gap: var(--spacing-xs);
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.task-card:hover .task-actions {
		opacity: 1;
	}

	.action-btn {
		background: none;
		border: none;
		padding: var(--spacing-xs);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--font-size-sm);
		transition: background-color var(--transition-fast);
	}

	.action-btn:hover {
		background-color: var(--bg-secondary);
	}

	.action-btn.danger:hover {
		background-color: var(--danger-color);
		color: white;
	}

	/* Edit form styles */
	.edit-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.edit-title {
		font-size: var(--font-size-base);
		font-weight: 600;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: var(--spacing-sm);
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}

	.edit-title:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	.edit-description {
		font-size: var(--font-size-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: var(--spacing-sm);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		resize: vertical;
		min-height: 60px;
	}

	.edit-description:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	.edit-actions {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: flex-end;
	}

	.btn-sm {
		padding: var(--spacing-xs) var(--spacing-sm);
		font-size: var(--font-size-sm);
	}

	/* Focus styles for accessibility */
	.task-card:focus {
		outline: 2px solid var(--primary-color);
		outline-offset: 2px;
	}
</style>
import { render, fireEvent, screen } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import TaskCard from '../../src/lib/components/TaskCard.svelte';

describe('TaskCard Component', () => {
	const mockTask = {
		id: '1',
		title: 'Test Task',
		description: 'Test Description',
		status: 'todo',
		priority: 'medium',
		dueDate: '2024-12-31'
	};

	test('renders task information correctly', () => {
		render(TaskCard, { props: { task: mockTask } });
		
		expect(screen.getByText('Test Task')).toBeInTheDocument();
		expect(screen.getByText('Test Description')).toBeInTheDocument();
		expect(screen.getByText('medium')).toBeInTheDocument();
	});

	test('enters edit mode on double click', async () => {
		render(TaskCard, { props: { task: mockTask } });
		
		const taskCard = screen.getByRole('button');
		await fireEvent.dblClick(taskCard);
		
		expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
		expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
	});

	test('shows overdue styling for past due dates', () => {
		const overdueTask = {
			...mockTask,
			dueDate: '2020-01-01'
		};
		
		render(TaskCard, { props: { task: overdueTask } });
		
		const taskCard = screen.getByRole('button');
		expect(taskCard).toHaveClass('overdue');
	});
});
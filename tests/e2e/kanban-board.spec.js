import { test, expect } from '@playwright/test';

test.describe('Kanban Board', () => {
	test.beforeEach(async ({ page }) => {
		// Clear localStorage before each test
		await page.evaluate(() => localStorage.clear());
		await page.goto('/');
	});

	test('displays the kanban board correctly', async ({ page }) => {
		// Check page title
		await expect(page).toHaveTitle(/FlowBoard/);
		
		// Check main heading
		await expect(page.getByRole('heading', { name: '🚀 FlowBoard' })).toBeVisible();
		
		// Check columns are present
		await expect(page.getByText('To Do')).toBeVisible();
		await expect(page.getByText('In Progress')).toBeVisible();
		await expect(page.getByText('Done')).toBeVisible();
	});

	test('displays sample tasks', async ({ page }) => {
		// Check that sample tasks are visible
		await expect(page.getByText('Setup project structure')).toBeVisible();
		await expect(page.getByText('Create TaskCard component')).toBeVisible();
		await expect(page.getByText('Implement drag & drop')).toBeVisible();
		await expect(page.getByText('Add local storage')).toBeVisible();
	});

	test('can add a new task', async ({ page }) => {
		// Click the Add Task button
		await page.getByRole('button', { name: '+ Add Task' }).click();
		
		// Check that a new task appears
		await expect(page.getByText('New Task')).toBeVisible();
	});

	test('can edit a task by double-clicking', async ({ page }) => {
		// Double-click on the first task
		const firstTask = page.locator('.task-card').first();
		await firstTask.dblclick();
		
		// Check that edit form appears
		await expect(page.locator('.edit-title')).toBeVisible();
		await expect(page.locator('.edit-description')).toBeVisible();
		
		// Edit the title
		const titleInput = page.locator('.edit-title');
		await titleInput.fill('Edited Task Title');
		
		// Save by pressing Enter
		await titleInput.press('Enter');
		
		// Verify the title was updated
		await expect(page.getByText('Edited Task Title')).toBeVisible();
	});

	test('shows task priority indicators', async ({ page }) => {
		// Check that priority dots are visible
		const priorityDots = page.locator('.priority-dot');
		await expect(priorityDots.first()).toBeVisible();
		
		// Check priority text is displayed
		await expect(page.getByText('high')).toBeVisible();
		await expect(page.getByText('medium')).toBeVisible();
	});

	test('is responsive on mobile', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		
		// Check that board layout adapts to mobile
		const board = page.locator('.board');
		await expect(board).toBeVisible();
	});
});
const { test, expect } = require('@playwright/test');

test.describe('Roadmap Manager', () => {
    test.beforeEach(async ({ page }) => {
        // Clear localStorage before each test
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    test('should load the application', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Roadmap Manager/);
    });

    test('should display header with project title', async ({ page }) => {
        await page.goto('/');
        const title = page.locator('#project-title');
        await expect(title).toBeVisible();
        await expect(title).toContainText(/Roadmap|Projet/i);
    });

    test('should display progress bar', async ({ page }) => {
        await page.goto('/');
        const progressBar = page.locator('#header-progress');
        await expect(progressBar).toBeAttached();
    });

    test('should display add phase button', async ({ page }) => {
        await page.goto('/');
        const addButton = page.getByRole('button', { name: /ajouter une nouvelle phase|add a new phase/i });
        await expect(addButton).toBeVisible();
    });

    test('should add a new phase', async ({ page }) => {
        await page.goto('/');

        // Get initial phase count
        const initialCount = await page.locator('.phase-card').count();

        // Click add phase button
        const addButton = page.getByRole('button', { name: /ajouter une nouvelle phase|add a new phase/i });
        await addButton.click();

        // Wait for the new phase to appear
        await expect(page.locator('.phase-card')).toHaveCount(initialCount + 1);

        // Check that a phase card exists
        const phaseCard = page.locator('.phase-card').last();
        await expect(phaseCard).toBeVisible();
    });

    test('should toggle task completion', async ({ page }) => {
        await page.goto('/');

        // Get initial phase count (should be 1 default phase)
        const initialCount = await page.locator('.phase-card').count();

        // Find and click the first checkbox
        const checkbox = page.locator('.custom-checkbox').first();
        await expect(checkbox).toBeVisible();

        // Check the checkbox
        await checkbox.check();

        // Verify it's checked
        await expect(checkbox).toBeChecked();
    });

    test('should save data to localStorage', async ({ page }) => {
        await page.goto('/');

        // Toggle a task to trigger save
        const checkbox = page.locator('.custom-checkbox').first();
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        // Check that data was saved to localStorage
        const savedData = await page.evaluate(() => {
            return localStorage.getItem('roadmap_data_v4');
        });

        expect(savedData).toBeTruthy();
        expect(savedData).toContain('tasks');
        expect(savedData).toContain('done');
    });

    test('should change language', async ({ page }) => {
        await page.goto('/');

        // Select English
        await page.locator('#lang-selector').selectOption('en');

        // Check that some text changed to English
        const addButton = page.getByRole('button', { name: /add a new phase/i });
        await expect(addButton).toBeVisible();
    });

    test('should update global progress', async ({ page }) => {
        await page.goto('/');

        // Get initial progress
        const initialProgress = await page.locator('#header-percent').textContent();

        // Toggle a task
        const checkbox = page.locator('.custom-checkbox').first();
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        // Wait for progress to update
        await expect(page.locator('#header-percent')).not.toHaveText(initialProgress);

        // Get updated progress
        const updatedProgress = await page.locator('#header-percent').textContent();

        // Progress should have changed
        expect(initialProgress).not.toBe(updatedProgress);
    });

    test('should allow editing phase title', async ({ page }) => {
        await page.goto('/');

        // Find and edit the first phase title
        const phaseTitle = page.locator('.phase-card h2[contenteditable="true"]').first();
        await phaseTitle.click();
        await phaseTitle.fill('My Custom Phase');
        await phaseTitle.blur();

        // Verify the title was updated
        await expect(phaseTitle).toContainText('My Custom Phase');
    });

    test('should delete a phase', async ({ page }) => {
        await page.goto('/');

        // Get initial phase count
        const initialCount = await page.locator('.phase-card').count();

        // Add a new phase
        const addButton = page.getByRole('button', { name: /ajouter une nouvelle phase|add a new phase/i });
        await addButton.click();

        // Verify phase was added
        await expect(page.locator('.phase-card')).toHaveCount(initialCount + 1);

        // Listen for confirmation dialog
        page.on('dialog', (dialog) => dialog.accept());

        // Click delete button directly on the last phase
        const deleteButton = page.locator('.phase-card button[onclick^="app.deletePhase"]').last();
        await deleteButton.click({ force: true });

        // Wait for phase to be deleted
        await expect(page.locator('.phase-card')).toHaveCount(initialCount);
    });

    test('should reset data', async ({ page }) => {
        await page.goto('/');

        // Add a new phase
        const addButton = page.getByRole('button', { name: /ajouter une nouvelle phase|add a new phase/i });
        await addButton.click();

        // Wait for phase to be added (should now have 2)
        await expect(page.locator('.phase-card')).toHaveCount(2);

        // Listen for confirmation dialog
        page.on('dialog', (dialog) => dialog.accept());

        // Click reset button
        const resetButton = page.getByRole('button', { name: /réinitialiser|reset/i });
        await resetButton.click();

        // Verify data was reset - should have one default phase
        await expect(page.locator('.phase-card')).toHaveCount(1);
    });
});

const { test, expect } = require('@playwright/test');
const tmp = require('tmp');

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
        page.on('dialog', dialog => dialog.accept());

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
        page.on('dialog', dialog => dialog.accept());

        // Click reset button
        const resetButton = page.getByRole('button', { name: /réinitialiser|reset/i });
        await resetButton.click();

        // Verify data was reset - should have one default phase
        await expect(page.locator('.phase-card')).toHaveCount(1);
    });

    test('should display export button', async ({ page }) => {
        await page.goto('/');
        const exportButton = page.getByRole('button', { name: /exporter|export/i });
        await expect(exportButton).toBeVisible();
    });

    test('should display import button', async ({ page }) => {
        await page.goto('/');
        const importButton = page.getByRole('button', { name: /importer|import/i });
        await expect(importButton).toBeVisible();
    });

    test('should export data as JSON file', async ({ page }) => {
        await page.goto('/');

        // Add a task to have some data
        const checkbox = page.locator('.custom-checkbox').first();
        await checkbox.check();

        // Set up download handler
        const downloadPromise = page.waitForEvent('download');

        // Click export button
        const exportButton = page.getByRole('button', { name: /exporter|export/i });
        await exportButton.click();

        // Wait for download
        const download = await downloadPromise;

        // Check file name pattern
        expect(download.suggestedFilename()).toMatch(/roadmap-backup-\d{4}-\d{2}-\d{2}\.json/);

        // Read and parse the downloaded file
        const path = await download.path();
        const fs = require('fs');
        const content = fs.readFileSync(path, 'utf8');
        const exportedData = JSON.parse(content);

        // Verify exported data structure
        expect(exportedData).toHaveProperty('version');
        expect(exportedData).toHaveProperty('exportDate');
        expect(exportedData).toHaveProperty('language');
        expect(exportedData).toHaveProperty('meta');
        expect(exportedData).toHaveProperty('data');
        expect(Array.isArray(exportedData.data)).toBe(true);

        // Verify at least one phase exists
        expect(exportedData.data.length).toBeGreaterThan(0);

        // Verify phase structure
        const phase = exportedData.data[0];
        expect(phase).toHaveProperty('title');
        expect(phase).toHaveProperty('tasks');
        expect(Array.isArray(phase.tasks)).toBe(true);
    });

    test('should import data from JSON file', async ({ page }) => {
        await page.goto('/');

        // Create test data
        const testData = {
            version: '2.2.0',
            exportDate: new Date().toISOString(),
            language: 'en',
            meta: {
                title: 'Imported Project',
                desc: 'This is an imported project'
            },
            data: [
                {
                    title: 'Imported Phase 1',
                    status: 2,
                    color: 'blue',
                    targetDate: '2025-12-31',
                    expanded: true,
                    description: 'First imported phase',
                    tasks: [
                        { text: 'Imported task 1', done: true },
                        { text: 'Imported task 2', done: false }
                    ],
                    notes: 'Imported notes'
                },
                {
                    title: 'Imported Phase 2',
                    status: 4,
                    color: 'green',
                    targetDate: '2025-11-30',
                    expanded: false,
                    description: 'Second imported phase',
                    tasks: [{ text: 'Another task', done: false }],
                    notes: 'More notes'
                }
            ]
        };

        // Create a temporary file
        const fs = require('fs');
        const tmpFileObj = tmp.fileSync({ postfix: '.json', discardDescriptor: true });
        const tmpFile = tmpFileObj.name;
        fs.writeFileSync(tmpFile, JSON.stringify(testData));

        // Handle the file chooser and alert
        let alertMessage = '';
        page.on('dialog', async dialog => {
            alertMessage = dialog.message();
            await dialog.accept();
        });

        // Set up file chooser
        const fileChooserPromise = page.waitForEvent('filechooser');

        // Click import button
        const importButton = page.getByRole('button', { name: /importer|import/i });
        await importButton.click();

        // Select the file
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(tmpFile);

        // Wait for the alert to appear
        await page.waitForTimeout(500);

        // Check that success message was shown
        expect(alertMessage).toMatch(/imported|importées/i);

        // Verify the language was changed
        const langSelector = page.locator('#lang-selector');
        await expect(langSelector).toHaveValue('en');

        // Verify phases were imported
        await expect(page.locator('.phase-card')).toHaveCount(2);

        // Verify phase titles
        const phaseTitles = page.locator('.phase-card h2');
        await expect(phaseTitles.first()).toContainText('Imported Phase 1');
        await expect(phaseTitles.last()).toContainText('Imported Phase 2');

        // Verify project title was imported
        const projectTitle = page.locator('#project-title');
        await expect(projectTitle).toContainText('Imported Project');

        // Clean up
        fs.unlinkSync(tmpFile);
    });

    test('should handle invalid import file gracefully', async ({ page }) => {
        await page.goto('/');

        // Create an invalid JSON file
        const fs = require('fs');
        const tmpFileObj = tmp.fileSync({ postfix: '.json', discardDescriptor: true });
        const tmpFile = tmpFileObj.name;
        fs.writeFileSync(tmpFile, JSON.stringify({ invalid: 'data' }));

        // Handle the alert
        let alertMessage = '';
        page.on('dialog', async dialog => {
            alertMessage = dialog.message();
            await dialog.accept();
        });

        // Set up file chooser
        const fileChooserPromise = page.waitForEvent('filechooser');

        // Click import button
        const importButton = page.getByRole('button', { name: /importer|import/i });
        await importButton.click();

        // Select the file
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(tmpFile);

        // Wait for the alert to appear
        await page.waitForTimeout(500);

        // Check that error message was shown
        expect(alertMessage).toMatch(/error|erreur/i);

        // Verify data wasn't corrupted - should still have default phase
        await expect(page.locator('.phase-card')).toHaveCount(1);

        // Clean up
        fs.unlinkSync(tmpFile);
    });
});

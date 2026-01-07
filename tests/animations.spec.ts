import { test, expect } from '@playwright/test';

test.describe('GSAP Animation & Navigation Integrity', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should clear transition overlay and allow interaction', async ({ page }) => {
    // 1. Verifica che l'overlay esista all'inizio (se il caricamento è veloce potrebbe essere già andato)
    const overlay = page.locator('div.fixed.inset-0.bg-accent');
    
    // 2. Aspetta che l'overlay sia rimosso dal flusso visivo (yPercent: -100)
    // Usiamo l'attesa per lo stato di "hidden" o l'assenza di pointer-events
    await expect(overlay).toHaveCSS('pointer-events', 'none', { timeout: 5000 });
    
    // 3. Verifica che il pulsante Hero sia cliccabile (non coperto da elementi trasparenti)
    const heroBtn = page.getByRole('button', { name: /our work/i });
    await expect(heroBtn).toBeVisible();
    await expect(heroBtn).toBeEnabled();
  });

  test('should handle page transition and remount animations', async ({ page }) => {
    const navLink = page.locator('nav a').filter({ hasText: 'Work' });
    
    // Clicca sul link e attiva usePageTransition hook
    await navLink.click();

    // Verifica che l'URL cambi dopo il delay del timeout della transizione (800ms)
    await page.waitForURL('**/work');
    
    // Verifica che il nuovo contenuto sia visibile e animato (opacity > 0)
    const projectTitle = page.locator('h1.word-inner');
    await expect(projectTitle).toBeVisible();
    
    // Controllo critico: l'opacità deve arrivare a 1 dopo l'animazione
    await expect(projectTitle).toHaveCSS('opacity', '1', { timeout: 2000 });
  });

  test('should not have scroll-lock after navigation', async ({ page }) => {
    // Vai ai servizi (sezione con pinning GSAP)
    await page.goto('/#services');
    
    // Verifica che la classe 'lenis-stopped' non sia presente sul tag html
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/lenis-stopped/);
    
    // Esegui un piccolo scroll e verifica che la posizione cambi
    await page.mouse.wheel(0, 500);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('should allow form input in Mad Libs section', async ({ page }) => {
    const contactSection = page.locator('section:has-text("Hello, my name is")');
    await contactSection.scrollIntoViewIfNeeded();

    const nameInput = page.getByPlaceholder('Full Name');
    
    // Verifica che l'input non sia coperto da maschere di testo split-text
    await nameInput.fill('John Doe');
    await expect(nameInput).toHaveValue('John Doe');
  });

  test('visual regression: hero section looks correct', async ({ page }) => {
  // Aspetta che le animazioni iniziali finiscano
  await page.waitForTimeout(2000); 
  await expect(page).toHaveScreenshot('hero-desktop.png', {
    maxDiffPixelRatio: 0.1, // Tolleranza per piccole variazioni di rendering 3D
  });
});

});
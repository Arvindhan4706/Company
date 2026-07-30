import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1920, height: 1080 });
  
  const filePath = 'file:///' + path.resolve('100k_preview.html').replace(/\\/g, '/');
  
  // Navigate to local HTML preview
  await page.goto(filePath, { waitUntil: 'domcontentloaded' });
  
  // Wait for 3D particles and animations to render
  await new Promise(r => setTimeout(r, 1500));
  
  // Take screenshot
  await page.screenshot({ path: '100k_concept_screenshot.png', fullPage: true });
  
  console.log('Saved 100k concept screenshot to 100k_concept_screenshot.png');
  await browser.close();
})();

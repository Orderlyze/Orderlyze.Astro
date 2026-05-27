#!/usr/bin/env node
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('tmp/compare');
fs.mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [
  ['home', ''],
  ['kassensystem', 'kassensystem'],
  ['so-funktionierts', 'so-funktionierts'],
  ['funktionen', 'funktionen'],
  ['kartenzahlung', 'kartenzahlung'],
  ['funkbonieren', 'funkbonieren'],
  ['verwaltung', 'verwaltung'],
  ['datenexport-steuerberater', 'datenexport-steuerberater'],
  ['branchen', 'branchen'],
  ['restaurant', 'restaurant'],
  ['cafe', 'cafe'],
  ['bar', 'bar'],
  ['friseur', 'friseur'],
  ['friseure', 'friseure'],
  ['beauty', 'beauty'],
  ['sonstige', 'sonstige'],
  ['gastronomie', 'gastronomie'],
  ['preise', 'preise'],
  ['hardware', 'hardware'],
  ['angebot', 'angebot'],
  ['angebot-de', 'angebot-de'],
  ['angebot-gastro', 'angebot-gastro'],
  ['angebot-google', 'angebot-google'],
  ['testen', 'testen'],
  ['bestellsystem', 'bestellsystem'],
  ['kassensoftware', 'kassensoftware'],
  ['registrierkasse', 'registrierkasse'],
  ['einstellungen-synchronisieren', 'einstellungen-synchronisieren'],
  ['finanzamt-konform', 'finanzamt-konform'],
  ['technische-sicherheitseinrichtung', 'technische-sicherheitseinrichtung'],
  ['dank', 'dank'],
  ['agb', 'agb'],
  ['impressum', 'impressum'],
  ['datenschutzerklaerung', 'datenschutzerklaerung'],
];

const VIEWPORT = { width: 1440, height: 900 };

async function dismissCookies(page) {
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Ablehnen');
    if (btn) btn.click();
  }).catch(() => {});
}

async function waitForImages(page) {
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img')];
    await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = img.onerror = r; setTimeout(r, 3000); })));
  }).catch(() => {});
}

async function shoot(browser, url, file) {
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.warn(`navigate fail: ${url} -> ${e.message}`);
  }
  await dismissCookies(page);
  await page.waitForTimeout(800);
  await waitForImages(page);
  await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 60 });
  await ctx.close();
}

const [, , filter] = process.argv;
const tasks = PAGES.filter(([name]) => !filter || name.includes(filter));

(async () => {
  const browser = await chromium.launch();
  for (const [name, slug] of tasks) {
    const refUrl = `https://www.orderlyze.com/${slug}`;
    const localUrl = `http://localhost:4321/Orderlyze.Astro/${slug ? slug + '/' : ''}`;
    const refFile = path.join(OUT_DIR, `${name}-ref.jpg`);
    const localFile = path.join(OUT_DIR, `${name}-local.jpg`);
    console.log(`[${name}] ref...`);
    await shoot(browser, refUrl, refFile);
    console.log(`[${name}] local...`);
    await shoot(browser, localUrl, localFile);
  }
  await browser.close();
  console.log('done');
})();

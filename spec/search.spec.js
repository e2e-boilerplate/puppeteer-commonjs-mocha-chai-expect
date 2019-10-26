/* eslint-disable no-unused-expressions */
const puppeteer = require("puppeteer");
const { expect } = require("chai");

let page;
let browser;

describe("google search", () => {
  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("https://www.google.com", { waitUntil: "networkidle0" });
  });

  after(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on google search page", async () => {
    const title = await page.title();
    expect(title).to.equal("Google");
  });

  it("should search for Cheese!", async () => {
    const searchBox = ".gLFyf.gsfi";
    expect(!!(await page.$(searchBox))).to.be.true;
    await page.type(searchBox, "Cheese!", { delay: 100 });
    await page.keyboard.press("\n");
  });

  it('the page title should start with "Cheese!', async () => {
    await page.waitFor("#resultStats");
    const title = await page.title();
    const words = title.split(" ");
    expect(words[0]).to.equal("Cheese!");
  });
});

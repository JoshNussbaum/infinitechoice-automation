import { type Page, type Locator } from "@playwright/test";


export default class GooglePage {
    readonly page: Page;
    readonly url: string;
    readonly searchInput: Locator
    readonly searchButton: Locator
    readonly searchResultLink = (url: string = "guestreservations.com") => this.page.locator(`//span[@data-dtld='${url}']`)
    readonly moreResultsButton: Locator
    readonly endOfResults: Locator

    constructor(page: Page) {
        this.page = page;
        this.url = "https://www.google.com";
        this.searchInput = page.getByLabel('Search', { exact: true })
        this.searchButton = page.getByRole('button', { name: 'Google Search' })
        this.moreResultsButton = page.locator("//span[text()='More results']")
        this.endOfResults = page.locator("//*[contains(text(), 'In order to show you the most relevant results, we have omitted some entries')]")
    }

    async open() {
        await this.page.goto(this.url);
    }

    async search(query: string) {
        await this.searchInput.fill(query);
        await this.page.keyboard.press('Enter');
        await this.page.waitForURL('**/search*')
    }

    async isSearchResultLinkVisible(url: string) {
        return (await this.searchResultLink(url).count()) > 0;
    }

    async clickSearchResultLink(url: string) {
        // If search link resolves to more than 1 element just click first one
        const searchResultLinks = this.searchResultLink(url)
        const count = await searchResultLinks.count();
        if (await searchResultLinks.count() > 1) {
            await searchResultLinks.nth(0).click();
        } else {
            await searchResultLinks.click();
        }
        await this.page.waitForURL('**/booking*');

    }

    private async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async isEndOfResultsVisible() {
        const isVisible = await this.endOfResults.isVisible();
        return isVisible;
    }

    async loadMoreResults() {
        if (!await this.moreResultsButton.isVisible()) {
            await this.scrollToBottom();
        } else {
            await this.moreResultsButton.click();
        }
        await this.page.waitForTimeout(1000);


    }

}
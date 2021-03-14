export abstract class HtmlUtils {

    static setTextOnHtmlElement(selector: string, text: number | string): void {
        const htmlElement = this.getHtmlElement(selector);
        htmlElement.innerText = String(text);
    }

    static hide(selector: string): void {
        this.getHtmlElement(selector).style.display = 'none';
    }

    static show(selector: string): void {
        this.getHtmlElement(selector).style.display = 'none';
    }

    static getHtmlElement(selector: string): HTMLElement {
        const htmlElement = document.querySelector(selector) as HTMLElement;
        if (!htmlElement) {
            throw new Error(`no html element found with selector '${selector}'`);
        }
        return htmlElement;
    }

    static getHtmlElements(selector: string): HTMLElement[] {
        const htmlElements = document.querySelectorAll(selector) as unknown as HTMLElement[];
        if (!htmlElements) {
            throw new Error(`no html element found with selector '${selector}'`);
        }
        return htmlElements;
    }
}

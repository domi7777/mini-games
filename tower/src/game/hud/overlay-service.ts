import {Service} from "typedi";
import {HtmlUtils} from "../utils/html-utils";
import {GameCanvas} from "../canvas/game-canvas";

@Service()
export class OverlayService {

    private static overlaySelector = '#overlay'
    private static titlesSelector = '#titles'
    private static instructionsSelector = '#instructions'
    private static stageSelectionSelector = '#stage-selection'
    private static difficultySelectionSelector = '#difficulty-selection'

    private overlayElement: HTMLElement;
    private titlesElement: HTMLElement;
    private instructionElement: HTMLElement;
    private stageSelectionElement: HTMLElement;
    private difficultySelectionElement: HTMLElement;

    constructor(gameCanvas: GameCanvas) {
        this.overlayElement = HtmlUtils.getHtmlElement(OverlayService.overlaySelector);
        this.overlayElement.style.width = `${gameCanvas.width}px`;
        this.overlayElement.style.height = `${gameCanvas.height}px`;
        this.titlesElement = HtmlUtils.getHtmlElement(OverlayService.titlesSelector);
        this.instructionElement = HtmlUtils.getHtmlElement(OverlayService.instructionsSelector);
        this.stageSelectionElement = HtmlUtils.getHtmlElement(OverlayService.stageSelectionSelector);
        this.difficultySelectionElement = HtmlUtils.getHtmlElement(OverlayService.difficultySelectionSelector);
    }

    show(): void {
        this.overlayElement.style.display = 'block';
        setTimeout(() => this.overlayElement.style.opacity = '1', 200);
    }

    hide(): void {
        this.hideInstructions();
        this.hideTitles();
        this.hideDifficultySelection();
        this.hideStageSelection();
        this.overlayElement.style.opacity = '0';
        this.overlayElement.style.display = 'none';
    }

    showTitles(title: string, subtitle: string, rest = '') {
        this.show();
        this.titlesElement.style.display = 'block';
        HtmlUtils.getHtmlElement(`${OverlayService.titlesSelector} h1`).innerText = title;
        HtmlUtils.getHtmlElement(`${OverlayService.titlesSelector} h3`).innerText = subtitle;
        HtmlUtils.getHtmlElement(`${OverlayService.titlesSelector} div`).innerHTML = rest;
    }

    hideTitles() {
        this.titlesElement.style.display = 'none';
    }

    showInstructions() {
        this.show();
        this.instructionElement.style.display = 'block';
    }

    hideInstructions() {
        this.instructionElement.style.display = 'none';
    }

    showStageSelection() {
        this.show();
        this.stageSelectionElement.style.display = 'block';
    }

    hideStageSelection() {
        this.stageSelectionElement.style.display = 'none';
    }

    showDifficultySelection() {
        this.show();
        this.difficultySelectionElement.style.display = 'block';
    }

    hideDifficultySelection() { // FIXME duplication
        this.difficultySelectionElement.style.display = 'none';
    }
}

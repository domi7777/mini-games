export abstract class RandomUtils {

    static getNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

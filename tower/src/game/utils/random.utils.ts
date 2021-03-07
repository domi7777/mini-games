export abstract class RandomUtils {

    /**
     * @param min
     * @param max exclusive
     */
    static getNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

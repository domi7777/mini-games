export abstract class RandomUtils {

    /**
     *
     * @param min
     * @param max EXCLUDED! :'(
     */
    static getNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * random true or false
     */
    static getBoolean(): boolean {
        return this.getNumber(0, 2) === 1;
    }
}

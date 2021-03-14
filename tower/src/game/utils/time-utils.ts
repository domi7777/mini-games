export abstract class TimeUtils {
    static async waitMillis(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), ms);
        });
    }
}

import {Service} from "typedi";

export interface CacheEntry<T> {
    value: T;
    creationDate: Date;
}

type SimpleCache = {
    [key: string]: CacheEntry<unknown>;
};

@Service()
export class CacheManager {

    private cache: SimpleCache = {};

    set(cacheKey: string, cacheValue: any): void {
        this.cache[cacheKey] = {
            creationDate: new Date(),
            value: cacheValue,
        };
    }

    get(cacheKey: string): CacheEntry<any> {
        return this.cache[cacheKey];
    }

    bust(): void {
        this.cache = {};
    }

}

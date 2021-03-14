import {Container} from 'typedi';
import {CacheManager} from "./cache-manager";

const ONE_HOUR = 1000 * 1000 * 60;

export function SimpleCache(timeToLive = ONE_HOUR): MethodDecorator {
    return (target: unknown, methodName: string | symbol, descriptor: PropertyDescriptor) => {
        // TODO unit test
        const originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (...args: unknown[]) {
            const paramsKeys = args?.map((arg) => JSON.stringify(arg) /*might fail if loop*/).join('_');
            const cacheKey = `${String(methodName)}_${paramsKeys}`;
            const cacheManager = Container.get(CacheManager);
            const cachedEntry = cacheManager.get(cacheKey);
            if (timeToLive && cachedEntry?.creationDate?.getTime() > Date.now() - timeToLive) {
                // console.log('found cached entry with key', cacheKey)
                return cachedEntry.value;
            } else {
                const result = originalMethod.apply(this, args);
                cacheManager.set(cacheKey, result);
                return result;
            }
        };
    };
}

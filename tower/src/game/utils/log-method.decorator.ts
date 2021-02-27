/**
 class Sample {

    @loggerMethod()
    doSomething(foo: string, bar: number): string {
        return 'There it is';
    }

 }

 new Sample().doSomething('Wait for it', 99);

 // Output:
 // > log-method.decorator.ts:19 doSomething ( Wait for it 99 ) =>  There it is
 */

export function methodLogger(): MethodDecorator {
    return (target: unknown, methodName: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        const functionSignature = originalMethod.toString().split('(')[0];

        // wrapping the original method
        descriptor.value = function (...args: unknown[]) {
            const result = originalMethod.apply(this, args);
            console.warn.apply(console, [functionSignature, '(', ...args, ') => ', result])
            return result;
        }
    };
}

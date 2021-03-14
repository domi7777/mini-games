/**
 * just a documentation decorator
 */
export function override(): MethodDecorator {
    return (target: unknown, methodName: string | symbol, descriptor: PropertyDescriptor) => {
    };
}

// Type guard that can be used to strip null and/or undefined from a type
// Useful when using strictNullChecks
export function existing<T>(t: T | null | undefined): t is T {
    return t !== null && t !== undefined;
}

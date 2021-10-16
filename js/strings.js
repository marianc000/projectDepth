export function containsLowerCasePattern(path, patterns) {
    return patterns.some(p => path.toLowerCase().includes(p));
}

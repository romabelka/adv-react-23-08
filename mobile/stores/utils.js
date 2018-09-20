export function fbToEntities(values) {
    return Object.entries(values).map(([id, value]) => ({ id, ...value }))
}
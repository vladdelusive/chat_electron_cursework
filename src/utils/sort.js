export const sortObjectToEntriesArray = (obj) => {
    // eslint-disable-next-line
    return Object.entries(Object.keys(obj).sort().reduce((acc, k) => (acc[k] = obj[k], acc), {}))
}
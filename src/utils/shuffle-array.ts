export function shuffleArray<T>(items: readonly T[]): T[] {
    const clonedItems = [...items]

    for (let i = clonedItems.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
            ;[clonedItems[i], clonedItems[randomIndex]] = [
                clonedItems[randomIndex],
                clonedItems[i],
            ]
    }

    return clonedItems
}

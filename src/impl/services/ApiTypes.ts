export type Track = {
    direction: string,
    estimatedTime: string,
    delay: string,
    favourites: string,
}

export type Stop = {
    stopName: string | null,
    zoneName: string | null,
    stopId: number,
    stopLat: number,
    stopLon: number,
}
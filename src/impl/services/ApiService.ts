import {Stop} from '@/impl/services/ApiTypes';
import Fetcher from '@/impl/fetch/Fetcher';

export default class ApiService {
    private static readonly API_URL = 'http://localhost:3000/api';

    static getStops(): Promise<Stop[]> {
        return Fetcher.Get<Stop[]>(`${ApiService.API_URL}/stops`);
    }

    static getFavourites(token: string): Promise<Stop[]> {
        return Fetcher.Get<Stop[]>(`${ApiService.API_URL}/favourites`, {}, {
            "Authorization": `Bearer ${token}`
        });
    }

    static async addFavourites(token: string, stopId: number) {
        await Fetcher.Post(`${ApiService.API_URL}/favourites`, {
            stopId
        }, {
            "Authorization": `Bearer ${token}`
        });
    }

    static async deleteFavourites(token: string, stopId: number) {
        await Fetcher.Delete(`${ApiService.API_URL}/favourites`, {
            stopId
        }, {
            "Authorization": `Bearer ${token}`
        });
    }

    static async loginUser(login: string, password: string): Promise<string> {
        return (await Fetcher.Post<{ token: string }>(`${ApiService.API_URL}/login`, {
            login,
            password
        })).token;
    }

    static async registerUser(login: string, password: string) {
        await Fetcher.Post<{ token: string }>(`${ApiService.API_URL}/register`, {
            login,
            password
        });
    }

    static async logoutUser(token: string) {
        await Fetcher.Post(`${ApiService.API_URL}/logout`, {}, {
            "Authorization": `Bearer ${token}`
        });
    }

    static async isAuthorized(token: string) {
        await Fetcher.Get(`${ApiService.API_URL}/authorized`, {}, {
            "Authorization": `Bearer ${token}`
        });
    }

    static async getStopInfo(stopId: number): Promise<ZTMDelay['delay']> {
        return (await Fetcher.Get('https://ckan2.multimediagdansk.pl/delays', {
            stopId
        })).delay;
    }
}

export type ZTMDelay = {
    lastUpdate: string,
    delay: {
        id: string,
        delayInSeconds: number,
        estimatedTime: string,
        headsign: string,
        routeId: number,
        tripId: number,
        status: string,
        theoreticalTime: string,
        timestamp: string,
        trip: number,
        vehicleCode: number,
        vehicleId: number
    }[]
}
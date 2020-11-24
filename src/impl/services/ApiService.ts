import {Stop} from '@/impl/services/ApiTypes';
import Fetcher from '@/impl/fetch/Fetcher';

export default class ApiService {
    private static readonly API_URL = 'http://localhost:3000/api';

    static getStops(): Promise<Stop[]> {
        return Fetcher.Get<Stop[]>(`${ApiService.API_URL}/stops`);
    }

    static getFavourites(): Promise<Stop[]> {
        return Fetcher.Get<Stop[]>(`${ApiService.API_URL}/favourites`);
    }

    static async addFavourites(token: string) {
        await Fetcher.Post(`${ApiService.API_URL}/favourites`, {}, {
            "Authorization": `Bearer ${token}`
        });
    }

    static async deleteFavourites(token: string) {
        await Fetcher.Delete(`${ApiService.API_URL}/favourites`, {
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
        await Fetcher.Post(`${ApiService.API_URL}/login`, {}, {
            "Authorization": `Bearer ${token}`
        });
    }
}
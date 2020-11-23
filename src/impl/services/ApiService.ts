import {Stop} from '@/impl/services/ApiTypes';
import Fetcher from '@/impl/fetch/Fetcher';

export default class ApiService {
    private static readonly API_URL = 'http://localhost:3000/api';

    static getStops(): Promise<Stop[]> {
        return Fetcher.Get<Stop[]>(`${ApiService.API_URL}/stops`);
    }
}
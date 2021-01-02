type DefaultFetchType = { [key: string]: any; };
type HeadersType = { [key: string]: string };

export default class Fetcher {
    static async Get<T = DefaultFetchType, K = { [key: string]: string }>(path: string, data?: K, headers: HeadersType = {}): Promise<T> {
        if(data !== undefined) {
            let keys = Object.keys(data) as (keyof K)[];
            if(keys.length > 0) {
                for(let i = 0; i < keys.length; i++) {
                    if(i === 0) {
                        path += '?';
                    } else {
                        path += '&';
                    }

                    path += `${keys[i]}=${data[keys[i]]}`;
                }
            }
        }

        let request = new Request(path, {
            method: 'GET',
            headers,
        });

        return Fetcher.ParseRequest(request);
    }

    static async Post<T = DefaultFetchType, K = {}>(path: string, data: K, headers: HeadersType = {}): Promise<T> {
        let request = new Request(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        });

        return Fetcher.ParseRequest(request);
    }

    static async Put<T = DefaultFetchType, K = {}>(path: string, data: K): Promise<T> {
        let request = new Request(path, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        return Fetcher.ParseRequest(request);
    }

    static async Delete<T = DefaultFetchType, K = {}>(path: string, data: K, headers: HeadersType = {}): Promise<T> {
        let request = new Request(path, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        });

        return Fetcher.ParseRequest(request);
    }

    private static async ParseRequest(request: Request): Promise<any | never> {
        let response = await fetch(request);
        if(response.status >= 200 && response.status < 300) {
            if(response.status !== 204) {
                return await response.json();
            }
        } else {
            throw response.statusText;
        }
    }
}
type DefaultFetchType = { [key: string]: any; };

export default class Fetcher {
    static async Get<T = DefaultFetchType, K = { [key: string]: string }>(path: string, data?: K): Promise<T> {
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
            method: 'GET'
        });

        return Fetcher.ParseRequest(request);
    }

    static async Post<T = DefaultFetchType, K = {}>(path: string, data: K): Promise<T> {
        let request = new Request(path, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        return Fetcher.ParseRequest(request);
    }

    static async Put<T = DefaultFetchType, K = {}>(path: string, data: K): Promise<T> {
        let request = new Request(path, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        return Fetcher.ParseRequest(request);
    }

    static async Delete<T = DefaultFetchType>(path: string): Promise<T> {
        let request = new Request(path, {
            method: 'DELETE'
        });

        return Fetcher.ParseRequest(request);
    }

    private static async ParseRequest(request: Request): Promise<any | never> {
        let response = await fetch(request);
        if(response.status >= 200 && response.status < 300) {
            return await response.json();
        } else {
            throw await response.json();
        }
    }
}
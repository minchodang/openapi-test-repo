import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { paths } from './schema';

export const client = createFetchClient<paths>({
    baseUrl: 'https://api.jikan.moe/v4',
    headers: {
        'content-type': 'application/json',
    },
});

export const $api = createClient(client);

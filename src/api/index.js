import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { useEffect, useReducer } from 'react';
import { data } from './dummyData';

// export const useCovid19api = makeUseAxios({
//     axios: axios.create({
//         baseURL: 'https://api.covid19api.com/',
//         headers: {
//             'X-Access-Token': import.meta.env.SNOWPACK_PUBLIC_ACCESS_TOKEN,
//         },
//     }),
// });

export const useCovid19api = () => {
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'reject':
                    return {
                        ...state,
                        loading: false,
                        error: {
                            message: 'Error loading data',
                        },
                    };
                case 'resolve':
                default:
                    return {
                        ...state,
                        loading: false,
                        data: data,
                    };
            }
        },
        { loading: true },
    );

    useEffect(async () => {
        await delay(400);
        dispatch({ type: 'resolve' });
    }, []);

    return [state];
};

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

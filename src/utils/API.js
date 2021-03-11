import { API_KEY } from '../ids.js';

function get_api_request_url(request) {
    var REQUEST = request
    const url = `https://api.themoviedb.org/3/${REQUEST}?api_key=${API_KEY}`;
    return url
}
function fetch_data(url) {
    return fetch(url)
        .then(data => { console.log(data.status); return data.json() })
        .catch(error => {
            console.log(error.message, `\n for url ${url}`);
        });
}
/* eslint-disable import/no-anonymous-default-export*/
export default {
    get_popular_movies: () => {
        const url = get_api_request_url('movie/popular');
        return fetch_data(url);
    },
    get_one_movie: (id_film) => {
        const url = get_api_request_url(`movie/${id_film}`);
        return fetch_data(url);
    },
    get_random_movie: (number_page) => {
        const url = `${get_api_request_url('movie/popular')}&page=${number_page}`;
        return fetch_data(url).then(response => { return response.results });
    },
    get_max_number_pages_popular_movies: () => {
        const url = get_api_request_url('movie/popular');
        return fetch_data(url).then(data => { return data.total_pages });
    }
}

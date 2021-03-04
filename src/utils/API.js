import { API_KEY } from '../ids.js';

function get_api_request_url(request) {
    var REQUEST = request
    const url = `https://api.themoviedb.org/3/${REQUEST}?api_key=${API_KEY}`;
    return url
}
function fetch_data(url) {
    return fetch(url)
        .then(data => { console.log(data.status); return data.json() })
        .then(result => { return result })
        .catch(error => {
            console.log(error.message, `\n for url ${url}`);
        });
}
export default {
    get_popular_movies: () => {
        const url = get_api_request_url('movie/popular');
        return fetch_data(url);
    },
    get_one_movie: (id_film) => {
        const url = get_api_request_url(`movie/${id_film}`);
        return fetch_data(url);
    }
}

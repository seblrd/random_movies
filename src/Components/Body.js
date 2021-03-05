import React from 'react';
import API from "../utils/API"
export class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popular_movies: [],
            style_popup: { display: "block" },
            target_movie_data: {}
        };
    }
    async display_movie_details(movie) {
        console.log("movies_id", movie.id)
        var movie_data = await API.get_one_movie("581389"); //to remove
        // var movie_data = await API.get_one_movie(movie.id);
        this.setState({ style_popup: { display: "block" }, target_movie_data: movie_data })
    }
    popup_windows() {
        const movie = this.state.target_movie_data;
        console.log("fetch movie = ", movie)
        let img_url = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        var style = this.state.style_popup
        const close_popup = () => { this.setState({ style_popup: { display: "none" } }) }
        const click_outside = e => {
            if (e.target.className === "popup_movie_details") {
                close_popup()
            }
            console.log(e.target.className)
        };
        const genres_movie = () => {
            let genre_list = ""
            let movie = this.state.target_movie_data;
            console.log("target movie", movie)
            for (let genre in movie.genres) {
                var genre_movie = movie.genres[genre].name
                if (genre_list === "") { genre_list += `${genre_movie}` }
                else { genre_list += `, ${genre_movie}` }
            };
            return genre_list
        }
        return (
            <div className="popup_movie_details" style={style} onClick={click_outside}>
                <div class="popup_content">
                    <div className="popup_title">
                        <h3>{movie.title} {this.display_original_name(movie)}
                        </h3>
                        <p><b>{movie.vote_average}/10<u> ( {movie.vote_count} votes )</u></b></p>
                        <span class="close" onClick={close_popup}>&times;</span>
                        <p>{movie.tagline}</p>
                    </div>
                    <div className="popup_body">
                        <div className="popup_pic">
                            <img src={img_url} alt="Img movie"></img>
                        </div>
                        <div className="popup_paragraph">
                            <p className="popup_overview">Overview: <br />{movie.overview}</p>
                            <p > Genres: {genres_movie()}</p>
                            <p > Release: {movie.release_date}</p>
                            <p > Runtime: {movie.runtime} min</p>
                            <a target="_blank" rel="noopener noreferrer" href={movie.homepage}>Click to see movie website!</a>
                        </div>
                    </div>
                </div>
            </div>)
    }
    display_original_name(movie) {
        if (movie.title !== movie.original_title) {
            return (<u>{movie.original_title}</u>)
        }
    }
    card_design(movie) {

        let img_url = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        const card = (
            <div className="cards" onClick={() => this.display_movie_details(movie)} key={movie.id}>
                <div className="card_title">
                    <h3>{movie.title}
                        {this.display_original_name(movie)}
                    </h3>
                </div>
                <div className="card_body">
                    <div className="card_pic">
                        <img src={img_url} alt="Img film"></img>
                    </div>
                    <p className="card_description">{movie.overview}</p>
                </div>
            </div >
        )
        return card
    }
    componentDidMount() {
        this.get_popular_movies()
        this.display_movie_details("a") //to remove
    }
    async get_popular_movies() {
        return await API.get_popular_movies().then(result => { this.setState({ popular_movies: result.results }) });
    }
    display_cards() {
        var cards_list = [];
        const movies_list = this.state.popular_movies
        for (let movie in movies_list) {
            let movie_data = movies_list[movie]
            cards_list.push(this.card_design(movie_data))
        }
        return cards_list;
    }

    render() {
        return (
            <div className="cards_containers">
                {this.display_cards()}
                {this.popup_windows()}
            </div>

        )
    }

}

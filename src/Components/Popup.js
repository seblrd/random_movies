import React from 'react';
import API from "../utils/API"
export class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            target_movie_data: {},
        };
    }
    async display_movie_details() {
        console.log("movies_id", this.props.movie_id)
        var movie_data = await API.get_one_movie(this.props.movie_id);
        this.setState({ target_movie_data: movie_data })
    }
    movie_tagline(tagline = "") {
        if (tagline.length) {
            return `'${tagline}'`
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.style_popup !== prevProps.style_popup) {
            this.display_movie_details()
        }
    }
    popup_windows() {
        const movie = this.state.target_movie_data;
        var img_url = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        if (movie.backdrop_path === undefined) { img_url = "/favicon.ico" }
        var style = this.props.style_popup
        const close_popup = () => {
            this.props.display_popup("none", this.props.movie_id);
        }
        const click_outside = e => {
            if (e.target.className === "popup_movie_details") {
                close_popup()
            }
        };
        const genres_movie = () => {
            let genre_list = ""
            let movie = this.state.target_movie_data;
            for (let genre in movie.genres) {
                var genre_movie = movie.genres[genre].name
                if (genre_list === "") { genre_list += `${genre_movie}` }
                else { genre_list += `, ${genre_movie}` }
            };
            return genre_list
        }

        return (
            <div className="popup_movie_details" style={style} onClick={click_outside} >
                <div className="popup_content">
                    <div className="popup_head">
                        <div className="popup_title">
                            <h3>{movie.title} {this.display_original_name(movie)}
                            </h3>
                            <p id="note"><b>{movie.vote_average}/10 (<u>{movie.vote_count} votes</u>)</b></p>
                            <span className="close" onClick={close_popup}>&times;</span>
                        </div>
                        <p>{this.movie_tagline(movie.tagline)}</p>
                    </div>
                    <div className="popup_body">
                        <div className="popup_pic">
                            <img src={img_url} alt="Img movie"></img>
                        </div>
                        <div className="popup_paragraph">
                            <p><u>Overview</u>: <br />{movie.overview}</p>
                            <p><u>Genres</u>: {genres_movie()}</p>
                            <p><u>Release</u>: {movie.release_date}</p>
                            <p><u>Runtime</u>: {movie.runtime} min</p>
                            <a target="_blank" rel="noopener noreferrer" href={movie.homepage}>Click to see movie's website!</a>
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
    render() {
        return (
            <div>
                {this.popup_windows()}
            </div>

        )
    }
}
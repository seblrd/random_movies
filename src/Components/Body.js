import React from 'react';
import API from "../utils/API"
export class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popular_movies: [],
        };
    }
    display_popup(movie) {
        console.log("movies_id_body", movie.id)
        this.props.display_popup("block", movie.id);
    }
    display_original_name(movie) {
        if (movie.title !== movie.original_title) {
            return (<u>{movie.original_title}</u>)
        }
    }
    card_design(movie) {

        let img_url = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        const card = (
            <div className="cards" onClick={() => this.display_popup(movie)} key={movie.id}>
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
            </div>

        )
    }

}

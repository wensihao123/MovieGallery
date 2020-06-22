import React from "react";
import { Link } from "react-router-dom";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import { IMovie } from "../types";

interface IProps {
  isLoaded: boolean;
  movies: IMovie[];
}

interface IState {
  yearFilter: string;
  genreFilter: string;
}

export default class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      yearFilter: "All Years",
      genreFilter: "All Genres",
    };
  }

  get filteredMovies() {
    const { yearFilter, genreFilter } = this.state;
    const filteredMovies = this.props.movies
      .filter((item) => {
        return yearFilter === "All Years"
          ? true
          : item.productionYear.toString() === yearFilter;
      })
      .filter((item) => {
        return genreFilter === "All Genres" ? true : item.genre === genreFilter;
      });
    return filteredMovies;
  }

  get options() {
    const yearsOpt = Array.from(
      new Set(this.props.movies.map((item) => item.productionYear.toString()))
    )
      .sort((a, b) => parseInt(a) - parseInt(b))
      .concat("All Years");

    const genresOpt = Array.from(
      new Set(this.props.movies.map((item) => item.genre))
    )
      .sort((a, b) => a.localeCompare(b))
      .concat("All Genres");

    return { yearsOpt, genresOpt };
  }

  render() {
    const { isLoaded } = this.props;
    const { yearFilter, genreFilter } = this.state;
    const { yearsOpt, genresOpt } = this.options;

    if (!isLoaded) {
      return <div className="pageWrapper">Loading...</div>;
    } else {
      return (
        <div className="pageWrapper">
          <div className="filter">
            <Dropdown
              options={yearsOpt}
              onChange={(opt) => this.setState({ yearFilter: opt.value })}
              value={yearFilter}
              placeholder="All Years"
            />
            <Dropdown
              options={genresOpt}
              onChange={(opt) => this.setState({ genreFilter: opt.value })}
              value={genreFilter}
              placeholder="All Genres"
            />
          </div>
          <ul className="movieList">
            {this.filteredMovies.length ? (
              this.filteredMovies.map((item) => (
                <li key={item.name}>
                  <Link  className='link' to={`/${item.index}`}>
                    <div className="movieBlock">
                      <div className="movieImg">
                        Image
                        <br />
                        Placeholder
                      </div>
                      <div className='movieName'>{item.name}</div>  
                      <div className='movieTag'>{item.genre}</div>
                      <div className='movieTag'> {item.productionYear}</div>
                      <div className='movieSyn'>{item.synopsisShort}</div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <div>No movie in list</div>
            )}
          </ul>
        </div>
      );
    }
  }
}

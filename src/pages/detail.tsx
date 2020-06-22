import React from "react";
import { IMovie } from "../types";

interface IProps {
  movie?: IMovie;
}

export default class Detail extends React.Component<IProps> {
  render() {
    const { movie } = this.props;
    return movie ? (
      <div className="pageWrapper">
        <div className="detailInfo">
          <div className="movieImg detailImg">
            Image
            <br />
            Placeholder
          </div>
          <div>
            <div className='detailMovieName'>{movie.name}</div>
            <div className='detailMovieTag'>{movie.productionYear}</div>
            <div className='detailMovieTag'>{movie.genre}</div>
          </div>
        </div>
        <div className="detailSyn">{movie.synopsis}</div>
      </div>
    ) : (
      <div className="pageWrapper">Empty</div>
    );
  }
}

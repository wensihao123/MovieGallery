import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";
import { IMovie } from "./types";
import Home from "./pages/home";
import Detail from "./pages/detail";
import "./style.css";

interface MatchParams {
  index: string;
}

interface IState {
  isLoaded: boolean;
  movies: IMovie[];
  retry: number;
}

class App extends React.Component<{}, IState> {
  state = { isLoaded: false, movies: [], retry: 10 };

  getMovies = async () => {
    if (this.state.retry === 0) {
      return;
    } else {
      this.setState({ retry: this.state.retry - 1 });
      try {
        const res = await fetch(
          "https://sometimes-maybe-flaky-api.gdshive.io"
        );
        if (res.ok) {
          const result = (await res.json()) as IMovie[];
          this.setState({
            isLoaded: true,
            movies: (result ?? []).map((item, index) =>
              Object.assign({}, item, { index })
            ),
          });
        } else {
          this.getMovies();
        }
      } catch {
        this.getMovies();
      }
    }
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoaded, movies } = this.state;
    return (
      <Router>
        <div>
          <nav className="Navbar">
            <div className="NavTitle">Movie Gallery</div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route
              path="/:index"
              render={({
                match: {
                  params: { index },
                },
              }: RouteComponentProps<MatchParams>) => (
                <Detail movie={movies[parseInt(index)]} />
              )}
            />
            <Route path="/">
              <Home isLoaded={isLoaded} movies={movies} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

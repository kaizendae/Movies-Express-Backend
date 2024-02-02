import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review";
import Login from "./components/login";
import Movie from "./components/movie";
import MoviesList from "./components/movies-list";
import {Link, Route, Switch} from "react-router-dom";
import {useState} from "react";

function App() {
    const [user, setUser] = useState(null);

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(null);
    }

    return (<div className="App" data-theme="cyberpunk">
        <div className="navbar bg-base-100 px-5">
            <div className="flex-1">
                <p className="text-xl font-bold">Movies-FE</p>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/movies">Movies</Link>
                    </li>
                    <li >
                        <Link onClick={login} to="/login">
                            {user ? "Logout" : "Login"}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <Switch>
            <Route exact path={["/", "/movies"]} component={MoviesList}/>
            <Route exact path="/movies/:id/review" render={(props) => <AddReview {...props} user={user}/>}/>
            <Route path="/movies/:id/"
                   render={(props) => <Movie {...props} user={user}/>}/>
            <Route exact path="/login" render={(props) => <Login {...props} login={login}/>
            }/>
        </Switch>
    </div>);
}

export default App;

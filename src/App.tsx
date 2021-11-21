import React from "react";
import { View } from "react-native";
import "./App.css";
import { Header } from "./general/components/Header";
import HomeScreen from "./home/HomeScreen";
import MovieListScreen from "./movieList/MovieListScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetailScreen from "./movieDetail/MovieDetailScreen";

function App() {
  return (
    <Router>
      <View style={{ flex: 1 }}>
        <Header />
        <Switch>
          <Route path={`/movies/:movieTitle/detail`}>
            <MovieDetailScreen />
          </Route>
          <Route path={`/movies/:movieTitle`} exact={false}>
            <MovieListScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </View>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GRAY, WHITE } from "../constants/colors";
import TextInput from "../core-ui/TextInput";

import SearchIcon from "../../assets/search.png";
import BibitLogo from "../../assets/bibit-logo.jpg";

import { useHistory } from "react-router-dom";
import { apiKey, baseUrl } from "../constants/api";
import axios from "axios";

type Props = {};

type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

let fetchAutocomplete = (title: string, setMovies: Function) => {
  axios
    .get(baseUrl + "?apikey=" + apiKey + "&s=" + title + "&page=1")
    .then((res) => {
      setMovies(res.data.Response === "True" ? res.data.Search : []);
    });
};

export function Header(props: Props) {
  let [movies, setMovies] = useState([]);
  let [searchedMovieTitle, setSearchMovieTitle] = useState("");
  let history = useHistory();

  let onTitleSearch = (title: string) => {
    setSearchMovieTitle(title);
    history.push(`/movies/` + title);
  };

  useEffect(() => {
    fetchAutocomplete(searchedMovieTitle, setMovies);
  }, [searchedMovieTitle]);

  return (
    <View style={styles.rootBox}>
      <Image style={styles.logoImage} source={{ uri: BibitLogo }} />
      <Text style={styles.headerTitleText}>movie</Text>
      <View style={{ flex: 1 }} />
      <View>
        <TextInput
          placeholder="Cari judul film..."
          value={searchedMovieTitle}
          onChangeText={(text) => setSearchMovieTitle(text)}
          containerStyle={{ paddingRight: 20 }}
          rightElement={
            <Image style={styles.searchIcon} source={{ uri: SearchIcon }} />
          }
          onSearch={() => onTitleSearch(searchedMovieTitle)}
        />
        {movies.length > 0 ? (
          <View style={styles.autocompleteBox}>
            {movies
              .filter((movie: Movie, i) => i < 5)
              .map((movie: Movie) => {
                return (
                  <TouchableOpacity
                    key={movie.imdbID}
                    onPress={() => {
                      onTitleSearch(movie.Title);
                    }}
                  >
                    <Text style={{ marginBottom: 10 }}>{movie.Title}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootBox: {
    flexDirection: "row",
    padding: 23,
    alignItems: "center",
    backgroundColor: WHITE,
    zIndex: 100,
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  logoImage: {
    height: 21,
    width: 98,
    marginRight: -5,
    zIndex: 2,
  },
  headerTitleText: {
    fontWeight: "600",
    fontSize: 19,
    marginBottom: 1,
    zIndex: 3,
  },
  autocompleteBox: {
    position: "absolute",
    backgroundColor: WHITE,
    top: 38,
    left: -5,
    padding: 10,
    zIndex: 100,
  },
});

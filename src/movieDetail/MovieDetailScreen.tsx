import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { GRAY, WHITE } from "../general/constants/colors";
import Button from "../general/core-ui/Button";
import { apiKey, baseUrl, imdbUrl } from "../general/constants/api";
import axios from "axios";
import { useLocation } from "react-router-dom";

type Props = {};

type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

let onImdbClick = (imdbID: string | null) => {
  let windowOpen = window.open(imdbUrl + "/" + imdbID, "_blank");
  if (windowOpen) {
    windowOpen.focus();
  }
};

let fetchMovies = (title: string, setMovie: Function) => {
  console.log("TITLE: ", title);
  axios
    .get(baseUrl + "?apikey=" + apiKey + "&s=" + title + "&page=1")
    .then((res) => {
      setMovie(res.data.Response === "True" ? res.data.Search[0] : {});
    });
};

let getMovieTitle = (path: string) => {
  let pathArray = path.split("/");
  return pathArray[pathArray.length - 2];
};

function MovieDetailScreen(props: Props) {
  let { pathname } = useLocation();
  let [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchMovies(getMovieTitle(pathname), setMovie);
  }, [pathname, setMovie]);

  return movie ? (
    <View style={styles.rootBox}>
      <Image style={styles.movieImage} source={{ uri: movie?.Poster }} />
      <View style={styles.movieInfoBox}>
        <Text style={styles.movieTitleText}>{movie?.Title}</Text>
        <Text style={styles.movieInfoText}>{movie?.Year}</Text>
        <Text style={styles.movieInfoText}>{movie?.Type}</Text>
        <View style={{ flex: 1 }} />
        <Button
          onPress={() => onImdbClick(movie ? movie?.imdbID : null)}
          containerStyle={styles.imdbButton}
          sizePreset="small"
        >
          IMDB
        </Button>
      </View>
    </View>
  ) : (
    <View />
  );
}

export default MovieDetailScreen;

const styles = StyleSheet.create({
  rootBox: {
    paddingTop: 100,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: WHITE,
    overflow: "hidden",
  },
  movieImage: {
    height: 407,
    width: 275,
  },
  movieInfoBox: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  movieTitleText: {
    fontSize: 20,
    fontWeight: "800",
  },
  movieInfoText: {
    fontSize: 14,
    color: GRAY,
    fontStyle: "italic",
    marginTop: 3,
  },
  imdbButton: {
    alignSelf: "flex-start",
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { MAIN_GREEN } from "../general/constants/colors";
import MovieItem from "./components/MovieItem";
import axios from "axios";
import { apiKey, baseUrl } from "../general/constants/api";
import { useLocation } from "react-router-dom";
import PosterModal from "./components/PosterModal";

type Props = {};

type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

let fetchMovies = (
  title: string,
  movies: Array<Movie>,
  setMovies: Function,
  totalItem: number,
  setTotalItem: Function,
  currentPage: number,
  setCurrentPage: Function,
  lastSearchedTitle: string,
  setLastSearchedTitle: Function
) => {
  axios
    .get(baseUrl + "?apikey=" + apiKey + "&s=" + title + "&page=" + currentPage)
    .then((res) => {
      let searchResult = res.data.Search;
      totalItem === 0 && setTotalItem(res.data.totalResults);
      res.data.Response === "True" &&
        setMovies(
          title !== lastSearchedTitle
            ? searchResult
            : movies.concat(searchResult)
        );
    });
};

let getMovieTitle = (path: string) => {
  let pathArray = path.split("/");
  return pathArray[pathArray.length - 1];
};

function MovieListScreen(props: Props) {
  let { pathname } = useLocation();

  let [movies, setMovies] = useState([]);
  let [lastSearchedTitle, setLastSearchedTitle] = useState("");
  let [selectedPoster, setSelectedPoster] = useState("");
  let [totalItem, setTotalItem] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    currentPage <= Math.ceil(totalItem / 10) &&
      movies.length < totalItem &&
      movies.length < currentPage * 10 &&
      fetchMovies(
        getMovieTitle(pathname),
        movies,
        setMovies,
        totalItem,
        setTotalItem,
        currentPage,
        setCurrentPage,
        lastSearchedTitle,
        setLastSearchedTitle
      );
  }, [
    currentPage,
    movies,
    pathname,
    setMovies,
    totalItem,
    lastSearchedTitle,
    setLastSearchedTitle,
  ]);

  useEffect(() => {
    fetchMovies(
      getMovieTitle(pathname),
      [],
      setMovies,
      0,
      setTotalItem,
      1,
      setCurrentPage,
      lastSearchedTitle,
      setLastSearchedTitle
    );
  }, [pathname, lastSearchedTitle, setLastSearchedTitle]);

  let renderListItem = ({ item }: { item: Movie }) => {
    return (
      <MovieItem
        Poster={item.Poster}
        Title={item.Title}
        Type={item.Type}
        Year={item.Year}
        imdbID={item.imdbID}
        onPosterPress={setSelectedPoster}
      />
    );
  };

  return (
    <View>
      <PosterModal
        isOpen={selectedPoster.length > 0}
        onDismiss={() => setSelectedPoster("")}
      >
        <Image style={styles.movieImage} source={{ uri: selectedPoster }} />
      </PosterModal>
      <Text style={styles.resultText}>{`SEARCH RESULTS`}</Text>
      <FlatList
        data={movies}
        renderItem={renderListItem}
        keyExtractor={(item: Movie) => item.imdbID}
        onEndReached={() => {
          setCurrentPage(currentPage + 1);
        }}
        onEndReachedThreshold={0}
      />
    </View>
  );
}

export default MovieListScreen;

const styles = StyleSheet.create({
  resultText: {
    fontSize: 36,
    fontWeight: "800",
    color: MAIN_GREEN,
    alignSelf: "center",
    marginBottom: 20,
  },
  movieImage: {
    height: 610,
    width: 412,
    marginBottom: 10,
  },
});

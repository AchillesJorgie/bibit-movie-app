import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useHistory } from "react-router";
import { imdbUrl } from "../../general/constants/api";
import { GRAY, GRAY30, WHITE } from "../../general/constants/colors";
import Button from "../../general/core-ui/Button";

type Props = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  onPosterPress: Function;
};

let onImdbClick = (imdbID: string) => {
  let windowOpen = window.open(imdbUrl + "/" + imdbID, "_blank");
  if (windowOpen) {
    windowOpen.focus();
  }
};

function MovieItem(props: Props) {
  let { Poster: image, Title: title, Type: type, Year: year, imdbID } = props;
  let history = useHistory();
  return (
    <View style={styles.rootBox}>
      <TouchableOpacity onPress={(_) => props.onPosterPress(image)}>
        <Image style={styles.movieImage} source={{ uri: image }} />
      </TouchableOpacity>
      <View style={styles.movieInfoBox}>
        <TouchableOpacity
          onPress={(_) => history.push("/movies/" + title + "/detail")}
        >
          <Text style={styles.movieTitleText}>{title}</Text>
        </TouchableOpacity>
        <Text style={styles.movieInfoText}>{year}</Text>
        <Text style={styles.movieInfoText}>{type}</Text>
        <View style={{ flex: 1 }} />
        <Button
          onPress={() => onImdbClick(imdbID)}
          containerStyle={styles.imdbButton}
          sizePreset="small"
        >
          IMDB
        </Button>
      </View>
    </View>
  );
}

export default MovieItem;

const styles = StyleSheet.create({
  rootBox: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: WHITE,
    borderColor: GRAY30,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 6,
    marginBottom: 30,
    width: 612,
    overflow: "hidden",
    height: 148,
  },
  movieImage: {
    height: 148,
    width: 100,
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

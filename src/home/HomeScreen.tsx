import React from "react";
import { View, Image } from "react-native";
import { WHITE } from "../general/constants/colors";
import IllustrationImage from "../assets/illustration-1.png";

function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 50,
        }}
      >
        <Image
          style={{ height: 600, width: 700 }}
          source={{ uri: IllustrationImage }}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

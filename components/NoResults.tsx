import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import images from "@/constants/images";

const NoResults = () => {
  return (
    <View style={styles.container}>
      <Image
        source={images.noResult}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Results</Text>
      <Text style={styles.subtitle}>We could not find any results</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: "92%", // approx w-11/12
    height: 320, // h-80 roughly 320px
  },
  title: {
    fontSize: 24, // text-2xl
    fontFamily: "Rubik-Bold", // assuming you have "font-rubik-bold" set up
    color: "#666666", // assuming black-300 is a lighter black
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16, // text-base
    color: "#999999", // assuming black-100 is a lighter grey
    marginTop: 8,
  },
});

export default NoResults;

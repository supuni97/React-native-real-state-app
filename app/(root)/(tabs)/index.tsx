import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          marginVertical: 10,
          fontFamily: "Rubik-Regular",
        }}
      >
        Welcome to restate
      </Text>
    </View>
  );
}

import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={images.avatar} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.username}>John Doe</Text>
            </View>
          </View>
          <Image source={icons.bell} style={styles.bellIcon} />
        </View>
      </View>
      <Search />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
  },
  container: {
    paddingHorizontal: 20, // px-5
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20, // mt-5 = 1.25rem = 20px
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48, // size-12 = 3rem = 48px
    borderRadius: 24,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 8, // mt-2 = 0.5rem = 8px
  },
  greeting: {
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: "#B0B0B0", // equivalent to text-black-100
  },
  username: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    color: "#4B4B4B", // equivalent to text-black-300
  },
  bellIcon: {
    width: 24,
    height: 24, // size-6 = 1.5rem = 24px
  },
});

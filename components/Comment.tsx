import { View, Text, Image, StyleSheet } from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <Text style={styles.review}>{item.review}</Text>

      <View style={styles.footer}>
        <View style={styles.likes}>
          <Image
            source={icons.heart}
            style={styles.heartIcon}
            tintColor={"#0061FF"}
          />
          <Text style={styles.likeCount}>120</Text>
        </View>
        <Text style={styles.date}>
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  name: {
    fontSize: 16,
    color: "#000000",
    textAlign: "left",
    fontFamily: "Rubik-Bold",
    marginLeft: 12,
  },
  review: {
    color: "#333333",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 16,
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  likeCount: {
    color: "#555555",
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    marginLeft: 8,
  },
  date: {
    color: "#888888",
    fontSize: 14,
    fontFamily: "Rubik-Regular",
  },
});

export default Comment;

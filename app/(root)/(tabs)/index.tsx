import icons from "@/constants/icons";
import images from "@/constants/images";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";

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

        <Search />

        <View style={styles.featuredSection}>
          <View style={styles.featuredHeader}>
            <Text style={styles.featuredTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featuredCardsRow}>
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </View>
        </View>

        {/* ⬇️ Moved this inside container! */}
        <View style={styles.featuredHeader}>
          <Text style={styles.featuredTitle}>Our Recommendation</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <Filters />
        <View style={styles.cardRow}>
          <Card />
          <Card />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
  },
  cardRow: {
    flexDirection: "row",
    gap: 20, // gap-5 = 20px
    marginTop: 20, // mt-5 = 20px
  },
  container: {
    paddingHorizontal: 20,
  },
  featuredCardsRow: {
    flexDirection: "row",
    gap: 20, // Tailwind gap-5 => 20px
    marginTop: 20, // Tailwind mt-5 => 20px
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    marginLeft: 12,
    marginTop: 8,
  },
  greeting: {
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: "#B0B0B0",
  },
  username: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    color: "#4B4B4B",
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  featuredSection: {
    marginVertical: 20,
  },
  featuredHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  featuredTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    color: "#4B4B4B",
  },
  seeAll: {
    fontSize: 16,
    fontFamily: "Rubik-Bold",
    color: "#4C9EEB",
  },
});

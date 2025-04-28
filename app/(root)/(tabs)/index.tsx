import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Main FlatList */}
      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => item.toString()}
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.profileContainer}>
                  <Image source={{ uri: user?.avatar }} style={styles.avatar} />
                  <View style={styles.textContainer}>
                    <Text style={styles.greeting}>Good Morning</Text>
                    <Text style={styles.username}>{user?.name}</Text>
                  </View>
                </View>
                <Image source={icons.bell} style={styles.bellIcon} />
              </View>

              {/* Search */}
              <Search />

              {/* Featured Section */}
              <View style={styles.featuredSection}>
                <View style={styles.featuredHeader}>
                  <Text style={styles.featuredTitle}>Featured</Text>
                  <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={[1, 2, 3]}
                  renderItem={({ item }) => <FeaturedCard />}
                  keyExtractor={(item) => item.toString()}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 20, // gap between items
                    marginTop: 20, // marginTop
                    paddingRight: 20, // optional, if you want padding
                  }}
                />
              </View>

              {/* Recommendations Section */}
              <View style={styles.featuredHeader}>
                <Text style={styles.featuredTitle}>Our Recommendation</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>

              {/* Filters */}
              <Filters />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {/* You can render your Cards or items here */}
            <Card />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// 🔥 STYLES
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
  },
  flatListContainer2: {
    paddingBottom: 128,
    paddingTop: 10,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },

  flatListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  cardRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  featuredCardsRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
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
  listItem: {
    marginTop: 20,
  },
});

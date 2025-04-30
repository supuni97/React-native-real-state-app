import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter ?? "",
      query: params.query ?? "",
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter ?? "",
      query: params.query ?? "",
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={properties ?? []}
        keyExtractor={(item) => item.$id}
        horizontal={false}
        numColumns={2}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#3B82F6"
              style={styles.loader}
            />
          ) : (
            <NoResults />
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Card item={item} onPress={() => handleCardPress(item.$id)} />
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.searchWrapper}>
            <View style={styles.backArrowWrapper}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backArrow}
              >
                <Image source={icons.backArrow} style={styles.arrowIcon} />
              </TouchableOpacity>
              <Text style={styles.topText}>Search for Your Ideal Home</Text>
              <Image source={icons.bell} style={styles.topIcon} />
            </View>

            <Search />

            <View style={styles.filterSection}>
              <Filters />
              <Text style={styles.propertyCount}>
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// 🔥 STYLES
const styles = StyleSheet.create({
  backArrowWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  topText: {
    fontSize: 16, // text-base = 16px
    marginRight: 8, // mr-2 = 8px
    textAlign: "center",
    fontFamily: "Rubik-Medium",
    color: "#4B5563",
  },
  topIcon: {
    width: 24, // w-6 = 24px
    height: 24, // h-6 = 24px
    resizeMode: "contain",
  },
  backArrow: {
    flexDirection: "row",
    backgroundColor: "#D6E4FF", // replace with your actual 'primary-200' color
    borderRadius: 999,
    width: 44, // equivalent to size-11 (11 * 4 = 44)
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    width: 20, // size-5
    height: 20,
    resizeMode: "contain",
  },
  searchWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  filterSection: {
    marginTop: 20,
  },
  propertyCount: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    color: "#4b5563",
    marginTop: 20,
  },
  safeArea: {
    backgroundColor: "white",
    flex: 1,
  },
  flatListContainer2: {
    paddingBottom: 128,
    paddingTop: 10,
  },
  loader: {
    marginTop: 20,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  container: {
    paddingHorizontal: 20,
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

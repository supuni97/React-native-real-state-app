import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";

import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={[styles.relative, { height: windowHeight / 2 }]}>
          <Image
            source={{ uri: property?.image }}
            style={styles.fullSize}
            resizeMode="cover"
          />
          <Image source={images.whiteGradient} style={styles.gradientOverlay} />

          <View
            style={[
              styles.absoluteTop,
              {
                top: Platform.OS === "ios" ? 70 : 20,
              },
            ]}
          >
            <View style={styles.rowBetween}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Image source={icons.backArrow} style={styles.iconSmall} />
              </TouchableOpacity>

              <View style={styles.iconRow}>
                <Image
                  source={icons.heart}
                  style={styles.iconMedium}
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} style={styles.iconMedium} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.title}>{property?.name}</Text>

          <View style={styles.rowGap}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{property?.type}</Text>
            </View>

            <View style={styles.rowGapSmall}>
              <Image source={icons.star} style={styles.iconSmall} />
              <Text style={styles.ratingText}>
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.rowWrap}>
            <View style={styles.featureIconWrap}>
              <Image source={icons.bed} style={styles.iconTiny} />
            </View>
            <Text style={styles.featureText}>{property?.bedrooms} Beds</Text>

            <View style={[styles.featureIconWrap, styles.marginLeft]}>
              <Image source={icons.bath} style={styles.iconTiny} />
            </View>
            <Text style={styles.featureText}>{property?.bathrooms} Baths</Text>

            <View style={[styles.featureIconWrap, styles.marginLeft]}>
              <Image source={icons.area} style={styles.iconTiny} />
            </View>
            <Text style={styles.featureText}>{property?.area} sqft</Text>
          </View>

          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>Agent</Text>
            <View style={styles.rowBetweenMargin}>
              <View style={styles.rowStart}>
                <Image
                  source={{ uri: property?.agent.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.agentInfo}>
                  <Text style={styles.agentName}>{property?.agent.name}</Text>
                  <Text style={styles.agentEmail}>{property?.agent.email}</Text>
                </View>
              </View>
              <View style={styles.iconRow}>
                <Image source={icons.chat} style={styles.iconMedium} />
                <Image source={icons.phone} style={styles.iconMedium} />
              </View>
            </View>
          </View>

          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>{property?.description}</Text>
          </View>

          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            {property?.facilities.length > 0 && (
              <View style={styles.facilityWrap}>
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find((f) => f.title === item);
                  return (
                    <View key={index} style={styles.facilityItem}>
                      <View style={styles.facilityIconWrap}>
                        <Image
                          source={facility ? facility.icon : icons.info}
                          style={styles.iconSmall}
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.facilityText}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View style={styles.sectionSpacing}>
              <Text style={styles.sectionTitle}>Gallery</Text>
              <FlatList
                contentContainerStyle={styles.galleryList}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.galleryImage}
                  />
                )}
              />
            </View>
          )}

          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.rowGapSmallMargin}>
              <Image source={icons.location} style={styles.iconLocation} />
              <Text style={styles.locationText}>{property?.address}</Text>
            </View>
            <Image source={images.map} style={styles.mapImage} />
          </View>

          {property?.reviews.length > 0 && (
            <View style={styles.sectionSpacing}>
              <View style={styles.rowBetween}>
                <View style={styles.rowStart}>
                  <Image source={icons.star} style={styles.iconSmall} />
                  <Text style={styles.reviewTitle}>
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.commentContainer}>
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>
          <View style={styles.priceColumn}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text numberOfLines={1} style={styles.priceText}>
              ${property?.price}
            </Text>
          </View>
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingBottom: 128, backgroundColor: "#fff" },
  relative: { position: "relative", width: "100%" },
  fullSize: { width: "100%", height: "100%" },
  gradientOverlay: { position: "absolute", top: 0, width: "100%", zIndex: 40 },
  absoluteTop: { zIndex: 50, position: "absolute", left: 28, right: 28 },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#D6E4FF",
    borderRadius: 9999,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSmall: { width: 20, height: 20 },
  iconMedium: { width: 28, height: 28 },
  iconTiny: { width: 16, height: 16 },
  iconRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  detailsSection: { paddingHorizontal: 20, marginTop: 28, gap: 8 },
  title: { fontSize: 24, fontFamily: "Rubik-ExtraBold" },
  rowGap: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowGapSmall: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    flexWrap: "wrap",
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#D6E4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    color: "#737791",
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    marginLeft: 8,
  },
  marginLeft: { marginLeft: 28 },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E6EEFF",
    borderRadius: 9999,
  },
  tagText: { fontSize: 12, fontFamily: "Rubik-Bold", color: "#0061FF" },
  ratingText: {
    color: "#8A8F9E",
    fontSize: 14,
    marginTop: 2,
    fontFamily: "Rubik-Medium",
  },
  sectionDivider: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#D6E4FF",
    paddingTop: 28,
    marginTop: 20,
  },
  sectionTitle: { color: "#737791", fontSize: 20, fontFamily: "Rubik-Bold" },
  rowBetweenMargin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  rowStart: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 56, height: 56, borderRadius: 9999 },
  agentInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 12,
  },
  agentName: { fontSize: 18, color: "#737791", fontFamily: "Rubik-Bold" },
  agentEmail: { fontSize: 14, color: "#8A8F9E", fontFamily: "Rubik-Medium" },
  sectionSpacing: { marginTop: 28 },
  description: {
    color: "#8A8F9E",
    fontSize: 16,
    fontFamily: "Rubik",
    marginTop: 8,
  },
  facilityWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: 8,
    gap: 20,
  },
  facilityItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    minWidth: 64,
    maxWidth: 80,
  },
  facilityIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: "#D6E4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  facilityText: {
    color: "#737791",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Rubik",
    marginTop: 6,
  },
  galleryList: { paddingRight: 20, gap: 16, marginTop: 12 },
  galleryImage: { width: 160, height: 160, borderRadius: 16 },
  rowGapSmallMargin: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  iconLocation: { width: 28, height: 28 },
  locationText: { color: "#8A8F9E", fontSize: 14, fontFamily: "Rubik-Medium" },
  mapImage: { height: 208, width: "100%", marginTop: 20, borderRadius: 16 },
  reviewTitle: {
    color: "#737791",
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    marginLeft: 8,
  },
  viewAllText: { color: "#0061FF", fontSize: 16, fontFamily: "Rubik-Bold" },
  commentContainer: { marginTop: 20 },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: "#D6E4FF",
    padding: 28,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
  },
  priceColumn: { flexDirection: "column", alignItems: "flex-start" },
  priceLabel: { color: "#8A8F9E", fontSize: 12, fontFamily: "Rubik-Medium" },
  priceText: {
    color: "#0061FF",
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    textAlign: "left",
  },
  bookNowButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0061FF",
    paddingVertical: 12,
    borderRadius: 9999,
    shadowColor: "#737791",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  bookNowText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Rubik-Bold",
    textAlign: "center",
  },
});

export default Property;

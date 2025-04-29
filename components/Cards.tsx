import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.featuredCard}>
      <Image source={{ uri: image }} style={styles.featuredImage} />
      <Image source={images.cardGradient} style={styles.gradientImage} />

      <View style={styles.ratingBadge}>
        <Image source={icons.star} style={styles.starIcon} />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.titleText} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.addressText}>{address}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>${price}</Text>
          <Image source={icons.heart} style={styles.heartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardRatingBadge}>
        <Image source={icons.star} style={styles.cardStarIcon} />
        <Text style={styles.cardRatingText}>4.4</Text>
      </View>

      <Image source={{ uri: image }} style={styles.cardImage} />

      <View style={styles.cardInfoContainer}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.cardAddress}>{address}</Text>

        <View style={styles.cardPriceRow}>
          <Text style={styles.cardPriceText}>${price}</Text>
          <Image source={icons.heart} style={styles.cardHeartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // FeaturedCard styles
  featuredCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 240,
    height: 320,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  gradientImage: {
    borderRadius: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    position: "absolute",
    top: 20,
    right: 20,
  },
  starIcon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5F40E6",
    marginLeft: 4,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  addressText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
    marginTop: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  heartIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  // Card styles
  card: {
    flex: 1,
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    position: "relative",
  },
  cardRatingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 50,
  },
  cardStarIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
  cardRatingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5F40E6",
    marginLeft: 2,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    resizeMode: "cover",
  },
  cardInfoContainer: {
    flexDirection: "column",
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191d31",
  },
  cardAddress: {
    fontSize: 12,
    fontWeight: "400",
    color: "#7b7b7b",
    marginTop: 2,
  },
  cardPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cardPriceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5F40E6",
  },
  cardHeartIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
    tintColor: "#191d31",
  },
});

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    } else {
      setSelectedCategory(category);
      router.setParams({ filter: category });
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === item.title && styles.activeCategory,
          ]}
          onPress={() => handleCategoryPress(item.title)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.title && styles.activeCategoryText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 12, // mt-3
    marginBottom: 8, // mb-2
    paddingLeft: 20,
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 16, // mr-4
    paddingHorizontal: 16, // px-4
    paddingVertical: 16, // py-4
    borderRadius: 999, // rounded-full
    backgroundColor: "#f2f2f2",
  },
  activeCategory: {
    backgroundColor: "#4C9EEB",
  },
  categoryText: {
    fontSize: 14,
    color: "#4B4B4B",
  },
  activeCategoryText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

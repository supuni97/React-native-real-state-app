import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || "");

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerContainer}>
        <Image source={icons.search} style={styles.icon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#4B4B4B",
    flex: 1,
  },
});

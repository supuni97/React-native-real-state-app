import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View style={styles.container}>
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      style={styles.icon}
    />
    <Text
      style={[
        styles.label,
        focused ? styles.labelFocused : styles.labelUnfocused,
      ]}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minWidth: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    width: "100%",
    textAlign: "center",
    marginTop: 4,
  },
  labelFocused: {
    color: "#93C5FD",
    fontFamily: "Rubik-Medium",
  },
  labelUnfocused: {
    color: "#A1A1AA",
    fontFamily: "Rubik",
  },
});

export default TabsLayout;

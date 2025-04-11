import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-povider";
import { logout } from "@/lib/appwrite";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Image source={icon} style={styles.itemIcon} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} style={styles.arrowIcon} />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Image style={styles.bell} source={icons.bell} />
        </View>
        <View style={styles.centerRow}>
          <View style={styles.avatarWrapper}>
            {user?.avatar && (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            )}
            <TouchableOpacity style={styles.editBtn}>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>
            {user?.name && <Text style={styles.name}>{user.name}</Text>}
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View style={styles.sectionWrapper2}>
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View style={styles.sectionWrapper2}>
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 48,
    paddingHorizontal: 28,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
  bell: {
    width: 20,
    height: 20,
  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  avatarWrapper: {
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
  },
  avatar: {
    width: 176,
    height: 176,
    borderRadius: 88,
    position: "relative",
  },
  editBtn: {
    position: "absolute",
    bottom: 44,
    right: 8,
  },
  editIcon: {
    width: 36,
    height: 36,
  },
  name: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginTop: 8,
  },
  sectionWrapper: {
    flexDirection: "column",
    marginTop: 40,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  itemText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#1E1E1E", // Adjust if you have a specific color token for text-black-300
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  sectionWrapper2: {
    flexDirection: "column",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#C0D4FF", // This is your `primary-200` color — adjust if needed
  },
});

export default Profile;

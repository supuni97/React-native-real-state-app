import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
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
}: SettingsItemProps) => {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingItemLeft}>
        <Image style={styles.settingIcon} source={icon} />
        <Text
          style={[styles.settingText, textStyle && { fontFamily: textStyle }]}
        >
          {title}
        </Text>
      </View>
      {showArrow && (
        <Image source={icons.rightArrow} style={styles.arrowIcon} />
      )}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success, You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error, An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <Image source={icons.bell} style={styles.bellIcon} />
        </View>

        <View style={styles.centerRow}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editIconWrapper}>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>
            <Text style={styles.username}>{user?.name}</Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View style={styles.settingsSection}>
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View style={styles.settingsSection}>
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 128, // Equivalent to pb-32
    paddingHorizontal: 28, // Equivalent to px-7
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700", // Equivalent to font-rubik-bold
    fontFamily: "Rubik-Bold", // Optional if using custom fonts
  },
  bellIcon: {
    width: 20,
    height: 20,
  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  profileContainer: {
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
  editIconWrapper: {
    position: "absolute",
    bottom: 44,
    right: 8,
  },
  editIcon: {
    width: 36,
    height: 36,
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Rubik-Bold",
    marginTop: 8,
  },
  bottomSection: {
    marginTop: 40,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // if gap is not supported in your version, use marginRight on icon or text
  },
  settingIcon: {
    width: 24,
    height: 24,
  },
  settingText: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#1F1F1F", // Assuming black-300 is close to this
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  settingsSection: {
    flexDirection: "column",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#D1E4FF", // assuming "primary-200" is a light primary shade
  },
  textDanger: {
    color: "#FF4D4F", // Adjust based on your 'danger' color
  },
});

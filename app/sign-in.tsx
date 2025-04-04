import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  const handleLogin = () => {};
  const { width, height } = useWindowDimensions();

  // Responsive paddings and sizes
  const horizontalPadding = width * 0.08; // ~8% padding on left/right
  const titleFontSize = width < 375 ? 23 : 27;
  const subtitleFontSize = width < 375 ? 14 : 16;
  const buttonFontSize = width < 375 ? 16 : 18;

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={images.onboarding}
          style={{
            width: "100%",
            height: height * 0.6,
          }}
          resizeMode="contain"
        />

        <View style={{ paddingHorizontal: horizontalPadding }}>
          <Text
            style={{
              fontSize: subtitleFontSize,
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "Rubik-Regular",
              color: "#A1A1AA",
            }}
          >
            Welcome to Restate
          </Text>

          <Text
            style={{
              fontSize: titleFontSize,
              fontFamily: "Rubik-Bold",
              color: "#52525B",
              textAlign: "center",
              marginTop: 8,
              lineHeight: 40,
            }}
          >
            Let's Get You Closer to {"\n"}
            <Text style={{ color: "#0A84FF" }}>Your Ideal Home</Text>
          </Text>

          <Text
            style={{
              fontSize: buttonFontSize,
              fontFamily: "Rubik-Regular",
              color: "#A1A1AA",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Login to Restate with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "#ffffff",
              shadowColor: "#D4D4D8",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              borderRadius: 9999,
              width: "100%",
              paddingVertical: 16,
              alignItems: "center",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Image
              source={icons.google}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: buttonFontSize,
                fontFamily: "Rubik-SemiBold",
                color: "black",
              }}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

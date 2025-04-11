import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  Platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.Platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Failed to login");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") throw new Error("Failed");

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// export async function getCurrentUser() {
//   try {
//     const response = await account.get();
//     if (response.$id) {
//       const userAvatar = avatar.getInitials(response.name);
//       return {
//         ...response,
//         avatar: userAvatar.toString(),
//       };
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      const user = {
        ...response,
        avatar: userAvatar.toString(),
      };
      console.log("User fetched successfully:", user); // <- ✅ Add this
      return user;
    }
  } catch (error) {
    console.error("getCurrentUser error:", error); // <- ✅ Already good
    return null;
  }
}

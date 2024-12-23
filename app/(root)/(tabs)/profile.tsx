import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
}: SettingsItemProps) => (
  <TouchableOpacity
    className="flex flex-row items-center justify-between py-3"
    onPress={onPress}
  >
    <View className="flex flex-row gap-3">
      <Image source={icon} className="size-6" />
      <Text
        className={`text-black-300, font-rubik-medium text-lg ${textStyle}`}
      >
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully.");
      refetch();
    } else {
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        contentContainerClassName="pb-32 px-7"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-5 flex flex-row items-center justify-between">
          <Text className="font-rubik-bold text-xl">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="mt-5 flex flex-row justify-center">
          <View className="relative mt-5 flex flex-col items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="relative size-44 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="mt-2 font-rubik-bold text-2xl">{user?.name}</Text>
          </View>
        </View>

        <View className="mt-10 flex flex-col">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View className="mt-5 flex flex-col border-t border-primary-200 pt-5">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="mt-5 flex flex-col border-t border-primary-200 pt-5">
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

export default Profile;

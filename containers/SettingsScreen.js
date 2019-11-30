import React from "react";
import { Button, Text, View, AsyncStorage } from "react-native";

export default function SettingsScreen({ setToken, setId }) {

  const delCookie = async () => {
    await AsyncStorage.setItem("userToken", "");
    await AsyncStorage.setItem("userId", "");
  }

  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
          setId(null);
          delCookie();
        }}
      />
    </View>
  );
}

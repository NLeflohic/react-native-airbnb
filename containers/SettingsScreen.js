import React from "react";
import { Button, Text, View, AsyncStorage } from "react-native";

export default function SettingsScreen({ setToken }) {

  const delCookie = async () => {
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("userid", "");
  }

  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
          delCookie();
        }}
      />
    </View>
  );
}

import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, AsyncStorage } from "react-native";

export default function ProfileScreen({ token }) {

  const getToken = async () => {
    const stored = await AsyncStorage.getItem("token");
    console.log(stored);
  }

  // const userToken = JSON.parse(stored);

  const { params } = useRoute();
  getToken();
  console.log("token ", { token });
  return (
    <View>
      <Text>user id : {params.userId}</Text>
      {/* <Text>token : {userToken}</Text> */}
    </View>
  );
};

import React, { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View, AsyncStorage } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { white } from "ansi-colors";
import { useNavigation } from "@react-navigation/core";

export default function SignInScreen({ setToken, setUserId }) {
  const navigation = useNavigation();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChange = (text) => {
    setUsername(text);
  }
  const passwordChange = (text) => {
    setPassword(text);
  }

  const fetchdata = async () => {
    console.log("username", username);
    console.log("password", password);

    const response = await axios.post("https://airbnb-api.herokuapp.com//api/user/log_in", {
      email: username, //"arno@airbnb-api.com",
      password: password //"password01"
    });
    if (response.data.token) {
      const stored = await AsyncStorage.getItem("token");
      console.log("stored ", stored);
      const storedId = await AsyncStorage.getItem("userid");
      console.log("storedId ", storedId);
      if (stored === null) {
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("userid", response.data._id);
        const userId = response.data._id;
        console.log("user id: ", userId)
        setUserId(userId);
        setToken(userToken);
        setConnected(true);
      } else {
        if (stored === response.data.token) {
          const userToken = response.data.token;
          await AsyncStorage.setItem("userid", response.data._id);
          const userId = response.data._id;
          console.log("user id: ", "id ", userId, response.data._id)
          setUserId(userId);
          setToken(userToken);
          setConnected(true);
        } else {
          setUserId(null);
          setToken(null);
          setConnected(false);
        }
      }
    } else {
      setToken(null);
      setConnected(false);
    }
  }
  return (
    <View style={styles.body}>
      <View style={styles.graph}>
        <Ionicons style={styles.icon} name="ios-home" size={128} color='white' />
        <Text style={styles.welcome}>Welcome</Text>
      </View>
      {/* <Text>Name: </Text> */}
      <View style={styles.loginInfo}>
        <View style={styles.input}>
          <TextInput placeholder="Username" style={styles.username} onChangeText={usernameChange} />
        </View>
        {/* <Text>Password: </Text> */}
        <View style={styles.input}>
          <TextInput placeholder="Password" secureTextEntry={true} style={styles.password} onChangeText={passwordChange} />
        </View>
        <TouchableOpacity style={styles.button} onPress={
          fetchdata
          // async () => {
          // const userToken = "secret-token";
          // setToken(userToken);
          // }
        }>
          <View>
            <Text style={styles.textBtn}>Login</Text>
          </View>
        </TouchableOpacity>

        {!connected &&
          <TouchableOpacity style={styles.buttonSignup} onPress={
            () => {
              // navigation.navigate("Profile", { userId: 123 });
              navigation.navigate('SignUp')
            }
            // async&&() => {
            // const &userToken = "secret-token";
            // setToken(userToken);
            // }
          }>
            <View>
              <Text style={styles.textBtnSignup}>Sign up</Text>
            </View>
          </TouchableOpacity>
        }
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  textBtnSignup: {
    fontSize: 24,
    color: 'white',
    fontWeight: "300",
  },
  buttonSignup: {
    marginTop: 60,
    height: 58,
    width: 150,
    backgroundColor: '#FF4858',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  body: {
    backgroundColor: '#FF4858',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
  },
  graph: {
    height: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 48,
    color: 'white',
  },
  loginInfo: {
    height: 400,
    alignItems: 'center',
  },
  button: {
    marginTop: 60,
    height: 68,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 36,
    color: '#FF4858',
    fontWeight: "300",
  },
  username: {
    lineHeight: 44,
    fontSize: 24,
    color: 'white',
    borderBottomColor: 'white',
    marginBottom: 5,
    width: 250,
  },
  password: {
    lineHeight: 44,
    fontSize: 24,
    color: 'white',
    borderBottomColor: 'white',
    marginBottom: 5,
    width: 250,
  },
  input: {
    alignItems: "stretch",
    borderBottomColor: 'white',
    borderBottomWidth: 1.5,
    marginBottom: 20,
  },

});

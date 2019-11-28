import React, { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View, AsyncStorage, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { white } from "ansi-colors";
import { useNavigation } from "@react-navigation/core";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordconfirmation] = useState("");

  const usernameChange = (text) => {
    setUsername(text);
  }
  const emailChange = (text) => {
    setEmail(text);
  }
  const passwordChange = (text) => {
    setPassword(text);
  }
  const passConfChange = (text) => {
    setPasswordconfirmation(text);
  }

  const onSignup = async () => {
    const response = await axios.post("https://airbnb-api.now.sh/api/user/sign_up", {
      email: email,
      password: password,
      username: username,
    });
    console.log(response.data);
    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token);
      const userToken = response.data.token;
      setToken(userToken);
      setConnected(true);
    } else {
      navigation.navigate("SignIn");
    }
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0

  return (
    <View style={styles.body}>
      <View style={styles.graph}>
        <Ionicons style={styles.icon} name="ios-home" size={128} color='white' />
        <Text style={styles.welcome}>Welcome</Text>
      </View>
      <KeyboardAvoidingView behavior='padding'>
        <View style={styles.loginInfo}>
          <View style={styles.input}>
            <TextInput placeholder="Email" style={styles.username} onChangeText={emailChange} />
          </View>
          <View style={styles.input}>
            <TextInput placeholder="Username" style={styles.username} onChangeText={usernameChange} />
          </View>
          <View style={styles.input}>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.password} onChangeText={passwordChange} />
          </View>
          <View style={styles.input}>
            <TextInput placeholder="Password confirmation" secureTextEntry={true} style={styles.password} onChangeText={passConfChange} />
          </View>
          {!connected &&
            <TouchableOpacity style={styles.button} onPress={onSignup}>
              <View>
                <Text style={styles.textBtn}>Sign up</Text>
              </View>
            </TouchableOpacity>
          }
        </View >
      </KeyboardAvoidingView>
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
    marginTop: 10,
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
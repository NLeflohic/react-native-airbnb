import React, { useState, useEffect, useCallback } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, AsyncStorage, Image, ActivityIndicator, StyleSheet, Button } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileUser, setProfileUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isModify, setIsModify] = useState(false);

  const fetchdata = async () => {
    const url = "https://airbnb-api.herokuapp.com/api/user/" + userId;
    console.log(url);
    if (token && userId) {
      try {
        const response = await axios.get(url,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data"
            }
          }
        );
        if (response.data) {
          console.log(response.data);
          setProfileUser({
            _id: response.data._id,
            account: response.data.account
          });
          setIsLoading(false);
        }
      }
      catch (e) {
        alert("On error as occured");
      }
    }
  };

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem("userToken");
    const storedId = await AsyncStorage.getItem("userId");
    setToken(storedToken);
    setUserId(storedId);
  };

  const takePhoto = useCallback(async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      handleImagePicked(pickerResult);
    }
  });

  const pickImage = useCallback(async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      handleImagePicked(pickerResult);
    }
  });

  const handleImagePicked = useCallback(async pickerResult => {
    let uploadResponse, uploadResult;
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        if (Array.isArray(uploadResult) === true && uploadResult.length > 0) {
          setImage(uploadResult[0]);
        }
      }
    } catch (e) {
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  });

  async function uploadImageAsync(uri) {
    const apiUrl = "https://airbnb-api.herokuapp.com/api/user/upload_picture";
    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append("picture", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,//"KbGrJosUZSNMwJaa",
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };
    return fetch(apiUrl, options);
  }


  useEffect(() => {
    getToken();
    fetchdata();
  }, [userId, token, image])


  const onIconPress = () => {
    console.log(isModify);
    setIsModify(!isModify);
  }

  console.log("user Token :", token);
  console.log("userId ", userId);
  return (
    <>
      <View style={styles.modifier}>
        <MaterialCommunityIcons style={styles.icon} name="square-edit-outline" size={24} onPress={onIconPress} />
      </View>
      <View style={styles.profile}>
        {isLoading ? (<ActivityIndicator />) : (
          <>
            <View style={styles.recap}>
              <Text style={styles.pseudo}>Pseudo : {profileUser.account.username}</Text>
              <View style={styles.info}>
                {(profileUser.account.photos.length > 0) ?
                  <Image style={styles.images} source={{ uri: profileUser.account.photos[0] }} /> :
                  // <Image style={styles.images} source={require("../assets/image-manquante.png")} />
                  <Image style={styles.images} source={require("../assets/abs_photo.jpg")} />
                }
              </View>
            </View>

            {
              isModify &&
              <View style={styles.labelPhoto}>
                <Text style={styles.title}>Mettre a jour :</Text>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                  <View>
                    <Text>Depuis la bibliothèque</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={takePhoto} >
                  <View>
                    <Text>Depuis l'appareil</Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
            <View style={styles.description}>
              <Text style={styles.textDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              In posuere metus sed ante tincidunt auctor. Cras faucibus dolor
              in fermentum auctor. Quisque egestas posuere justo vitae tempus.
              Proin sed nisl sapien. </Text>
            </View>
          </>
        )
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  description: {
    width: 300,
    marginTop: 20,
  },
  textDescription: {
    fontSize: 24,
    lineHeight: 24,
  },
  modifier: {
    height: 30,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  recap: {
    flexDirection: "row",

  },
  pseudo: {
    marginTop: 20,
    fontSize: 24,
  },
  title: {
    marginRight: 30,
    fontSize: 18,
  },
  labelPhoto: {
    height: 50,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontSize: 14,
  },
  button: {
    marginRight: 20,
    height: 40,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
  },
  info: {
    flex: 1,
    height: 200,
    width: 200,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  images: {
    marginTop: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
  }
});

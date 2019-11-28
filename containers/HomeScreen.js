import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { ScrollView, Image, Text, View, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import { Rating } from "react-native-ratings";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [offers, setOffers] = useState({});
  const fetchdata = async () => {
    const response = await axios.get("https://airbnb-api.now.sh/api/room?city=paris");
    if (response) {
      setOffers(response.data);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          alignSelf: "center",
        }}
      />
    );
  };

  return (
    // <View>
    //   <Text>Welcome home!</Text>
    //   <Button
    //     title="Go to Profile"
    //     onPress={() => {
    //       navigation.navigate("Profile", { userId: 123 });
    //     }}
    //   />
    // </View>
    <View>
      <FlatList
        data={offers.rooms}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.description}>
            <View style={styles.house}>
              <TouchableHighlight
                onPress={() => {
                  // setCurrentOffer(item);
                  navigation.navigate("RoomDetail", { item: item });
                }}
              >
                <Image style={styles.images} source={{ uri: item.photos[0] }} />
              </TouchableHighlight>
              <Text style={styles.price}>{item.price} €</Text>
              <View style={styles.legend}>
                <View style={styles.textLegend}>
                  <Text style={styles.title} numberOfLines={1} >{item.title}</Text>
                  <View style={styles.rating}>
                    <Rating
                      style={styles.ratingStar}
                      type="custom"
                      tintColor="#EEEEEE"
                      ratingBackgroundColor="#EEEEEE"
                      ratingCount={5}
                      imageSize={15}
                      readonly
                      startingValue={item.ratingValue}
                    />
                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <View style={styles.imageLegend}>
                  <Image style={styles.portrait} source={{ uri: item.user.account.photos[0] }} />
                </View>
              </View>
            </View>

          </View>
        )}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    position: 'absolute',
    top: 150,
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    fontSize: 24,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textLegend: {
    flexDirection: 'column',
    width: 270,
    flex: 1,
  },
  imageLegend: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 1,
  },
  portrait: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  description: {
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 20,
  },
  house: {
    width: 335,
    height: 305,
    marginBottom: 20,
  },
  images: {
    width: 335,
    height: 230,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
  },
  reviews: {
    fontSize: 18,
    color: '#9CA3AA',
    marginLeft: 10,
  },
});

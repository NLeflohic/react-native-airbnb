import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Platform } from "react-native";
import { Rating } from "react-native-ratings";
import MapView from "react-native-maps";
import Swiper from "react-native-swiper";
import { useRoute } from "@react-navigation/core";

const SwiperComponent = ({ tabPhotos }) => {
  const tabView = [];
  for (let i = 0; i < tabPhotos.length; i++) {
    tabView.push(
      <View key={i}>
        <Image style={styles.imagesSwipper} source={{ uri: tabPhotos[i] }} />
      </View>
    );
  }
  return (
    <Swiper showsButtons={false}>
      {tabView}
    </Swiper>
  )

}

export default function RoomDetailScreen() {
  const [isDescriptionDisplayed, setIsDescriptionDisplayed] = useState(false);
  const { params } = useRoute();
  return (
    <ScrollView style={styles.pages}>
      {/* <Text>{JSON.stringify(params)}</Text> */}
      <View style={styles.wrapper}>
        <SwiperComponent style={styles.images} tabPhotos={params.item.photos} />
        {/* <Image style={styles.images} source={{ uri: params.item.photos[0] }} /> */}
        <Text style={styles.price}>{params.item.price} €</Text>
      </View>
      <View style={styles.description}>
        <View style={styles.legend}>
          <View style={styles.textLegend}>
            <Text style={styles.title} numberOfLines={1} >{params.item.title}</Text>
            <View style={styles.rating}>
              <Rating
                style={styles.ratingStar}
                type="custom"
                tintColor="#FFFFFF"
                ratingBackgroundColor="#FFFFFF"
                ratingCount={5}
                imageSize={15}
                readonly
                startingValue={params.item.ratingValue}
              />
              <Text style={styles.reviews}>{params.item.reviews} reviews</Text>
            </View>
          </View>
          <View style={styles.imageLegend}>
            <Image style={styles.portrait} source={{ uri: params.item.user.account.photos[0] }} />

          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.textDescription} onPress={() => {
            setIsDescriptionDisplayed(!isDescriptionDisplayed)
          }}
            numberOfLines={isDescriptionDisplayed === false ? 3 : 0}
          >{params.item.description}</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: params.item.loc[1],
              longitude: params.item.loc[0],
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
          >
            <MapView.Marker
              key={params.item._id}
              coordinate={{
                latitude: params.item.loc[1],
                longitude: params.item.loc[0],
              }}
            // title={marker.title}
            // description={marker.description}
            />
          </MapView>
        </View>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  description: {
    flex: 1,
  },
  wrapper: {
    height: 350,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: 150,
    width: 350,
    backgroundColor: 'red',
    marginBottom: 20,
  },
  textDescription: {
    fontWeight: '300',
    fontSize: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pages: {
    flex: 1,
    backgroundColor: 'white',
  },
  imagesSwipper: {
    height: 350,
  },
  legend: {
    flex: 1,
  },
  price: {
    position: 'absolute',
    top: 260,
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    fontSize: 24,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    marginLeft: 20,
  },
  reviews: {
    fontSize: 18,
    color: '#9CA3AA',
    marginLeft: 20,
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
    marginRight: 30,
  },
  legend: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textLegend: {
    flexDirection: 'column',
    width: 270,
    flex: 1,
  },
});
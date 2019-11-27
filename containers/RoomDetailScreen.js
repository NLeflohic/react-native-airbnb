import React, { Component } from "react";
import { useRoute } from "@react-navigation/core";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";
import { Rating } from "react-native-ratings";
import MapView from "react-native-maps";
import Swiper from "react-native-swiper";

const SwiperComponent = ({ tabPhotos }) => {
  const tabView = [];
  for (let i = 0; i < tabPhotos.length; i++) {
    console.log(tabPhotos[i]);
    tabView.push(
      <View key={i}>
        <Image style={styles.imagesSwipper} source={{ uri: tabPhotos[i] }} />
      </View>
    );
  }
  return (
    <Swiper style={styles.wrapper} showsButtons={false}>
      {tabView}
    </Swiper>
  )
}

export default function RoomDetailScreen() {

  const { params } = useRoute();
  return (
    <View style={styles.pages}>
      {/* <Text>{JSON.stringify(params)}</Text> */}
      <SwiperComponent style={styles.images} tabPhotos={params.item.photos} />
      {/* <Image style={styles.images} source={{ uri: params.item.photos[0] }} /> */}
      <Text style={styles.price}>{params.item.price} €</Text>
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
          <Text style={styles.textDescription} numberOfLines={3}>{params.item.description}</Text>
          <MapView
            // La MapView doit obligatoirement avoir des dimensions
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
    </View >
  );
};

const styles = StyleSheet.create({
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
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
  images: {
    flex: 1,
  },
  imagesSwipper: {
    height: '100%',
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
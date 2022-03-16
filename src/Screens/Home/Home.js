//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Carousel from 'react-native-snap-carousel';
import * as homeActions from '../../redux/actions/home';
const Home = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [gridData, setgridData] = useState([]);
  useEffect(() => {
    getCarouselImages();
    getGridImages();
  }, []);

  const getCarouselImages = (
    endPoint = `?count=5&urls=true&httpsUrls=true`,
  ) => {
    homeActions
      .getImages(endPoint)
      .then(res => {
        console.log('res from leadscreen', res);
        setCarouselData(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getGridImages = (endPoint = `?count=20&urls=true&httpsUrls=true`) => {
    homeActions
      .getImages(endPoint)
      .then(res => {
        console.log('res from leadscreen', res);
        setgridData(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Carousel
          layout={'default'}
          useScrollView={true}
          data={carouselData}
          sliderWidth={400}
          itemWidth={400}
          renderItem={({item, index}) => {
            return (
              <View>
                <Image source={{uri: item}} style={styles.carouselImg} />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.MainContainer}>
        <FlatList
          data={gridData}
          renderItem={({item}) => (
            <View style={styles.GridViewBlockStyle}>
              <Image style={styles.img} source={{uri: item}} />
            </View>
          )}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  GridViewBlockStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',

    margin: 5,
  },
  img: {
    height: verticalScale(150),
    width: scale(150),
    borderRadius: moderateScale(10),
  },
  carouselImg: {
    height: 300,
    width: 300,
    margin: 10,
    borderRadius: 18,
  },
  container: {marginHorizontal: '5%', marginTop: '5%'},
});
export default Home;

import {HStack, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {w, Colors, h, IconAsset} from '../utils';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import EvilIconsIcon from 'react-native-vector-icons/dist/EvilIcons';

const CustomImageSlide = props => {
  var {imgList, thumbImgList, title, backLink, wishLink} = props;
  const IMG_SIZE = 80;
  const SPACING = 10;
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef();
  const thumbRef = useRef();
  const scrollToActiveIndex = index => {
    setActiveIndex(index);

    topRef?.current?.scrollToOffset({
      offset: index * w(100),
      animated: true,
    });
    if (index * (IMG_SIZE + SPACING) - IMG_SIZE / 2 > w(100) / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMG_SIZE + SPACING) - w(100) / 2 + IMG_SIZE / 2,
        animated: true,
      });
    }
  };

  return (
    <View>
      <FlatList
        ref={topRef}
        data={imgList}
        horizontal
        // ListHeaderComponent={headersection}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / w(100)),
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View style={{height: h(70), width: w(100)}}>
              <Image source={item.img} style={{height: h(70), width: w(100)}} />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={thumbImgList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{marginTop: -h(15)}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        renderItem={({item, index}) => {
          // console.log('AAAAAAAAAAa');
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToActiveIndex(index);
              }}>
              <Image
                source={item.img}
                style={{
                  height: IMG_SIZE,
                  width: IMG_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 3,
                  borderColor: activeIndex === index ? 'white' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CustomImageSlide;

const styles = StyleSheet.create({
  detailImg: {
    width: w(100),
    height: h(50),
  },
  imgBox: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 30,
    color: Colors.white,
    // margin: w(10),
    fontFamily: FontFamily.headingFont,
    textAlignVertical: 'center',
  },
});

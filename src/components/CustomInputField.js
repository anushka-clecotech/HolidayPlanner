import {VStack, Card, Button, HStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors, FontFamily, IconAsset, w} from '../utils';
import DropDown from 'react-native-paper-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';

const CustomInputField = props => {
  const [focus, setfocus] = useState(false);
  var {index, item, error, onGet, value, data} = props;
  const [showDropDown, setShowDropDown] = useState(false);
  // const [gender, setGender] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState();

  const genderList = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Others', value: 'others'},
  ];
  // console.log('WWWWWWWWw', focus);
  const openCamera = async () => {
    const result = await launchCamera(options);
    setPhoto(result.assets[0].uri);
    var imgIndex = data.findIndex(element => element.label === 'Image');

    // picDispatch()
  };
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    console.log(result.assets[0].uri, 'OOOOOOOOOO');
    setPhoto(result.assets[0].uri);
    var imgIndex = data.findIndex(element => element.label === 'Image');

    // picDispatch()
  };
  if (photo) {
    console.log(photo, 'photo');
    onGet(photo);
  }
  const UploadIMG = () => (
    <View>
      {photo ? (
        <View style={styles.uploadBox}>
          <Image source={{uri: photo}} style={styles.selectedIMG} />
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={openGallery}>
              <Text style={styles.fileBTN}>Choose File</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <View style={{flexDirection: 'row', marginLeft: w(5)}}>
                <Image source={IconAsset.camera} style={styles.cameraIcon} />
                <Text style={styles.cameraText}>Open Camera</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.uploadBox}>
          <View style={{flexDirection: 'column'}}>
            <Image source={IconAsset.upload} style={styles.ALTupload} />
            <Text style={styles.ATLtext}>No File Choosen</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity onPress={openGallery}>
                <Text style={styles.fileBTN}>Choose File</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openCamera}>
                <View style={{flexDirection: 'row', marginLeft: w(5)}}>
                  <Image source={IconAsset.camera} style={styles.cameraIcon} />
                  <Text style={styles.cameraText}>Open Camera</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
  return (
    <View key={index} style={{marginHorizontal: w(5), marginTop: w(5)}}>
      {item.identifier === 'gender' ? (
        <DropDown
          {...props}
          label={item.label}
          mode={'outlined'}
          outlineColor={Colors.gray1}
          setValue={value => {
            onGet(value);
          }}
          error={false}
          borderColor={Colors.ThemeColor}
          activeOutlineColor={Colors.ThemeColor}
          activeColor={Colors.ThemeColor}
          colorFocused={Colors.ThemeColor}
          value={item.value}
          list={genderList}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          theme={{
            colors: {
              background: 'white',
              onSurfaceVariant: item.value ? Colors.ThemeColor : Colors.black,
              onSurface: Colors.black,
            },
          }}
        />
      ) : item.identifier === 'date' ? (
        <View>
          {/* <Button onPress={() => setOpen(true)}>Date</Button> */}
          <TouchableOpacity
            onPress={() => {
              // console.log('fsdegvr', open);
              setOpen(!open);
            }}
            style={{
              // backgroundColor: 'red',
              paddingVertical: 15,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Colors.gray1,
            }}>
            <HStack justifyContent={'space-between'}>
              {item.value ? (
                <View style={{}}>
                  <View
                    style={{
                      marginTop: -25,
                      backgroundColor: Colors.white,
                      marginLeft: 25,
                      paddingHorizontal: 2,
                    }}>
                    <Text style={{color: Colors.ThemeColor}}>{item.label}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 2,
                      backgroundColor: Colors.white,
                      marginLeft: 10,
                      justifyContent: 'center',
                      // alignSelf: 'center',
                    }}>
                    <Text style={{color: Colors.black}}>
                      {moment(item.value).utc().format('DD/MMM/YY')}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={{color: Colors.black, paddingLeft: 10}}>
                    {item.label}
                  </Text>
                </View>
              )}
              <Text style={{marginLeft: 10, color: Colors.black}}></Text>
              <Image
                source={IconAsset.calenderIcon}
                style={{height: 20, width: 20, marginRight: w(5)}}
              />
            </HStack>
          </TouchableOpacity>
          <DatePicker
            {...props}
            modal
            mode={'date'}
            open={open}
            date={date}
            onCancel={() => {
              setOpen(false);
            }}
            onConfirm={date => {
              onGet(date.toISOString());
            }}
            title={'Trip Start Date'}
            // textColor={{color: Colors.ThemeColor}}
          />
        </View>
      ) : item.identifier === 'image' ? (
        <View>
          <UploadIMG />
        </View>
      ) : (
        <FloatingLabelInput
          {...props}
          label={item.label}
          isPassword={
            item.identifier === 'pass' || item.identifier === 'cpass'
              ? true
              : false
          }
          maxLength={item.length}
          keyboardType={item.keyboard}
          value={item.value}
          staticLabel={focus}
          onFocus={value => setfocus(true)}
          onChangeText={value => onGet(value)}
          customShowPasswordComponent={
            <MaterialCommunityIcons
              name={'eye'}
              size={20}
              color={Colors.black}
              style={{padding: 10}}
            />
          }
          customHidePasswordComponent={
            <MaterialCommunityIcons
              name={'eye-off'}
              size={20}
              color={Colors.black}
              style={{padding: 10}}
            />
          }
          customLabelStyles={{
            colorFocused: Colors.ThemeColor,
            colorBlurred: Colors.black,
            fontSizeFocused: 12,
          }}
          hintTextColor={Colors.gray1}
          hint="Please Enter Here"
          containerStyles={{
            borderWidth: 1,
            paddingHorizontal: 5,
            backgroundColor: '#fff',
            borderColor: Colors.gray1,
            borderRadius: 8,
            marginTop: 4,
          }}
          labelStyles={{
            backgroundColor: '#fff',
            paddingHorizontal: 5,
            justifyContent: 'center',
            // height: 30,
            color: 'red',
            // paddingVertical: -10,
            // marginTop: -10,
          }}
          inputStyles={{
            color: Colors.black,
            paddingHorizontal: 10,
          }}
        />
      )}
      {error ? (
        <VStack mt={1}>
          <Text style={styles.error}>{item.error}</Text>
        </VStack>
      ) : null}
    </View>
  );
};

export default CustomInputField;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 11,
    fontFamily: FontFamily.regular,
  },
  selectedIMG: {
    height: w(30),
    width: w(30),
    justifyContent: 'space-between',
    marginTop: w(10),
    marginLeft: w(5),
  },
  uploadBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    width: w(90),
    height: w(50),
  },
  ATLuploadBox: {
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    width: w(90),
    height: w(50),
  },
  ALTupload: {
    justifyContent: 'space-between',
    marginTop: w(10),
    marginLeft: w(10),
    height: w(15),
    width: w(20),
  },
  ATLtext: {
    marginTop: w(5),
    marginLeft: w(10),
  },
  fileBTN: {
    textAlign: 'center',
    backgroundColor: '#D3D3D3',
    width: w(30),
    height: w(8),
    marginTop: w(10),
    marginLeft: w(10),
  },
  cameraIcon: {
    width: w(8),
    height: w(8),
    //marginLeft:w(15),
    marginTop: w(5),
  },
  cameraText: {
    marginLeft: w(5),
    marginTop: w(7),
  },
});

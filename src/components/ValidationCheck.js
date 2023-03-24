import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ValidationCheck = props => {
  var {data} = props;
  var check = 'true';
  data.forEach((element, index) => {
    if (isEmpty(element.value)) {
      check = 'false';
      dispatch(
        onGetError({
          error: 'Please Provide ' + element.label,
          index,
        }),
      );
    } else if (element.validation) {
      if (element.validation === 'mobile') {
        var testmob = validateMob(element.value);
        if (!testmob) {
          check = 'false';
          dispatch(
            onGetError({
              error: 'Please Provide Valid Contact Number',
              index,
            }),
          );
        } else {
          check === 'true';
        }
      }
      if (element.validation === 'year') {
        console.log(element.value, 'YEARRRRRRRRR');
        if (element.value > currentYear || element.value < 1900) {
          check = 'false';
          dispatch(
            onGetError({
              error: 'Please Provide Valid Year',
              index,
            }),
          );
        } else {
          check === 'true';
        }
      }
    }
  });
  console.log(check, 'check');
  if (check === 'true') {
    doOrganizerSignup();
    validationCheck(true);
  }

  return (
    <View>
      <Text>ValidationCheck</Text>
    </View>
  );
};

export default ValidationCheck;

const styles = StyleSheet.create({});

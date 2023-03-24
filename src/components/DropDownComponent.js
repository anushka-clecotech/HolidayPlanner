import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
// import RBSheet from 'react-native-raw-bottom-sheet';
import {h, w} from '../utils';
const DropDownComponent = ({onshowDropdown, showDropDown, innerItem}) => {
  const refRBSheet = React.useRef(null);
  useEffect(() => {
    if (showDropDown) {
      refRBSheet.current.open();
    } else {
    }
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: styles.wrapperStyle,
          container: styles.containerStyle,
          draggableIcon: styles.draggableIcon,
        }}
        onClose={() => onshowDropdown(false)}>
        {innerItem}
      </RBSheet> */}
    </SafeAreaView>
  );
};

export default DropDownComponent;
const styles = StyleSheet.create({
  wrapperStyle: {backgroundColor: '#00000061', blur: true},
  containerStyle: {
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,

    paddingHorizontal: w(4),
    height: h(45),
  },
  draggableIcon: {
    backgroundColor: '#878787',
    width: w(20),
    opacity: 0.1,
  },
});

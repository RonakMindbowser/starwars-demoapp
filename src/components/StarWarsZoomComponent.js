import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Colors from '../theme/Colors';
import imageConstants from '../res';

const StarWarsZoomComponent = ({isVisible, onClose, charData}) => {
  return (
    <Modal
      transparent={true}
      isVisible={isVisible}
      useNativeDriverForBackdrop
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      style={styles.modalStyle}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      onModalHide={onClose}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.headerWrap}>
            <View style={styles.leftWrap}>
              <ImageBackground
                source={imageConstants.cardPlaceHolderImage}
                imageStyle={styles.smallImage}
                style={styles.smallImage}>
                <Image
                  style={styles.smallImage}
                  source={{
                    uri: charData?.url,
                  }}
                />
              </ImageBackground>
              <Text style={styles.title}>{charData?.name}</Text>
            </View>
            <TouchableOpacity style={styles.rightWrap} onPress={onClose}>
              <Image source={imageConstants.closeIcon} />
            </TouchableOpacity>
          </View>
          <ImageBackground
            source={imageConstants.cardPlaceHolderImage}
            style={styles.imageView}
            imageStyle={styles.imageView}>
            <Image source={{uri: charData?.url}} style={styles.imageView} />
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default StarWarsZoomComponent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.modal_bg_color,
    justifyContent: 'center',
  },
  modalStyle: {margin: 0, flex: 1},
  subContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  imageView: {
    height: 400,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  smallImage: {
    height: 30,
    width: 30,
    borderRadius: 60,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '700',
    marginLeft: 10,
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

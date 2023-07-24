import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Colors from '../theme/Colors';
import {screenHeight, screenWidth} from '../utils/Metrics';
import {useSelector} from 'react-redux';
import imageConstants from '../res';
import Strings from '../utils/Strings';
import {getFormattedDate, getFormattedString} from '../utils/Validations';

const StarWarsCharDetailsModelComponent = ({isVisible, onClose}) => {
  const charDetailState = useSelector(state => state.charDetail);
  const homeworldState = useSelector(state => state.homeWorldDetail);
  let {charData} = charDetailState;
  let {homeWorldData} = homeworldState;

  const renderHeadingAndValue = (title, value) => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      isVisible={isVisible}
      useNativeDriverForBackdrop
      backdropOpacity={0.5}
      onModalHide={onClose}
      deviceWidth={screenWidth}
      avoidKeyboard
      deviceHeight={screenHeight}
      style={styles.modalStyle}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.topWrap}>
            <View />
            <Text style={styles.title}>{charData?.name}</Text>
            <TouchableOpacity style={styles.rightWrap} onPress={onClose}>
              <Image source={imageConstants.closeIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.middleWrap}>
              {renderHeadingAndValue(
                Strings.height,
                `${
                  charData?.height ? parseInt(charData?.height) / 100 : 'N/A'
                } ${Strings.meters}`,
              )}
              {renderHeadingAndValue(
                Strings.mass,
                `${charData?.mass ? charData?.mass : 'N/A'} ${Strings.kg}`,
              )}
              {renderHeadingAndValue(
                Strings.creationDate,
                getFormattedDate(charData?.created),
              )}
              {renderHeadingAndValue(
                Strings.numberOfFilms,
                charData?.films?.length,
              )}
              {renderHeadingAndValue(Strings.birthYear, charData?.birth_year)}
              {renderHeadingAndValue(
                Strings.homeWorldName,
                homeWorldData?.name
                  ? getFormattedString(homeWorldData?.name)
                  : 'N/A',
              )}
              {renderHeadingAndValue(
                Strings.terrain,
                homeWorldData?.terrain
                  ? getFormattedString(homeWorldData?.terrain)
                  : 'N/A',
              )}
              {renderHeadingAndValue(
                Strings.climate,
                homeWorldData?.climate
                  ? getFormattedString(homeWorldData?.climate)
                  : 'N/A',
              )}
              {renderHeadingAndValue(
                Strings.amountOfResidents,
                homeWorldData?.residents?.length,
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default StarWarsCharDetailsModelComponent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.modal_bg_color,
    justifyContent: 'flex-end',
  },
  modalStyle: {margin: 0},
  subContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    maxHeight: screenHeight / 1.7,
  },
  topWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  rightWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: '700',
  },
  middleWrap: {
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.blueGrey,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryText,
    paddingTop: 5,
  },
  wrapper: {
    paddingTop: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
});

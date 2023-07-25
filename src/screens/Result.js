import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Header,
  Loader,
  StarWarsCardComponent,
  StarWarsCharDetailsModelComponent,
  StarWarsZoomComponent,
} from '../components';
import Colors from '../theme/Colors';
import Strings from '../utils/Strings';
import {useRoute} from '@react-navigation/native';
import {requestCompleted, requestStarted} from '../redux/slices/appSlice';
import {charDetailReset, getCharDetails} from '../redux/slices/charDetailSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  getHomeWorldDetails,
  homeWorldReset,
} from '../redux/slices/homeWorldSlice';

const Result = () => {
  const route = useRoute();
  const {result} = route?.params;
  const [isZoomModelVisible, setIsZoomModelVisible] = useState(false);
  const [charData, setCharData] = useState(null);

  const [isCharDetailModelVisible, setIsCharDetailModelVisible] =
    useState(false);
  const appState = useSelector(state => state.app);

  const dispatch = useDispatch();

  const renderCharListItem = ({item, index}) => {
    return (
      <StarWarsCardComponent
        {...item}
        onLongPress={url => onCharLongPress(url, item)}
        onPress={url => onCharPress(url, item)}
        index={index}
      />
    );
  };
  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>{Strings.noRecordFound}</Text>
      </View>
    );
  };

  const onCharLongPress = (url, item) => {
    setCharData({...item, url});
    setIsZoomModelVisible(true);
  };

  const onModelClose = () => {
    setIsZoomModelVisible(false);
    setCharData(null);
  };

  const onCharPress = (url, item) => {
    setCharData({...item, url});
    dispatch(requestStarted());
    dispatch(charDetailReset());
    dispatch(homeWorldReset());
    dispatch(getCharDetails({url: item?.url}));
    dispatch(getHomeWorldDetails({url: item?.homeworld}));
    setTimeout(() => {
      setIsCharDetailModelVisible(true);
      dispatch(requestCompleted());
    }, 3000);
  };
  const onCharDetailModelClose = () => {
    setIsCharDetailModelVisible(false);
    setCharData(null);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Header title={Strings.result} />
      <FlatList
        data={result}
        keyExtractor={(i, j) => j.toString()}
        extraData={result}
        showsVerticalScrollIndicator={false}
        renderItem={renderCharListItem}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={renderEmptyComponent}
      />

      <StarWarsZoomComponent
        isVisible={isZoomModelVisible}
        onClose={onModelClose}
        charData={charData}
      />
      <StarWarsCharDetailsModelComponent
        isVisible={isCharDetailModelVisible}
        onClose={onCharDetailModelClose}
        charData={charData}
      />
      {appState?.loading ? <Loader /> : null}
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    color: Colors.blueGrey,
  },
});

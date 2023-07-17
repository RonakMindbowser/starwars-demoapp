import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPeopleList} from '../redux/slices/peopleListSlice';
import {isEmptyOrNull} from '../utils/Validations';
import {StarWarsCardComponent, StarWarsZoomComponent} from '../components';

const Home = () => {
  const [starWarsCharList, setStarWarsCharList] = useState([]);
  const dispatch = useDispatch();
  const peopleListState = useSelector(state => state.peopleList);
  console.log('peopleListState-->', peopleListState);

  const [isZoomModelVisible, setIsZoomModelVisible] = useState(false);
  const [imageZoomData, setImageZoomData] = useState('');

  useEffect(() => {
    dispatch(getAllPeopleList());
  }, []);

  useEffect(() => {
    if (
      !isEmptyOrNull(peopleListState?.peopleList) &&
      peopleListState?.peopleList?.length
    )
      if (starWarsCharList.length) {
        setStarWarsCharList([
          ...starWarsCharList,
          ...peopleListState?.peopleList,
        ]);
      } else {
        setStarWarsCharList([...peopleListState?.peopleList]);
      }
  }, [peopleListState?.peopleList]);

  const handleOnEndReached = () => {
    if (!isEmptyOrNull(peopleListState?.nextLink)) {
      const params = {
        nextUrl: peopleListState?.nextLink,
      };
      dispatch(getAllPeopleList(params));
    }
  };

  const renderCharListItem = ({item, index}) => {
    return (
      <StarWarsCardComponent
        {...item}
        onLongPress={url => onLongPress(url, item)}
      />
    );
  };

  const onLongPress = (url, item) => {
    setImageZoomData({...item, url});
    setIsZoomModelVisible(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <FlatList
        data={starWarsCharList}
        extraData={starWarsCharList}
        showsVerticalScrollIndicator={false}
        renderItem={renderCharListItem}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.9}
      />
      <SafeAreaView />
      <StarWarsZoomComponent
        isVisible={isZoomModelVisible}
        onClose={() => setIsZoomModelVisible(false)}
        imageData={imageZoomData}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
});

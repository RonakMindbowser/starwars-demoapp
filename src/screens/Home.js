import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPeopleList} from '../redux/slices/peopleListSlice';
import {isEmptyOrNull} from '../utils/Validations';
import {StarWarsCardComponent} from '../components';

const Home = () => {
  const [starWarsCharList, setStarWarsCharList] = useState([]);
  const dispatch = useDispatch();
  const peopleListState = useSelector(state => state.peopleList);

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

  const renderCharListItem = ({item, index}) => {
    return <StarWarsCardComponent />;
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
      />
      <SafeAreaView />
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

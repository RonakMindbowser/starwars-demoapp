import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllPeopleList,
  peopleListReset,
} from '../redux/slices/peopleListSlice';
import {isEmptyOrNull} from '../utils/Validations';
import {
  Loader,
  StarWarsCardComponent,
  StarWarsCharDetailsModelComponent,
  StarWarsZoomComponent,
} from '../components';
import Colors from '../theme/Colors';
import {charDetailReset, getCharDetails} from '../redux/slices/charDetailSlice';
import {
  getHomeWorldDetails,
  homeWorldReset,
} from '../redux/slices/homeWorldSlice';
import Strings from '../utils/Strings';

const Home = () => {
  const [starWarsCharList, setStarWarsCharList] = useState([]);
  const dispatch = useDispatch();
  const peopleListState = useSelector(state => state.peopleList);
  const appState = useSelector(state => state.app);
  console.log('peopleListState-->', peopleListState);

  const [isZoomModelVisible, setIsZoomModelVisible] = useState(false);
  const [charData, setCharData] = useState(null);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [isCharDetailModelVisible, setIsCharDetailModelVisible] =
    useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(getAllPeopleList());
  }, []);

  useEffect(() => {
    if (
      !isEmptyOrNull(peopleListState?.peopleList) &&
      peopleListState?.peopleList?.length
    ) {
      if (starWarsCharList.length) {
        setStarWarsCharList([
          ...starWarsCharList,
          ...peopleListState?.peopleList,
        ]);
      } else {
        setStarWarsCharList([...peopleListState?.peopleList]);
      }
      setIsPaginationLoading(false);
      setRefreshing(false);
    }
  }, [peopleListState?.peopleList]);

  const handleOnEndReached = () => {
    if (!isEmptyOrNull(peopleListState?.nextLink)) {
      const params = {
        nextUrl: peopleListState?.nextLink,
        isPagination: true,
      };
      setIsPaginationLoading(true);
      dispatch(getAllPeopleList(params));
    }
  };

  const onCharLongPress = (url, item) => {
    setCharData({...item, url});
    setIsZoomModelVisible(true);
  };

  const onModelClose = () => {
    setIsZoomModelVisible(false);
    setCharData(null);
  };

  const onRefresh = () => {
    setSearchValue('');
    setRefreshing(true);
    setStarWarsCharList([]);
    dispatch(getAllPeopleList());
  };

  const onCharPress = (url, item) => {
    setCharData({...item, url});
    dispatch(charDetailReset());
    dispatch(homeWorldReset());
    dispatch(getCharDetails({url: item?.url}));
    dispatch(getHomeWorldDetails({url: item?.homeworld}));
    setTimeout(() => {
      setIsCharDetailModelVisible(true);
    }, 500);
  };

  const renderFooter = () => {
    if (!isPaginationLoading) return null;

    return (
      <View style={styles.footerWrap}>
        <ActivityIndicator color={Colors.blueGrey} size={'large'} />
      </View>
    );
  };

  const renderCharListItem = ({item, index}) => {
    return (
      <StarWarsCardComponent
        {...item}
        onLongPress={url => onCharLongPress(url, item)}
        onPress={url => onCharPress(url, item)}
      />
    );
  };

  const onCharDetailModelClose = () => {
    setIsCharDetailModelVisible(false);
    setCharData(null);
  };

  const onSearchValueChange = text => {
    setSearchValue(text);
    setStarWarsCharList([]);
    dispatch(peopleListReset());
    if (!isEmptyOrNull(text)) {
      dispatch(
        getAllPeopleList({
          isSearch: true,
          value: text,
        }),
      );
    } else {
      dispatch(getAllPeopleList());
    }
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>{Strings.noRecordFound}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.searchWrap}>
        <TextInput
          placeholder={Strings.search}
          onSubmitEditing={() => Keyboard.dismiss()}
          returnKeyType={'done'}
          value={searchValue}
          onChangeText={onSearchValueChange}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={starWarsCharList}
        keyExtractor={(i, j) => j.toString()}
        extraData={starWarsCharList}
        showsVerticalScrollIndicator={false}
        renderItem={renderCharListItem}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.01}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            enabled
            onRefresh={onRefresh}
            tintColor={Colors.blueGrey}
          />
        }
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
    flexGrow: 1,
  },
  footerWrap: {
    paddingVertical: 15,
  },
  searchWrap: {
    paddingHorizontal: 15,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    marginBottom: 10,
  },
  searchInput: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
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

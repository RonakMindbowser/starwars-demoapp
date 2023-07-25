import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
import {requestCompleted, requestStarted} from '../redux/slices/appSlice';
import imageConstants from '../res';
import NavigationService from '../navigation/NavigationService';
import {routeNames} from '../utils/RouteNames';

const Home = () => {
  const [starWarsCharList, setStarWarsCharList] = useState([]);
  const dispatch = useDispatch();
  const peopleListState = useSelector(state => state.peopleList);
  const appState = useSelector(state => state.app);

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
      let list = [];
      if (starWarsCharList.length) {
        list = [...starWarsCharList, ...peopleListState?.peopleList];
      } else {
        list = [...peopleListState?.peopleList];
      }
      setStarWarsCharList([...list]);

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
        index={index}
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
    if (appState?.loading) return null;
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>{Strings.noRecordFound}</Text>
      </View>
    );
  };

  const onPressFilter = () => {
    let homeWorldFilterList = [];
    let filmFilterList = [];
    let speicesFilterList = [];
    let starShipFilterList = [];
    starWarsCharList.map(obj => {
      if (!isEmptyOrNull(obj?.homeworld)) {
        let isAlreadyExist = homeWorldFilterList.find(
          item => item?.url == obj?.homeworld,
        );
        if (!isAlreadyExist) {
          homeWorldFilterList.push({
            url: obj?.homeworld,
          });
        }
      }
      if (!isEmptyOrNull(obj?.films) && [...obj?.films].length) {
        obj?.films?.map(film => {
          let isAlreadyExist = filmFilterList.find(item => item?.url == film);
          if (!isAlreadyExist) {
            filmFilterList.push({
              url: film,
            });
          }
        });
      }
      if (!isEmptyOrNull(obj?.species) && [...obj?.species].length) {
        obj?.species?.map(specie => {
          let isAlreadyExist = speicesFilterList.find(
            item => item?.url == specie,
          );
          if (!isAlreadyExist) {
            speicesFilterList.push({
              url: specie,
            });
          }
        });
      }
      if (!isEmptyOrNull(obj?.starships) && [...obj?.starships].length) {
        obj?.starships?.map(ship => {
          let isAlreadyExist = starShipFilterList.find(
            item => item?.url == ship,
          );
          if (!isAlreadyExist) {
            starShipFilterList.push({
              url: ship,
            });
          }
        });
      }
    });
    NavigationService.navigate(routeNames.filter, {
      homeWorldFilterList,
      filmFilterList,
      speicesFilterList,
      starShipFilterList,
      starWarsCharList,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.topWrap}>
        <View style={styles.searchWrap}>
          <TextInput
            placeholder={Strings.search}
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType={'done'}
            value={searchValue}
            onChangeText={onSearchValueChange}
            style={styles.searchInput}
            placeholderTextColor={Colors.blueGrey}
          />
        </View>
        <TouchableOpacity onPress={onPressFilter}>
          <Image
            source={imageConstants.filter}
            style={styles.filerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  footerWrap: {
    paddingVertical: 15,
  },
  searchWrap: {
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 10,
    height: 40,
    paddingLeft: 10,
    flex: 0.95,
  },
  searchInput: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
    height: 40,
    padding: 0,
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
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  filerIcon: {
    height: 30,
    width: 30,
  },
});

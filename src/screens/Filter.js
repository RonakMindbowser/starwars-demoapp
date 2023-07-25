import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../theme/Colors';
import Strings from '../utils/Strings';
import {ButtonComponent, Header} from '../components';
import {useRoute} from '@react-navigation/native';
import HTTPService from '../networkConfig/HttpServices';
import imageConstants from '../res';
import NavigationService from '../navigation/NavigationService';
import {routeNames} from '../utils/RouteNames';

const Filter = () => {
  const route = useRoute();
  const {
    homeWorldFilterList,
    filmFilterList,
    speicesFilterList,
    starShipFilterList,
    starWarsCharList,
  } = route?.params;

  const [homeWorldLocalList, setHomeWorldLocalList] = useState([]);
  const [filmLocalList, setFilmLocalList] = useState([]);
  const [speciesLocalList, setSpeciesLocalList] = useState([]);
  const [starShipLocalList, setStarShipLocalList] = useState([]);

  useEffect(() => {
    getHomeWorldListApi();
    getFilmListApi();
    getSpeciesListApi();
    getStarShipListApi();
  }, []);

  const getHomeWorldListApi = async () => {
    if ([...homeWorldFilterList].length) {
      let homeWolrdData = await getListFromApi(homeWorldFilterList);
      if (homeWolrdData?.success) {
        setHomeWorldLocalList([...homeWolrdData.response]);
      }
    }
  };

  const getFilmListApi = async () => {
    if ([...filmFilterList].length) {
      let filmData = await getListFromApi(filmFilterList, 'title');
      if (filmData?.success) {
        setFilmLocalList([...filmData.response]);
      }
    }
  };

  const getSpeciesListApi = async () => {
    if ([...speicesFilterList].length) {
      let speicesData = await getListFromApi(speicesFilterList);
      if (speicesData?.success) {
        setSpeciesLocalList([...speicesData.response]);
      }
    }
  };

  const getStarShipListApi = async () => {
    if ([...starShipFilterList].length) {
      let starShipData = await getListFromApi(starShipFilterList);
      if (starShipData?.success) {
        setStarShipLocalList([...starShipData.response]);
      }
    }
  };

  const getListFromApi = (list, key) => {
    if ([...list].length) {
      let response = list?.map(async obj => {
        return HTTPService.getRequest(obj?.url);
      });
      return new Promise((resolve, reject) => {
        Promise.all(response)
          .then(items => {
            let requiredList = [...items]?.map(obj => {
              return {
                url: obj?.url,
                title: key ? obj[key] : obj?.name,
              };
            });
            resolve({
              success: true,
              response: requiredList,
            });
          })
          .catch(error => {
            reject({
              success: false,
              error,
            });
          });
      });
    }
  };

  const onPressItemHomeWorld = (item, index, value) => {
    let list = homeWorldLocalList;
    list[index].selected = value;
    setHomeWorldLocalList([...list]);
  };

  const renderListItemHomeWorld = ({item, index}) => {
    return (
      <RenderCard
        item={item}
        index={index}
        onPress={(item, index, value) =>
          onPressItemHomeWorld(item, index, value)
        }
      />
    );
  };

  const RenderCard = ({item, index, onPress}) => {
    let selected = item?.selected;
    return (
      <TouchableOpacity
        style={styles.itemWrap}
        onPress={() => onPress(item, index, !selected)}>
        <Text style={styles.itemTitle}>{item?.title}</Text>
        <View
          style={[
            styles.box,
            selected ? {backgroundColor: Colors.blueGrey} : {},
          ]}>
          {selected ? (
            <Image
              source={imageConstants.check}
              style={styles.checkIcon}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const onPressItemFilms = (item, index, value) => {
    let list = filmLocalList;
    list[index].selected = value;
    setFilmLocalList([...list]);
  };

  const renderListItemFilms = ({item, index}) => {
    return (
      <RenderCard
        item={item}
        index={index}
        onPress={(item, index, value) => onPressItemFilms(item, index, value)}
      />
    );
  };

  const onPressItemSpecies = (item, index, value) => {
    let list = speciesLocalList;
    list[index].selected = value;
    setSpeciesLocalList([...list]);
  };

  const renderListItemSpecies = ({item, index}) => {
    return (
      <RenderCard
        item={item}
        index={index}
        onPress={(item, index, value) => onPressItemSpecies(item, index, value)}
      />
    );
  };

  const onPressItemStarShip = (item, index, value) => {
    let list = starShipLocalList;
    list[index].selected = value;
    setStarShipLocalList([...list]);
  };

  const renderListItemStarShip = ({item, index}) => {
    return (
      <RenderCard
        item={item}
        index={index}
        onPress={(item, index, value) =>
          onPressItemStarShip(item, index, value)
        }
      />
    );
  };

  const renderTitleAndList = (title, list, renderItem) => {
    return (
      <View style={styles.innerWrap}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={list}
          extraData={list}
          bounces={false}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  };

  const onPressApply = () => {
    let list = starWarsCharList;
    let selectedHomeWorld = homeWorldLocalList.filter(obj => obj?.selected);
    let selectedFilms = filmLocalList.filter(obj => obj?.selected);
    let selectedSpecies = speciesLocalList.filter(obj => obj?.selected);
    let selectedStarship = starShipLocalList.filter(obj => obj?.selected);

    let filteredList = [];
    let filteredList2 = [];
    let filteredList3 = [];
    let filteredList4 = [];
    if (
      selectedHomeWorld.length ||
      selectedFilms.length ||
      selectedSpecies.length ||
      selectedStarship.length
    ) {
      if (selectedHomeWorld.length) {
        list?.map(obj => {
          let isAvailable = selectedHomeWorld?.find(
            item => item?.url == obj?.homeworld,
          );
          if (isAvailable) {
            filteredList.push(obj);
          }
        });
      } else {
        filteredList = [...list];
      }

      if (selectedFilms.length) {
        filteredList?.map(obj => {
          let isAvailable = selectedFilms?.find(item =>
            [...obj?.films]?.includes(item?.url),
          );
          if (isAvailable) {
            filteredList2.push(obj);
          }
        });
      } else {
        filteredList2 = [...filteredList];
      }

      if (selectedSpecies.length) {
        filteredList2?.map(obj => {
          let isAvailable = selectedSpecies?.find(item =>
            [...obj?.species]?.includes(item?.url),
          );
          if (isAvailable) {
            filteredList3.push(obj);
          }
        });
      } else {
        filteredList3 = [...filteredList2];
      }

      if (selectedStarship.length) {
        filteredList3?.map(obj => {
          let isAvailable = selectedStarship?.find(item =>
            [...obj?.starships]?.includes(item?.url),
          );
          if (isAvailable) {
            filteredList4.push(obj);
          }
        });
      } else {
        filteredList4 = [...filteredList3];
      }
    } else {
      filteredList4 = [...list];
    }
    NavigationService.navigate(routeNames.result, {
      result: filteredList4,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Header title={Strings.filter} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderTitleAndList(
          Strings.homeWold,
          homeWorldLocalList,
          renderListItemHomeWorld,
        )}
        {renderTitleAndList(Strings.films, filmLocalList, renderListItemFilms)}
        {renderTitleAndList(
          Strings.species,
          speciesLocalList,
          renderListItemSpecies,
        )}
        {renderTitleAndList(
          Strings.starShips,
          starShipLocalList,
          renderListItemStarShip,
        )}
        <ButtonComponent title={Strings.apply} onPress={onPressApply} />
      </ScrollView>
      <SafeAreaView />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
  },
  innerWrap: {
    paddingVertical: 15,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  itemWrap: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 14,
    color: Colors.primaryText,
  },
  box: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    height: 18,
    width: 18,
    tintColor: Colors.white,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
});

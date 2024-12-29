import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import AutoSuggest from '../AutoSuggest';
import DropDown from '../DropDown';
import {
  getSearchValue,
  getWeatherForecast,
} from '../../containers/HomeScreen/reducer';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {SEARCH, SEARCH_ICON} from '../../utils/constants';
import debounce from 'lodash.debounce';

const Header = () => {
  const [searchVisibility, setSearchVisibility] = useState(false);

  const dispatch = useDispatch();

  const {searchValue, noOfDays, searchLoading} = useSelector(
    state => ({
      searchValue: state.homeScreen.searchValue,
      noOfDays: state.homeScreen.noOfdays,
      searchLoading: state.homeScreen.searchLoading,
    }),
    shallowEqual,
  );

  // Toggle search visibility
  const toggleSearchVisibility = () => {
    setSearchVisibility(prev => !prev);
  };

  const debouncedSearch = debounce(value => {
    dispatch(getSearchValue(value));
  }, 500);

  const handleSearchInput = value => {
    if (value.length >= 0) {
      debouncedSearch(value);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = value => {
    const queryObject = {
      q: `${value?.region}, ${value?.country}`,
      days: noOfDays,
    };
    setSearchVisibility(false);
    dispatch(getWeatherForecast(queryObject));
  };

  return (
    <View style={styles.header}>
      {searchVisibility ? (
        <AutoSuggest
          onChangeText={handleSearchInput}
          data={searchValue}
          onSelectSuggestion={handleSuggestionSelect}
          containerStyle={styles.autoSuggestContainer}
          inputStyle={styles.autoSuggestInput}
          suggestionStyle={styles.autoSuggestSuggestion}
          loading={searchLoading}
          dismissSuggestionsParent={toggleSearchVisibility}
        />
      ) : (
        <TouchableOpacity onPress={toggleSearchVisibility}>
          <View style={styles.headerIcons}>
            <View style={styles.searchSection}>
              <Text style={styles.icon}>{SEARCH_ICON}</Text>
              <Text style={styles.icon}>{SEARCH}</Text>
            </View>
            <DropDown />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    // marginTop: Platform.OS == 'ios' ? 0 : 30,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    fontSize: 18,
    color: '#FFF',
  },
  autoSuggestContainer: {
    marginTop: 10,
  },
  autoSuggestInput: {
    borderColor: 'blue',
  },
  autoSuggestSuggestion: {
    color: 'blue',
  },
});

export default Header;

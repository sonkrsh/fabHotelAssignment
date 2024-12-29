import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearSearchValue} from '../../containers/HomeScreen/reducer';

const AutoSuggest = ({
  data,
  inputProps = {},
  containerStyle,
  inputStyle,
  suggestionStyle,
  suggestionContainerStyle,
  onSelectSuggestion,
  onChangeText,
  loading = false,
  dismissSuggestionsParent,
}) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = text => {
    setQuery(text);
    setShowSuggestions(text.trim() !== ''); // Show suggestions if text isn't empty
    if (text.trim() === '') {
      dispatch(clearSearchValue([]));
    } else {
      onChangeText(text);
    }
  };

  const handleSuggestionSelect = value => {
    console.log('==value', value);

    setQuery(value);
    dispatch(clearSearchValue([]));
    setShowSuggestions(false); // Hide suggestions after selection

    if (onSelectSuggestion) {
      onSelectSuggestion(value);
    }
  };

  const clearInput = () => {
    setQuery('');
    setShowSuggestions(false); // Hide suggestions
    dispatch(clearSearchValue([]));
    dismissSuggestionsParent();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={query}
          onChangeText={handleInputChange}
          placeholderTextColor="white"
          // onSubmitEditing={() => handleSuggestionSelect({region: query})}
          onFocus={() => setShowSuggestions(true)}
          {...inputProps}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        )}
        {query.length === 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        )}
      </View>

      {showSuggestions && (
        <View style={[styles.suggestionContainer, suggestionContainerStyle]}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="gray" />
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleSuggestionSelect(item)}
                  style={styles.suggestionItem}>
                  <Text style={[styles.suggestionText, suggestionStyle]}>
                    {`Region: ${item?.region} | Country: ${item?.country}`}
                  </Text>
                </TouchableOpacity>
              )}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: 'white',
    paddingRight: 30, // Add space for clear button
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}], // Center the button vertically
    zIndex: 1,
  },
  clearText: {
    fontSize: 20,
    color: 'white',
  },
  closeText: {
    fontSize: 14,
    color: 'white',
  },
  suggestionContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderRadius: 5,
    maxHeight: 150,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    fontSize: 16,
  },
  loaderContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AutoSuggest;

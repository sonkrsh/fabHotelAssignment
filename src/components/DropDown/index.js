import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {setNoOFDays} from '../../containers/HomeScreen/reducer';
import {DAYS_OPTIONS} from '../../utils/constants';

const WeatherUI = () => {
  const dispatch = useDispatch();
  const {noOfdays} = useSelector(
    state => ({
      noOfdays: state.homeScreen.noOfdays,
    }),
    shallowEqual,
  );

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelectOption = value => {
    dispatch(setNoOFDays(value));
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownVisible(true)}>
        <Text style={styles.dropdownText}>{`${noOfdays} Days`}</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={dropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Days</Text>

            <FlatList
              data={DAYS_OPTIONS}
              keyExtractor={item => item.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectOption(item)}>
                  <Text style={styles.optionText}>{`${item} Days`}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: '#121212',
  },

  icon: {
    fontSize: 18,
    color: '#FFF',
  },
  dropdown: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
  },
  dropdownText: {
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
});

export default WeatherUI;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../Animation/Colors';

export default AddMoviePlanModal = ({handleTodoVisible, addMoviePlanList}) => {
  // Define Colors
  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    '#595BD9',
    '#8022D9',
    '#D159D8',
    '#D85963',
    '#D88559',
  ];

  const [getSelectedColor, setSelectedColor] = React.useState(
    backgroundColors[0],
  );

  const [getName, setName] = React.useState('');

  // Create Movie Plan's ToDo List
  const createToDo = () => {
    const [name, color] = [getName, getSelectedColor];

    const list = {name, color};
    addMoviePlanList(list);
    setName('');
    handleTodoVisible();
  };

  // Render Colors
  const renderColors = () => {
    return backgroundColors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, {backgroundColor: color}]}
          onPress={() => setSelectedColor(color)}
        />
      );
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{position: 'absolute', top: 64, right: 32}}
        onPress={handleTodoVisible}>
        <Icon name="close" size={24} color={COLORS.black} />
      </TouchableOpacity>

      <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
        <Text style={styles.title}>Create Movie Plan List</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter The List Name"
          onChangeText={text => setName(text)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          {renderColors()}
        </View>
        <TouchableOpacity
          style={[styles.create, {backgroundColor: getSelectedColor}]}
          onPress={createToDo}>
          <Text style={{color: COLORS.white, fontWeight: '600'}}>Create!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.black,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

/* Reference: https://reactnative.dev/
              https://www.npmjs.com/
              https://firebase.google.com/docs?authuser=0&hl=en
              https://www.youtube.com/@DesignIntoCode
              https://www.youtube.com/watch?v=0c0v_40MPq8&t=366s
              https://www.youtube.com/watch?v=TwxdOFcEah4
              https://www.youtube.com/watch?v=sc7RNl2YZHY
              https://www.youtube.com/watch?v=zEL-L2F0o7Q
              https://stackoverflow.com/
              https://medium.com/
 */

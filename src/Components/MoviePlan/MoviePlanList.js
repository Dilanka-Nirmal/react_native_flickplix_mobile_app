import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import COLORS from '../Animation/Colors';
import MoviePlanListModal from './MoviePlanListModal';

export default MoviePlanList = ({list, updateMoviePlanList}) => {
  const [getListVisible, setListVisible] = React.useState(false);

  // Function to handle the visibility of the modal
  const handleListVisible = () =>
    getListVisible ? setListVisible(false) : setListVisible(true);

  // Counting the number of completed and remaining todos
  const completedCount = list.todos.filter(todo => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  return (
    <View>
      <Modal
        animationType="slide"
        visible={getListVisible}
        onRequestClose={handleListVisible}>
        <MoviePlanListModal
          list={list}
          handleListVisible={handleListVisible}
          updateMoviePlanList={updateMoviePlanList}
        />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, {backgroundColor: list.color}]}
        onPress={handleListVisible}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
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

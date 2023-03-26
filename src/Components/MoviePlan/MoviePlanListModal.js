import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../Animation/Colors';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

export default MoviePlanListModal = ({
  list,
  handleListVisible,
  updateMoviePlanList,
}) => {
  // const [getName, setName] = React.useState(list.name);
  // const [getColor, setColor] = React.useState(list.color);
  // const [getTodos, setTodos] = React.useState(list.todos);
  const [getTodo, setTodo] = React.useState('');
  const [getList, setList] = React.useState(list);

  // Toggle Movie Plan Completed
  const toggleTodoCompleted = index => {
    let list = getList;
    list.todos[index].completed = !list.todos[index].completed;

    updateMoviePlanList(list);
  };

  // Add Movie Plan
  const addMoviePlan = () => {
    let list = getList;
    list.todos.push({title: getTodo, completed: false});
    updateMoviePlanList(list);
    setTodo();
    Keyboard.dismiss();
  };

  //Delete Movie Plan
  const deleteMoviePlan = index => {
    let list = getList;
    list.todos.splice(index, 1);
    updateMoviePlanList(list);
  };

  // Render Todos
  const renderToDo = (todo, index) => {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(_, dragX) => renderRightActions(dragX, index)}>
          <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
              <Icon
                name={
                  todo.completed
                    ? 'checkbox-marked-outline'
                    : 'checkbox-blank-outline'
                }
                size={24}
                color={COLORS.gray}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.todo,
                {
                  textDecorationLine: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? COLORS.gray : COLORS.black,
                },
              ]}>
              {todo.title}
            </Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  // RightAction Gesture
  const renderRightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={() => deleteMoviePlan(index)}>
        <Animated.View style={[styles.deleteButton, {opacity: opacity}]}>
          <Animated.Text
            style={{
              color: COLORS.white,
              fontWeight: '800',
              transform: [{scale}],
            }}>
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Count Total Movie Plan Tasks
  const taskCount = getList.todos.length;
  // Count Completed Movie Plan Tasks
  const completedCount = getList.todos.filter(todo => todo.completed).length;

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 64, right: 32, zIndex: 10}}
          onPress={handleListVisible}>
          <Icon name="close" size={24} color={COLORS.black} />
        </TouchableOpacity>

        <View
          style={[
            styles.section,
            styles.header,
            {borderBottomColor: getList.color},
          ]}>
          <View>
            <Text style={styles.title}>{getList.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={[styles.section, {flex: 3, marginVertical: 16}]}>
          <FlatList
            data={getList.todos}
            renderItem={({item, index}) => renderToDo(item, index)}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, {borderColor: getList.color}]}
            onChangeText={text => setTodo(text)}
            value={getTodo}
          />
          <TouchableOpacity
            style={[styles.addTodo, {backgroundColor: getList.color}]}
            onPress={() => addMoviePlan()}>
            <Icon name="plus" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: COLORS.gray,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 32,
  },
  todo: {
    color: COLORS.black,
    fontWeight: '700',
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
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

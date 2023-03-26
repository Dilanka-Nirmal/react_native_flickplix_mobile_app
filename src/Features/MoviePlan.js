import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import {onAuthStateChanged} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import {auth, db} from '../../firebase';

import COLORS from '../Components/Animation/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoviePlanList from '../Components/MoviePlan/MoviePlanList';
import AddMoviePlanModal from '../Components/MoviePlan/AddMoviePlanModal';

export const MoviePlan = ({navigation}) => {
  const [getUser, setUser] = React.useState(null);
  const [getTodoVisible, setTodoVisible] = React.useState(false);
  const [getMoviePlanList, setMoviePlanList] = React.useState([]);

  React.useEffect(() => {
    if (getUser) {
      const unsubscribe = loadMoviePlanList();

      return () => {
        unsubscribe();
      };
    }
  }, [getUser]);

  // Check if user is logged in
  onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid;
      setUser(uid);
    } else {
      navigation.navigate('LoginScreen');
    }
  });

  // Load movie plan list
  const loadMoviePlanList = () => {
    const q = query(
      collection(db, 'users', getUser, 'moviePlanList'),
      orderBy('name', 'asc'),
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const lists = [];

      querySnapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()});
      });

      setMoviePlanList(lists);
    });

    return unsubscribe;
  };

  const handleTodoVisible = () =>
    getTodoVisible ? setTodoVisible(false) : setTodoVisible(true);

  const renderList = list => {
    return (
      <MoviePlanList list={list} updateMoviePlanList={updateMoviePlanList} />
    );
  };

  // const addMoviePlanList = list => {
  //   setMoviePlanList([
  //     ...getMoviePlanList,
  //     {
  //       ...list,
  //       id: getMoviePlanList.length + 1,
  //       todos: [],
  //     },
  //   ]);
  // };

  // Add new movie plan list
  const addMoviePlanList = list => {
    const q = query(collection(db, 'users', getUser, 'moviePlanList'));
    const retrievedList = {
      name: list.name,
      color: list.color,
      todos: [],
    };
    return addDoc(q, retrievedList);
  };

  // const updateMoviePlanList = list => {
  //   setMoviePlanList(
  //     getMoviePlanList.map(item => {
  //       return item.id === list.id ? list : item;
  //     }),
  //   );
  // };

  // Update movie plan list
  const updateMoviePlanList = list => {
    const q = query(collection(db, 'users', getUser, 'moviePlanList'));
    return updateDoc(doc(q, list.id), list);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={getTodoVisible}
        onRequestClose={handleTodoVisible}>
        <AddMoviePlanModal
          handleTodoVisible={handleTodoVisible}
          addMoviePlanList={addMoviePlanList}
        />
      </Modal>
      <View styles={{flexDirection: 'row'}}>
        {/* <View style={styles.divider} /> */}
        <Text style={styles.title}>
          Movie Plan{' '}
          <Text style={{fontWeight: '300', color: COLORS.blue}}>List</Text>
        </Text>
        {/* <View style={styles.divider} /> */}
      </View>
      <View style={{marginVertical: 48}}>
        <TouchableOpacity style={styles.addList} onPress={handleTodoVisible}>
          <Icon name="movie-open-edit-outline" size={32} color={COLORS.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={getMoviePlanList}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: '#A7CBD9',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: COLORS.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
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

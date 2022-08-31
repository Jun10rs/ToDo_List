import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { commonStyles } from "../Style/CommonStyles";
import { get } from "react-native/Libraries/Utilities/PixelRatio";


export const API = "http://4977-2804-15e4-8060-600-108b-74d8-46c6-836d.ngrok.io";


export default function Home({navigation}) {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState (false)



  function navigateToForm() {
    navigation.navigate('Forms')
  }

  function deleteTask (taskId){
    fetch (API + '/tasks/' + taskId, {
      method: 'DELETE'
    })
    .then (() => {
      getTasks()
      setLoading(true)
    })
    .catch (() => alert ('Houve um erro ao tentar deletar'))

  }

  function getTasks () {
    fetch(API + "/tasks")
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setTasks(data);
        setLoading(false)
      })
      .catch(() =>
        console.log("Houve um erro ao recuperar a lista de tarefas")
      );
  }

  useEffect(() => {
    getTasks ()
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="tomato" />
      <View style={styles.header}>
        <Text style={styles.title}>To Do-List</Text>
        <Image
          style={styles.thumb}
          source={{
            uri: "https://i.pinimg.com/originals/0d/9e/6b/0d9e6b830642bb88c37f2decc146bbaf.jpg",
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={commonStyles.input}
          selectionColor="tomato"
          placeholder="Pesquise sua tarefa"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={navigateToForm}>
          <Icon name="add-comment" size={32} color="blue"  />
        </TouchableOpacity>
      </View>

      {loading === true && 
      <View>
        <Icon name= 'update' size= {50} color= 'blue' />
      </View>
        }

      <ScrollView>
        {tasks.map((task) => (
          <View style={styles.cardTask} key={task.id}>
            <TouchableOpacity style={styles.descripiontCard}>
              <Text>{task.description}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCheck}>
              <Icon name="update" size={30} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteTask (task.id)}>
              <Icon name="delete-outline" size={30} color="blue" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },

  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "tomato",
  },

  thumb: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  cardTask: {
    height: 50,
    width: "90%",
    backgroundColor: "tomato",
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
    padding: 5,
    justifyContent: "space-around",
  },

  descripiontCard: {
    width: "60%",
  },

  buttonDelete: {
    width: "15%",
  },

  buttonCheck: {
    width: "15%",
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },

  buttonAdd: {
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
    
});

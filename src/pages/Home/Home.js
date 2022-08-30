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

import { useEffect,useState } from "react";

import Icon from "@expo/vector-icons/MaterialIcons";



export default function Home() {

    const [tasks, setTasks] = useState ([])

    useEffect(() => {
        fetch ('http://2fe4-2804-15e4-8060-600-9015-983b-ce42-845a.ngrok.io/tasks')
        .then (async (response) => {
            const data = await response.json()
            setTasks(data)
        })

        .catch (() => alert ('Houve um erro ao recuperar a lista de tarefas'))
    },[])


  return (
    <SafeAreaView>
      <StatusBar backgroundColor="tomato" />
      <View style={styles.header}>
        <Text style={styles.title}>ToDo-List</Text>
        <Image
          style={styles.thumb}
          source={{
            uri: "https://i.pinimg.com/originals/0d/9e/6b/0d9e6b830642bb88c37f2decc146bbaf.jpg",
          }}
        />
      </View>

      <TextInput
        style={styles.input}
        selectionColor="tomato"
        placeholder="Pesquise sua tarefa"
        autoCapitalize="none"
      />

      <ScrollView>
        <View style={styles.cardTask}>
          <TouchableOpacity style={styles.descripiontCard}>
            <Text>Estudar Programação</Text>
          </TouchableOpacity >

          <TouchableOpacity style={styles.buttonCheck}>
            <Icon name='update' size={30} color='blue'/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDelete}>
            <Icon name='delete' size={30} color='blue'/>
          </TouchableOpacity>
        </View>
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

  input: {
    height: 44,
    width: "90%",
    borderColor: "tomate",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 10,
  },

  cardTask:{
    height: 50,
    width: '90%',
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  descripiontCard: {
    width: '60%'
  },

  buttonDelete: {
    width: '15%'
  },

  buttonCheck: {
    width: '15%'    
  },
});

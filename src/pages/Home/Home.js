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
  Alert
} from "react-native";

import { useEffect, useState } from "react";

import Icon from "@expo/vector-icons/MaterialIcons";

import { commonStyles } from "../Style/CommonStyles";

import { useIsFocused } from "@react-navigation/native";

import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const API =
  "http://64bf-2804-15e4-8060-600-ef52-1060-f01b-8854.ngrok.io"


export default function Home({ navigation }) {

  const telaFocada = useIsFocused()

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('')

  function navigateToForm() {
    navigation.navigate("Forms");
  }

  function deleteTask(taskId) {
    fetch(API + "/tasks/" + taskId, {
      method: "DELETE",
    })
      .then(() => {
        getTasks();
        setLoading(true)
      })
      .catch(() => alert("Houve um erro ao tentar deletar"));
  }

  function getTasks() {
    //fetch(API + "/tasks" + '?description=' +  searchText) busca exatamente a palavra escrita
    fetch(API + "/tasks" + '?description_like=' + searchText)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setTasks(data);
        setLoading(false)
      })
      .catch((error) =>
        console.log(error));
  }

  function showDescripitionTask(description, category) {
    Alert.alert(
      description,
      category,
    );
  }

  function searchTasks() {
    getTasks()
  }

  function updateTask(taskId) {
    fetch(API + "/tasks/" + taskId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
      }),
    })
      .then(() => {
        alert("Atualizado com sucesso")
        getTasks()
      })
      .catch(() => alert("Houve um erro ao tentar atualizar a lista"));
  }

  useEffect(() => {
    if (telaFocada === true) {
      getTasks();
      //setLoading(true)
    }
  }, [telaFocada]);

  useEffect(() => {
    getTasks()

  }, [searchText])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="tomato" />
      <View style={styles.header}>
        <Text style={styles.title}>To Do-List</Text>
        <Image
          style={styles.thumb}
          source={{
            uri: "http://76e1-2804-15e4-8060-600-ef52-1060-f01b-8854.ngrok.iog",
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={commonStyles.input}
          selectionColor="tomato"
          placeholder="Pesquise sua tarefa"
          autoCapitalize="none"
          value={searchText}
          onChangeText={setSearchText}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={searchTasks}>
          <Icon name="search" size={32} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAdd} onPress={navigateToForm}>
          <Icon name="add-comment" size={32} color="blue" />
        </TouchableOpacity>

      </View>

      {loading === true && <Text>Loading</Text>}

      <ScrollView>
        {tasks.map((task) => (
          <View
            style={{ ...styles.cardTask, backgroundColor: task.status === true ? 'green' : 'tomato' }}
            key={task.id}
          >
            <TouchableOpacity
              style={styles.descripiontCard}
              onPress={() => showDescripitionTask(task.description, task.category)}
            >
              <Text numberOfLines={1} ellipsizeMode="tail">
                {task.description}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {format(parseISO(task.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </Text>
            </TouchableOpacity>

            {
              task.status === false &&
              <TouchableOpacity
                style={styles.buttonCheck}
                onPress={() => updateTask(task.id)}
              >
                <Icon name="update" size={30} color="blue" />
              </TouchableOpacity>
            }

            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => deleteTask(task.id)}
            >
              <Icon name="delete" size={30} color="blue" />
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
    height: 60,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  buttonAdd: {
    width: 50,
    height: 50,
    backgroundColor: "tomato",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

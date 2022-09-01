import { View, TextInput, StyleSheet, Button } from "react-native";
import { commonStyles } from "../Style/CommonStyles";
import { useState, useEffect } from "react";

import { API } from "../Home/Home";

export default function Forms() {

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState('')

  useEffect(() => {
    console.log('entrei aqui')
    if (description === 'estudar') {
      alert ("estude mesmo")
    }
  },[description])

  function addNewTask() {
    if (description.length > 3) {
      fetch(API + "/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
          status: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async() => {
          alert("Tarefa cadastrada com sucesso");
          setDescription ('')
          setTitle ('')
          //const data = await response.json()
          //console.log(data)
        })
        .catch(() => alert("Houve um erro ao cadastrar uma tarefa"));
    } else {
      alert("Digite uma tarefa mais detalhada");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...commonStyles.input, marginBottom: 20 }}
        selectionColor="tomato"
        placeholder="Digite seu titulo"
        autoCapitalize="none"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />

      <TextInput
        style={{ ...commonStyles.input, marginBottom: 20 }}
        selectionColor="tomato"
        placeholder="Digite sua tarefa"
        autoCapitalize="none"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Adicionar" color="tomato" onPress={addNewTask} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
  },
});

import { View, TextInput, StyleSheet, Button, Text} from "react-native";
import { commonStyles } from "../Style/CommonStyles";
import { useState, useEffect } from "react";

import { Picker } from "@react-native-picker/picker";

import { Calendar } from "react-native-calendars";

import { API } from "../Home/Home";
import { format } from "date-fns";


export default function Forms() {

  const dataAtual = format (new Date (), 'yyy-MM-dd')


  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState (dataAtual)

  useEffect(() => {
    console.log("entrei aqui");
    if (description === "estudar") {
      alert("estude mesmo");
    }
  }, [description]);

  

  function addNewTask() {
    if (description.length < 4) {
      alert ('Digite uma tarefa mais detalhada')
    }else if (category === ''){
      alert ('Selecione uma categoria')
    }else {
      fetch(API + "/tasks", {
        method: "POST",
        body: JSON.stringify({
          description: description,
          status: false,
          category: category,
          date: date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async () => {
          alert("Tarefa cadastrada com sucesso");
          setDescription("");
          
          //const data = await response.json()
          //console.log(data)
        })
        .catch(() => alert("Houve um erro ao cadastrar uma tarefa"));
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...commonStyles.input, marginBottom: 20 }}
        selectionColor="tomato"
        placeholder="Digite seu titulo"
        autoCapitalize="none"
        value={description}
        onChangeText={setDescription}
        autoFocus
      />

      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.select}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Estudos" value="estudos" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Outros" value="outros" />
      </Picker>
     <Text>{date}</Text>
      <Calendar
      minDate={dataAtual}
      style={styles.calendar}
      onDayPress={(currentDate) => setDate (currentDate.dateString)}
      markedDates= {{

        [date]: {
          selected: true,
          marked: true,
          selectedColor: '#FFF',
          dotColor: 'red'
        }}

      }
      theme={{
        calendarBackground: 'tomato',
        selectedDayTextColor: 'green',
        todayTextColor: '#FFF',
        dayTextColor: '#FFF',
        arrowColor: 'black',
        monthTextColor: '#0101DF',
        textDayFontWeight: 'bold'
        
      }}
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

  select: {
    backgroundColor: "tomato",
    color: "red",
    width: '70%',
    marginBottom: 20,
  },

  calendar: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    marginVertical: 10,
  },
});

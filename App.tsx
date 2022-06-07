import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [tasks, setTasks] = React.useState<string>();
  const [taskItems, setTaskItems] = React.useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, tasks]);
    setTasks(null);
  };

  const handleRemoveTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView   style={styles.items}>
          {taskItems.map((task, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRemoveTask(index)}
            >
              <Task task={task} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* write tasks here */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={tasks} onChangeText={text => setTasks(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  
  },
  sectionTitle: {
    fontSize: 34,
    paddingBottom: 50,
    fontWeight: "bold",
    color: "white",
  },
  items: {
    marginTop: 20,
    height: "70%",
    padding: 5,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    
  },
  input: {
    paddingVertical: 10,
    width: 250,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#C0C0C0",
    backgroundColor: "white",
  },
  addWrapper: {
    backgroundColor: "#55BCF6",
    borderColor: "#C0C0C0",
    padding: 10,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 24,
    color: "white",
  },
});

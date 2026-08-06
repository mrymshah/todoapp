import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Task {
  id: string;
  title: string;
}

export default function HomeScreen() {
  const [taskText, setTaskText] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([
    { id: '1', title: 'Complete Assignment' },
    { id: '2', title: 'Learn React Native' },
    { id: '3', title: 'Read a Book' },
    { id: '4', title: 'Go for a Walk' },
    { id: '5', title: 'Submit Lab Work' },
  ]);

  // Task add logic
  const handleAddTask = () => {
    if (taskText.trim() === '') return;

    setTaskList([
      ...taskList,
      { id: Date.now().toString(), title: taskText.trim() },
    ]);
    setTaskText('');
  };

  // Task delete logic
  const handleDeleteTask = (id: string) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#5C46E5" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My To-Do List</Text>
        <Ionicons name="clipboard-outline" size={26} color="#FFF" style={styles.headerIcon} />
      </View>

      <View style={styles.content}>
        {/* Input Box and Add Button */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Ionicons name="create-outline" size={18} color="#8E8E93" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter a task..."
              placeholderTextColor="#A0A0A0"
              value={taskText}
              onChangeText={setTaskText}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>+ Add Task</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.taskCard}>
              <View style={styles.serialBadge}>
                <Text style={styles.serialText}>{index + 1}</Text>
              </View>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#E74C3C" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />

        {/* Total Tasks Counter Card */}
        <View style={styles.footerCard}>
          <Ionicons name="clipboard-outline" size={28} color="#5C46E5" style={{ marginRight: 15 }} />
          <View>
            <Text style={styles.footerLabel}>Total Tasks</Text>
            <Text style={styles.footerCount}>{taskList.length}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#5C46E5" />
          <Text style={[styles.navText, { color: '#5C46E5', fontWeight: 'bold' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={22} color="#8E8E93" />
          <Text style={styles.navText}>Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={22} color="#8E8E93" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#5C46E5',
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcon: {
    position: 'absolute',
    right: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 10,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#2D3748',
  },
  addButton: {
  backgroundColor: '#5C46E5',
  paddingHorizontal: 16,
  height: 48,
  borderRadius: 12,
  justifyContent: 'center', // <--- Add 'Content' here
  alignItems: 'center',
},
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 10,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  serialBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F0EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serialText: {
    color: '#5C46E5',
    fontWeight: 'bold',
    fontSize: 14,
  },
  taskTitle: {
    fontSize: 15,
    color: '#2D3748',
    flex: 1,
    fontWeight: '500',
  },
  footerCard: {
    backgroundColor: '#F0EEFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    width: '60%',
  },
  footerLabel: {
    color: '#718096',
    fontSize: 12,
  },
  footerCount: {
    color: '#5C46E5',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 11,
    marginTop: 3,
    color: '#8E8E93',
  },
});
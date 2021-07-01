import React, {useState} from 'react'
import {Text, StyleSheet, ScrollView} from 'react-native'
import {
    Container,
    Form,
    Item, 
    Input,
    Button,
    H1
} from 'native-base'

import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage';
import { log } from 'react-native-reanimated';

const Add = ({navigation}) => {
    const [name, setName] = useState('')
    const [totalNoTask, setTotalNoTask] = useState('')

    const addToList = async () => {
        try {
            if (!name || !totalNoTask) {
                return alert('Please add both fields')
                //TODO: all snackbar here
            }

            const taskToAdd = {
                id: shortid.generate(),
                name,
                totalNoTask,
                isWatched: false,

            }

            const storedValue = await AsyncStorage.getItem('@task_list')
            const prevList = await JSON.parse(storedValue)

            if (!prevList) {
                const newList = [taskToAdd]
                await AsyncStorage.setItem('@task_list', JSON.stringify(newList))
            } else {
                prevList.push(taskToAdd)
                await AsyncStorage.setItem('@task_list', JSON.stringify(prevList))
            }

            navigation.navigate('Home')


        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <H1 style={styles.heading}>Add Task</H1>
                <Form>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Task name"
                        style={{color: "#000"}}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Description"
                        style={{color: "#000"}}
                        value={totalNoTask}
                        onChangeText={(text) => setTotalNoTask(text)}
                        />
                    </Item>
                    <Button rounded block 
                    onPress={addToList}
                    style={styles.addButton}
                    >
                        <Text style={styles.addText}>Add</Text>
                    </Button>
                </Form>
            
            </ScrollView>
        </Container>
    )
}

export default Add


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E8EAED',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#758283',
      fontFamily:"monospace",
      fontWeight:"bold",
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
      backgroundColor:"#CAD5E2"
    },
    addButton:{
        backgroundColor:"#23C4ED",
        
    },
    addText:{
     fontFamily:"fantasy",
     fontWeight:"600",
     color:"#242B2E"
    }
  });
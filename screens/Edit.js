import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet} from 'react-native'
import {
    List,
    ListItem,
    Left,
    Text,
    Button,
    Icon, 
    Body, 
    Right,
    CheckBox,
    Title,
    H1,
    Fab,
    Subtitle,
    Container,
    Spinner,
    Form,
    Item,
    Input
} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage';

const Edit = ({navigation, route}) => {

    const [name, setName] = useState('')
    const [totalNoTask, setTotalNoTask] = useState('')
    const [id, setId] = useState(null)

    const update = async () => {
        try {
            if (!name || !totalNoTask) {
                return alert("Please enter value in both field")
                //TODO: add snackbar here
            }

            const tasktoUpdate = {
                id,
                name, 
                totalNoTask,
                isWatched: false
            }

            const storedValue = await AsyncStorage.getItem('@task_list')
            const list = await JSON.parse(storedValue)
            
            list.map((singleTask) => {
                if (singleTask.id == id) {
                    singleTask.name = name;
                    singleTask.totalNoTask = totalNoTask;
                }
                return singleTask;
            })

            await AsyncStorage.setItem('@task_list', JSON.stringify(list))

            navigation.navigate("Home");


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const {task} = route.params
        const {id, name, totalNoTask} = task

        setId(id)
        setName(name)
        setTotalNoTask(totalNoTask)

    }, [])

    return(
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <H1 style={styles.heading}>Add to watch List</H1>
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
                    onPress={update}
                    style={styles.updateButton}
                    >
                        <Text style={styles.updateText}>Update</Text>
                    </Button>
                </Form>
            
            </ScrollView>
        </Container>
    )
}

export default Edit



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
      backgroundColor:"#CAD5E2",
      fontFamily:"monospace"
    },
    updateButton:{
        backgroundColor:"#23C4ED",
        
    },
    updateText:{
     fontFamily:"fantasy",
     fontWeight:"600",
     color:"#242B2E"
    }
  });
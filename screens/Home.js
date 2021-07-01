import React, {useState, useEffect} from 'react'
import { StyleSheet, ScrollView} from 'react-native'
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
    Spinner
} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native'

const Home = ({navigation, route}) => {
    const [listOfTask, setListOfTask] = useState([])
    const [loading, setLoading] = useState(false)

    const isFocused = useIsFocused()

    const getList = async () => {
        setLoading(true)

        const storedValue = await AsyncStorage.getItem('@task_list');

        if (!storedValue) {
            setListOfTask([])
        }

        const list = JSON.parse(storedValue)
        setListOfTask(list)

        setLoading(false)

    }

    const deleteTask = async (id) => {
        const newList = await listOfTask.filter((list) => list.id !== id)
        await AsyncStorage.setItem('@task_list', JSON.stringify(newList));

        setListOfTask(newList)
    }

    const markComplete = async (id) => {
        const newArr = listOfTask.map((list) => {
            if (list.id == id) {
                list.isWatched = !list.isWatched
            }
            return list
        })

        await AsyncStorage.setItem('@task_list', JSON.stringify(newArr))
        setListOfTask(newArr)
    }

    useEffect(() => {
        getList();
    }, [isFocused])

    if (loading) {
        return(
            <Container style={styles.container}>
                <Spinner color="#00b7c2" />
            </Container>
        )
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {listOfTask.length === 0 ? (
                <Container style={styles.container}>
                    <H1 style={styles.heading}>
                        Please add a task to do!
                    </H1>
                </Container>
            ) : (
                <>
                <H1 style={styles.heading}>Today's Task</H1>
                <List>
                    {listOfTask.map((task) => (
                        <ListItem key={task.id} style={styles.listItem} noBorder>
                        <Left>
                            <Button
                            style={styles.actionButton}
                            danger
                            onPress={() => deleteTask(task.id)}
                            >
                                <Icon name="trash" active />
                            </Button>
                            <Button
                            style={styles.actionButton}
                            onPress={() => {
                                navigation.navigate('Edit', {task})
                            }}
                            >
                                <Icon active name="edit" type="Feather" />
                            </Button>
                        </Left>
                        <Body>
                    <Title style={styles.seasonName}>{task.name}</Title>
                            <Text  note style={styles.taskDescription}> {task.totalNoTask}  </Text>
                        </Body>
                        <Right>
                            <CheckBox
                            checked={task.isWatched}
                            onPress={() => markComplete(task.id)}
                            />
                        </Right>
                    </ListItem>
                    ))}
                </List>
                </>
            )}

            
            
            
            <Fab
            style={{backgroundColor: "#5DA3FA"}}
            position="bottomRight"
            onPress={() => navigation.navigate('Add')}
            >
                <Icon name="add" />
            </Fab>
        </ScrollView>
    )
}

export default Home;

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#E6425E',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#E8EAED',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#758283',
      fontFamily:"monospace",
      fontWeight:"bold",
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
      backgroundColor:"#CAD5E2",
      borderRadius:50,
   
    },
    seasonName: {
      color: '#46B2E0',
      fontFamily:"monospace",
      fontWeight:"bold",
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
    taskDescription:{
        fontFamily:"monospace",
      fontWeight:"bold",
      textAlign: 'justify',
    }
  });
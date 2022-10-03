import React, { ChangeEvent, useState, useReducer } from 'react';
import { ObjTaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { Container, Grid, IconButton, TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { HeaderBar } from './HeaderBar';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './redusers/TasksReduser';
import { editTodolistAC, removeTodoListAC, todolistsReduser, changeFilterAC, addTodolistAC } from './redusers/TodoListReduser';
import { AppRootStateType } from './store';
import { useDispatch, useSelector } from 'react-redux';





export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [titleTodoList, setTitleTodolist] = useState("");

    // let todolistID1 = v1();
    // let todolistID2 = v1();

    // let [todolists, dispatchTodoList] = useReducer(todolistsReduser, [
    //     { id: todolistID1, title: 'What to learn', filter: 'all' },
    //     { id: todolistID2, title: 'What to buy', filter: 'all' },
    // ])

    
    // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         { id: v1(), title: "HTML&CSS", isDone: true },
    //         { id: v1(), title: "JS", isDone: true },
    //         { id: v1(), title: "ReactJS", isDone: false },
    //         { id: v1(), title: "Rest API", isDone: false },
    //         { id: v1(), title: "GraphQL", isDone: false },
    //     ],
    //     [todolistID2]: [
    //         { id: v1(), title: "HTML&CSS2", isDone: true },
    //         { id: v1(), title: "JS2", isDone: true },
    //         { id: v1(), title: "ReactJS2", isDone: false },
    //         { id: v1(), title: "Rest API2", isDone: false },
    //         { id: v1(), title: "GraphQL2", isDone: false },
    //     ]
    // });

   let todolists = useSelector < AppRootStateType, Array<todolistsType> > ( state => state.todolists)
    let tasks = useSelector < AppRootStateType, ObjTaskType > ( state => state.tasks)

    const dispatch = useDispatch()

    const addNewTitleTodolist = (e: ChangeEvent<HTMLInputElement>) => {

        setTitleTodolist(e.currentTarget.value)

    }

    const addTodolist = () => {
        const newId = v1();
        const newTodolist: todolistsType = { id: newId, title: titleTodoList, filter: 'all' }
        // dispatchTodoList([newTodolist, ...todolists])
        // dispatchTasks({...tasks, [newId]: [
        //         { id: v1(), title: "HTML&CSS2", isDone: true },
        //         { id: v1(), title: "JS2", isDone: true },
        //         { id: v1(), title: "ReactJS2", isDone: false },
        //         { id: v1(), title: "Rest API2", isDone: false },]
        // })
        dispatch(addTodolistAC(newTodolist))
        setTitleTodolist("")
    }


    const editTodolist = (todolistId: string, newTitle: string) => {
        // setTodolists(todolists.map(el=>el.id===todolistId?{...el,title:newTitle}:el))
        dispatch(editTodolistAC(todolistId, newTitle))
    }

    return (
        <div>

            <HeaderBar />

            <Container fixed>

                <div style={{ display: "flex", padding: "30px" }}>

                    <TextField
                        value={titleTodoList}
                        onChange={addNewTitleTodolist}
                    />

                    <IconButton
                        onClick={addTodolist}
                        color={'primary'}>
                        < AddBoxIcon />
                    </IconButton>
                    <h4 style={{ color: "green" }}> //Este campo , esta para añadir un bloque nuevo.</h4>
                </div>




                <Grid container spacing={8} style={{ padding: "30px" }}>

                    {todolists.map((mapTodolists: todolistsType) => {
                        return (
                            <Todolist
                                key={mapTodolists.id}
                                title={mapTodolists.title}
                                filter={mapTodolists.filter}
                                id={mapTodolists.id}
                            />
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;











import React, { ChangeEvent, useState, useReducer } from 'react';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { Container, Grid, IconButton, TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { HeaderBar } from './HeaderBar';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './redusers/TasksReduser';
import { editTodolistAC, removeTodoListAC, todoListReduser, changeFilterAC, addTodolistAC } from './redusers/TodoListReduser';





export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [titleTodoList, setTitleTodolist] = useState("");

    let todolistID1 = v1();
    let todolistID2 = v1();

    // <Array<todolistsType>>

    let [todolists, dispatchTodoList] = useReducer(todoListReduser, [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    const removeTodoList = (id: string) => {
        dispatchTodoList(removeTodoListAC(id))
        dispatchTasks(removeTodoListAC(id))
    }

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });

    const removeTask =(todolistID: string, id: string)=> {

        //   setTasks({...tasks,[todolistID]:tasks[todolistID].filter(t=>t.id != id)});
        dispatchTasks(removeTaskAC(todolistID, id))
    }

    const addTask = (todolistID: string, title: string) =>{

        dispatchTasks(addTaskAC(todolistID, title));
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatchTasks(changeStatusAC(todolistID, taskId, isDone));
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        // setTodolists(todolists.map(filtered=>filtered.id===todolistID ? {...filtered,filter:value}:filtered))
        dispatchTodoList(changeFilterAC(todolistID, value))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        // dispatchTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,title:newTitle}:el)})
        dispatchTasks(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

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
        dispatchTodoList(addTodolistAC(newTodolist))
        dispatchTasks(addTodolistAC(newTodolist))
        setTitleTodolist("")
    }


    const editTodolist = (todolistId: string, newTitle: string) => {
        // setTodolists(todolists.map(el=>el.id===todolistId?{...el,title:newTitle}:el))
        dispatchTodoList(editTodolistAC(todolistId, newTitle))
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

                        let tasksForTodolist = tasks[mapTodolists.id];

                        if (mapTodolists.filter === "active") {
                            tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone === false);
                        }
                        if (mapTodolists.filter === "completed") {
                            tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone === true);
                        }
                        return (
                            <Todolist
                                removeTodoList={removeTodoList}
                                key={mapTodolists.id}
                                todolistID={mapTodolists.id}
                                title={mapTodolists.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={mapTodolists.filter}
                                changeTaskTitle={changeTaskTitle}
                                editTodolist={editTodolist}
                            />
                        )
                    })}
                </Grid>
            </Container>
        </div>


    );

}

export default App;





export type FullType = Man1Type|Man2Type|CarType

export type Man1Type = {
   height:number
   name:string
}
export type Man2Type = {
   height:number
   name:string
   age:string
}

let Man1:Man1Type = { name:"Sasha", height:1.75 }
let Man2:Man2Type = { name:"Arnold", height:1.95 , age:"18"}

let car:CarType = {model:"Reno Stepway", year: 2016}


type CarType = {
    model : string
    year: number 
    // on : boolean
    // turnOn : void
    // rename: (model:string) => string
}




export type GarageType = {
    addCar:(car:CarType)=>void
    logAllCarsNames:()=>void
    getAllCars:()=>Array<CarType>
  }

  let createGarage = ():GarageType => {
    let cars:Array<CarType> = []

    return {
         addCar(car) {
            cars.push(car)
        },
        logAllCarsNames() {
            console.log ("Cars in the garage");
            cars.forEach( c => console.log (c.model) )
        },
        getAllCars() {
            return cars;
        }
    }
  }







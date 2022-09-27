import { Button, Grid, IconButton, makeStyles, Paper, TextField, Theme , createStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {FilterValuesType, todolistsType} from './App';
import { EditableSpanTitle } from './EditableSpanTitle';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC } from './redusers/TasksReduser';
import { changeFilterAC, editTodolistAC, removeTodoListAC } from './redusers/TodoListReduser';
import { AppRootStateType } from './store';
import { Task } from './Task';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }),
);



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type ObjTaskType = {
    [key: string] : TaskType[],
}

export function Todolist({filter, id, title}: todolistsType) {

        const classes = useStyles();

    let [taskTitle, setTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const tasks = useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[id])
    
    const dispatch = useDispatch()


    const addTask = () => {
     dispatch(addTaskAC(id,taskTitle))
    }

    const removeTodoList = () => dispatch(removeTodoListAC(id))

     const editTodolist=(newTitle:string)=>{
      dispatch(editTodolistAC( id,newTitle))
     }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    function changeFilter(value: FilterValuesType) {
        console.log(value)
        // setTodolists(todolists.map(filtered=>filtered.id===todolistID ? {...filtered,filter:value}:filtered))
        dispatch(changeFilterAC(id, value))
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    const onAllClickHandler = () =>  changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')


    

    function changeTaskStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatch(changeStatusAC(todolistID, taskId, isDone));
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        // dispatchTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,title:newTitle}:el)})
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const removeTask =(todolistID: string, id: string)=> {

        //   setTasks({...tasks,[todolistID]:tasks[todolistID].filter(t=>t.id != id)});
        dispatch(removeTaskAC(todolistID, id))
    }

    return (
        <Grid item>
            <Paper elevation={3} style={{ padding: "10px" }}>
                <div>
                    <div style={{ display: "flex" }}>
                        <h3>
                            <EditableSpanTitle

                             title={title}
                             onChange={setTaskTitle}
                            />
                        </h3>

                        <IconButton onClick={removeTodoList} >
                            <Delete />
                        </IconButton>
                    </div>
       
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Type value"
                        variant="outlined"
                        value={taskTitle}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? "error" : ""}
                        multiline
                        error={!!error}
                        helperText={error}
                    />
                    <IconButton
                        onClick={addTask}
                        color={'primary'}>
                        < AddBoxIcon />
                    </IconButton>
                </div>

                <div>
                    {
                        tasksForTodolist.map(t => {
                            const removeHandler = (taskId: string) => removeTask(id, t.id)

                            const changeStatusTask = (taskId: string, status: boolean) => {
                              changeTaskStatus(id, taskId, status);
                            }

                            return (
                                <Task
                                    changeStatusTask={changeStatusTask}
                                    removeHandler={removeHandler}
                                    task={t}
                                    todolistID={id}
                                    onChangeTaskTitleHandler={(title: string) => changeTaskTitle(t.id, taskTitle, id)}
                                />
                            )
                        })
                    }
                </div>
                <div>
                    <Button
                        variant={filter === 'all' ? "contained" : "text"}
                        onClick={onAllClickHandler}>
                        All
                    </Button>

                    <Button
                        color={"primary"}
                        variant={filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>
                        Active
                    </Button>

                    <Button
                        color={"secondary"}
                        variant={filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>
                        Completed
                    </Button>
                </div>
            </div>
            </Paper > 
            </Grid>
    )
}

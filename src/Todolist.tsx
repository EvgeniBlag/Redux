import { Button, Grid, IconButton, makeStyles, Paper, TextField, Theme , createStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {FilterValuesType, todolistsType} from './App';
import { EditableSpan } from './EditableSpan';
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

export const Todolist = memo(({filter, id, title}: todolistsType) => {

        const classes = useStyles();

    let [taskTitle, setTaskTitle] = useState("")
   
    
    let [error, setError] = useState<string | null>(null)

    const tasks = useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[id])
    
    const dispatch = useDispatch()


    const addTask =   () => {
     dispatch(addTaskAC(id,taskTitle))
     setTaskTitle('')
    }

    const removeTodoList = () =>{ 
     dispatch(removeTodoListAC(id))
    }

     const editTodolist= useCallback((newTitle:string)=>{
      dispatch(editTodolistAC( id,newTitle))
     },[dispatch])


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    function changeFilter(value: FilterValuesType) {
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


    return (
        <Grid item>
            <Paper elevation={3} style={{ padding: "10px" }}>
                <div>
                    <div style={{ display: "flex" }}>

                        <h4>
                             <EditableSpan old_title={title} changeItemText={editTodolist}/>                         
                        </h4>

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
                            return (
                                <Task
                                    key={t.id}
                                    task={t}
                                    todolistID={id}
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
})

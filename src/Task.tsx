import { Button, Checkbox,IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditableSpan } from "./EditableSpan";
import { changeStatusAC, changeTaskTitleAC, removeTaskAC } from "./redusers/TasksReduser";
import { AppRootStateType } from "./store";
import { ObjTaskType, TaskType } from './Todolist'

type TaskPropsType = {
    key:string
    task:TaskType
    todolistID: string
}


export const Task = ({key,task,todolistID}:TaskPropsType) => {

    const dispatch = useDispatch()


    const deleteTaskHandler = ()=> {
        // props.removeHandler(props.task.id)
        dispatch(removeTaskAC(todolistID,task.id))
    }

    const changeStatusHandler = (event:ChangeEvent<HTMLInputElement>)=> {
        const isDone = event.target.checked
        // props.changeStatusTask(props.task.id, e.currentTarget.checked )
        dispatch(changeStatusAC(todolistID, task.id, isDone));
    }

   

    const changeTaskTitle = ( newTitle: string ) => {
        // props.onChangeTaskTitleHandler(title)
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistID))
    }

    return (
      <div>
        <div className={task.isDone ? "is-done" : ""}>

          <Checkbox
           checked={task.isDone}
            onChange={changeStatusHandler}
             />

          <EditableSpan
           old_title={task.title}
            changeItemText={changeTaskTitle}
             />

          <IconButton
           onClick={deleteTaskHandler}
           >
            <Delete />
          </IconButton>
        </div>
      </div>
    );
}



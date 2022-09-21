import { TextField } from "@material-ui/core";
import React, { useState, ChangeEvent,KeyboardEvent } from "react";


type EditableSpanPropsType = {
    old_title: string
    changeItemText:(title: string) => void
}


export const EditableSpan = (props:EditableSpanPropsType) => {
    let [editMode,setEditMode] = useState(false);
    let [title,setTitle] = useState(props.old_title);

    const activeEditMode = () => {
        setEditMode(!editMode);
        setTitle(props.old_title);
    }

    const activateViewMode = () => {
        setEditMode(!editMode);
        props.changeItemText(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === "Enter") {
            setEditMode(!editMode)
            props.changeItemText(title);

        }
    }
    return(
         editMode
          ?
           <TextField onKeyDown={onKeyPressHandler} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
           :
           <span onDoubleClick={activeEditMode}>{props.old_title}</span>
    )
}
import { TextField } from "@material-ui/core";
import React, { useState, ChangeEvent,KeyboardEvent } from "react";


type EditableSpanPropsType = {
    old_title: string
    changeItemText:(title: string) => void
}


export const EditableSpan = ({old_title,changeItemText}:EditableSpanPropsType) => {
    let [editMode,setEditMode] = useState(false);
    let [title,setTitle] = useState(old_title);

    const activeEditMode = () => {
        setEditMode(!editMode);
        setTitle(old_title);
    }

    const activateViewMode = () => {
        setEditMode(!editMode);
        changeItemText(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === "Enter") {
            setEditMode(!editMode)
            changeItemText(title);

        }
    }
    return(
         editMode
          ?
           <TextField onKeyDown={onKeyPressHandler} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
           :
           <span onDoubleClick={activeEditMode}>{old_title}</span>
    )
}
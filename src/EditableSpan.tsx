import { TextField } from "@material-ui/core";
import React, { useState, ChangeEvent,KeyboardEvent, memo } from "react";


type EditableSpanPropsType = {
    old_title: string
    changeItemText:(title: string) => void
}


export const EditableSpan = memo(({old_title,changeItemText}:EditableSpanPropsType) => {

    console.log('EditableSpan')

    let [editMode,setEditMode] = useState<boolean>(false);
    let [title,setTitle] = useState<string>('');

    const activeEditMode = () => {
        setEditMode(true);
        if(old_title) {
            setTitle(old_title);
        }
    }

    const activateViewMode = () => {
        setEditMode(false);
        changeItemText(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            activateViewMode()
        }
    }

    return(
         editMode
          ?
           <TextField onKeyDown={onKeyPressHandler} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
           :
           <span onDoubleClick={activeEditMode}>{old_title}</span>
    )
})
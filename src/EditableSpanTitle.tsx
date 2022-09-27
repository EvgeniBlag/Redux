import React, { KeyboardEvent,ChangeEvent, useState } from "react";

type EditableSpanTitlePropsType = {
    title:string
    onChange:(newTitle:string)=>void
}

export const EditableSpanTitle = (props:EditableSpanTitlePropsType) => {

    const [newTitle,setNewTitle]=useState(props.title)
    let [error, setError] = useState<string | null>(null)
    const [edit, setEdit] = useState(false)
   

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    
    const EditTrueHandler = () => {
        setEdit(!edit)
        props.onChange(newTitle)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === "Enter") {
            setEdit(!edit)
            props.onChange(newTitle);

        }
    }


    return (
        edit ?
            <input
                onKeyPress={onKeyPressHandler}
                onBlur={EditTrueHandler}
                autoFocus
                type="text"
                value={newTitle}
                onChange={onChangeHandler}
            />
         :
            <span
             onDoubleClick={EditTrueHandler} >
                {props.title}
            </span>
    )
}
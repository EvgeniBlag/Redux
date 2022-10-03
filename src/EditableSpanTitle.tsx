import React, { KeyboardEvent,ChangeEvent, useState, memo } from "react";

type EditableSpanTitlePropsType = {
    title:string
    onChange:(newTitle:string)=>void
}

export const EditableSpanTitle = memo (({title,onChange}:EditableSpanTitlePropsType) => {

    console.log('EditableSpanTitle')

    const [newTitle,setNewTitle]=useState<string>(title)
    let [error, setError] = useState<string | null>(null)
    const [edit, setEdit] = useState<boolean>(false)
   

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    
    const EditTrueHandler = () => {
        setEdit(!edit)
        onChange(newTitle)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === "Enter") {
            setEdit(!edit)
            onChange(newTitle);
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
                {title}
            </span>
    )
})
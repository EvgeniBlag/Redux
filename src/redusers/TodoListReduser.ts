import { v1 } from "uuid"
import { FilterValuesType, todolistsType } from "../App"



export const todoListReduser = (state: todolistsType[], action: AllType): todolistsType[] => {

   switch (action.type) {

      case "CHANGE-FILTER": {
         // setTodolists(todolists.map(filtered=>filtered.id===todolistID ? {...filtered,filter:value}:filtered))
         return state.map(f => f.id === action.payload.todolistID ? { ...f, filter: action.payload.value } : f)
      }

      case "REMOVE-TODOLIST": {
         return state.filter(t => t.id !== action.payload.id)
      }

      case "EDIT-TODOLIST-AC": {
         // setTodolists(todolists.map(el=>el.id===todolistId?{...el,title:newTitle}:el))
         return state.map(el => el.id === action.payload.todolistId ? { ...el, title: action.payload.newTitle } : el)
      }

      case "ADD-TODOLIST": {
         return [...state, action.payload.todoList]
      }

      default: return state
   }
}


export type AllType = changeFilterACType | removeTodoListACType |editTodolistACType | addTodolistACType



export type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
   return {
      type: "CHANGE-FILTER",
      payload: {
         todolistID: todolistID,
         value: value
      }
   } as const
}


export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => {
   return {
      type: "REMOVE-TODOLIST",
      payload: {
         id: id
      }

   } as const
}

export type editTodolistACType = ReturnType<typeof editTodolistAC>
export const editTodolistAC = (todolistId: string, newTitle: string) => {
   return {
      type: "EDIT-TODOLIST-AC",
      payload: {
         todolistId: todolistId,
         newTitle: newTitle
      }
   } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todoList: todolistsType) => {

   return {
      type: 'ADD-TODOLIST',
      payload: {
         todoList
      }
   } as const
}






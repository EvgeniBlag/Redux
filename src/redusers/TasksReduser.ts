
import { v1 } from "uuid";
import { ObjTaskType } from "../Todolist"
import { removeTodoListACType,changeFilterAC, addTodolistACType} from "./TodoListReduser";

export const initialState : ObjTaskType = {}

export const tasksReducer = (state = initialState, action: tsarACType): ObjTaskType => {

   switch (action.type) {

      case "REMOVE-TASK": {
         //   setTasks({...tasks,[todolistID]:tasks[todolistID].filter(t=>t.id != id)});
         return {
            ...state, [action.payload.todolistID]: state[action.payload.todolistID]
               .filter(t => t.id !== action.payload.id)
         }
      }

      case "ADD-TASK": {
         const taskId = v1()
         // setTasks({...tasks,[todolistID]: [newTask, ...tasks[todolistID]]});
         let newTask = { id: taskId, title: action.payload.title, isDone: false };
         return { ...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]] }
      }

      case "CHANGE-STATUS": {
         // {...tasks,[todolistID]:tasks[todolistID].map(t=>t.id === taskId ? {...t,isDone:isDone}:t)}
         return {
            ...state, [action.payload.todolistID]: state[action.payload.todolistID]
               .map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t)
         }
      }

      case "CHANGE-TASK-TITLE-AC": {
         return {
            // dispatchTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,title:newTitle}:el)})
            ...state, [action.payload.todolistId]:
               state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? { ...el, title: action.payload.newTitle } : el)
         }
      }

       case "REMOVE-TODOLIST": {
          const copyState = { ...state }
         delete copyState[action.payload.id]

          return copyState
       }

       case "ADD-TODOLIST": {
          const copyState = { ...state }
          copyState[action.payload.todoList.id] = []
          return copyState
       }

       case "ADD-TODOLIST": {
         const copyState = { ...state }
         copyState[action.payload.todoList.id] = []
         return copyState
      }


      default: return state
  }
}

type tsarACType =
   removeTaskACType | addTaskACType | changeStatusACType |
   changeTaskTitleACType | removeTodoListACType | addTodolistACType


type removeTaskACType = ReturnType<typeof removeTaskAC> 
export const removeTaskAC = (todolistID: string, id: string) => {
    return {
       type:"REMOVE-TASK",
       payload: {
        todolistID: todolistID,
        id:id
       }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC> 
export const addTaskAC = (todolistID:string,title: string) => {
    return {
       type:"ADD-TASK",
       payload: {
        todolistID: todolistID,
        title:title,
       }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID:string, taskId: string, isDone: boolean) => {
   return{
      type:"CHANGE-STATUS",
      payload:{
       todolistID:todolistID,
       taskId:taskId,
       isDone:isDone
      }
   } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
   return{
      type:"CHANGE-TASK-TITLE-AC",
      payload:{
         taskId:taskId,
         newTitle:newTitle,
         todolistId:todolistId
      }
   } as const
}
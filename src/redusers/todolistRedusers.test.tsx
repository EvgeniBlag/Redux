
import { v1 } from "uuid"
import { FilterValuesType, todolistsType } from "../App";
import { addTodolistAC, changeFilterAC, editTodolistAC, removeTodoListAC, todoListReduser } from "./TodoListReduser";



let todolistId1 :string 
let todolistId2 : string


let state:todolistsType[]

beforeEach(()=>{

     todolistId1 = v1();
     todolistId2 = v1();

     state = [
        {id:todolistId1,title:"What to learn",filter:"all"},
        {id:todolistId2,title:"What to buy",filter:"all"},
    ]
} )





test("Corecto eliminacion del todoList",()=>{
    //Data1:

    //TestFinction2:

    const endState = todoListReduser(state, removeTodoListAC(todolistId2))
    const midleState = todoListReduser(state, removeTodoListAC(todolistId1))


    //Test3:
     expect(endState.length).toBe(1)
     expect(endState[0].id).toBe(todolistId1)
     expect(endState[0].title).toBe("What to learn")
     expect(midleState[0].title).toBe("What to buy")
     expect(midleState.length).toBe(1)
     expect(midleState[0].id).toBe(todolistId2)
     expect(midleState[0].filter).toBe("all")

})

test("Test para aniadir corecto TodoList y Tasks",()=>{

    //Data1:

    let newTodolistTitle = "New Todolist";

    let todoList:todolistsType = {
        id:v1(),
        title:newTodolistTitle,
        filter:"all"
    }

    //FunctionTest2:

    const endState = todoListReduser(state, addTodolistAC(todoList))

    //Test3:

    expect(endState.length). toBe(3)
    expect(endState[2].title). toBe("New Todolist")
    expect(state.length). toBe(2)
    expect(endState[1].title). toBe("What to buy")
    expect(endState[0].title). toBe("What to learn")
}
)



test("Test para cambiar status , a nuestra Task",()=>{

    //Data1:

    let newFilter:FilterValuesType = "active"

   //TestFunction2:

   const endState = todoListReduser (state, changeFilterAC( todolistId1,  newFilter ) )

   //Test3:

   expect(endState[0].filter). toBe("active")
   expect(endState[1].title). toBe("What to buy")
   expect(endState[0].title). toBe("What to learn")
})




test("Test para aniadir nuevo title, a nuestra Task",()=>{

    //Data1:

   let myNewTitle:string = "Hi i am Evgeny"

   //TestFunction2:

   let endState = todoListReduser (state, editTodolistAC (todolistId1,myNewTitle))

   //Test3:

   expect(endState.length). toBe(2)
   expect(endState[0].title). toBe("Hi i am Evgeny")
})



import {tasksReducer} from './redusers/TasksReduser';
import {todolistsReduser} from './redusers/TodoListReduser';
import {Action, CombinedState, combineReducers, Reducer, legacy_createStore } from 'redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReduser
})
// непосредственно создаём store
export const store =  legacy_createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>





import { ActionReducerMap } from "@ngrx/store";
import { todosReducer } from "./todos/todos.reducer";
import { TodoState } from "./todos/todos.selectors";
import { userReducer } from "./users/users.reducer";
import { UserState } from "./users/users.selectors";


export interface AppState {
    users: UserState
    todos: TodoState
}


export const reducers: ActionReducerMap<AppState> = {
    users: userReducer,
    todos: todosReducer
}



import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from 'axios';

export const getTodos = createAsyncThunk("todos/getTodos", async() => {
    const response = await axios.get('http://localhost:5000/todos');
    return response.data
});

export const saveTodo = createAsyncThunk("todos/saveTodos", async({task, status}) => {
    const response = await axios.post('http://localhost:5000/todos',{
        task,
        status
    });
    return response.data
});

export const updateTodo = createAsyncThunk("todos/updateTodos", async({id, task, status})=>{
    const response = await axios.patch(`http://localhost:5000/todos/${id}`, {
        task, 
        status
    });
    return response.data
})

export const deleteTodo = createAsyncThunk("todos/deleteTodos", async(id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    return id
});

const todoEntity = createEntityAdapter({
    selectId: (todo) => todo.id
})

const todoSlice = createSlice({
    name: "todo",
    initialState: todoEntity.getInitialState(),
    extraReducers: {
        [getTodos.fulfilled]: (state, action) => {
            todoEntity.setAll(state, action.payload);
        },
        [saveTodo.fulfilled]: (state, action) => {
            todoEntity.addOne(state, action.payload);
        },
        [updateTodo.fulfilled]: (state, action) => {
            todoEntity.updateOne(state, {id: action.payload.id, updates: action.payload});
        },
        [deleteTodo.fulfilled]: (state, action) => {
            todoEntity.removeOne(state, action.payload);
        },
    }
});

export const todoSelector = todoEntity.getSelectors(state => state.todo);
export default todoSlice.reducer;
import { configureStore } from '@reduxjs/toolkit'

// я понимаю что описать стору можно как угодно
// но если потребуется добавить новые данные, асинхронные экшены, динамические редюсеры и т.д.
// при таком оформлении придётся просто переписать весь store и править компоненты с ним связанные

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {
                    // const newState = state;
                    // newState.todos.push(action.payload);
                    // return newState;
                    return {
                        ...state,
                        todos: [...state.todos, action.payload],
                    };
                    // Нельзя мутировать state, нужно возвращать копию state, чтобы redux мог понять что изменилось.
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})

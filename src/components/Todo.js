import React, {
  useEffect, useReducer, useRef, useMemo,
} from 'react';
import axios from 'axios';
import List from './List';
import useFormInput from '../hooks/forms';

const Todo = () => {
  const todoInputElRef = useRef();
  const [todoList, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'ADD':
        return state.concat(payload);
      case 'SET':
        return payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== payload);
      default:
        return state;
    }
  }, []);
  const todoInput = useFormInput();

  useEffect(() => {
    axios.get('https://todolist-d5308.firebaseio.com/todos.json').then((result) => {
      const todosData = result.data;
      const todos = [];
      if (todosData) {
        Object.entries(todosData).forEach((entry) => {
          const [key, todo] = entry;
          todos.push({
            id: key,
            name: todo.name,
          });
        });
      }
      dispatch({
        type: 'SET',
        payload: todos,
      });
    });
    return () => {
      console.log('Cleanup');
    };
  }, []);

  const addTodoHandler = () => {
    axios
      .post('https://todolist-d5308.firebaseio.com/todos.json', {
        name: todoInput.value,
      })
      .then((res) => {
        const key = res.data.name;
        dispatch({
          type: 'ADD',
          payload: {
            id: key,
            name: todoInput.value,
          },
        });
      })
      .catch((e) => {
        console.err(e);
      });
  };

  const removeTodoHandler = (id) => {
    axios
      .delete(`https://todolist-d5308.firebaseio.com/todos/${id}.json`)
      .then((res) => {
        console.log(res);
        console.log('Removed Items');
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch({
      type: 'REMOVE',
      payload: id,
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        value={todoInput.value}
        onChange={todoInput.onChange}
        ref={todoInputElRef}
        style={{
          backgroundColor: todoInput.isValid ? 'transparent' : 'red',
        }}
      />
      <button type="button" onClick={addTodoHandler}>
        Add
      </button>
      {useMemo(
        () => (
          <List items={todoList} removeItemHandler={removeTodoHandler} />
        ),
        [todoList],
      )}
    </>
  );
};

export default Todo;

/**
 * SNIPPETS
 */

// const mouseMoveHandler = (e) => {
//   console.log(e.clientX, e.clientY);
// };

// useEffect(() => {
//   document.addEventListener('mousemove', mouseMoveHandler);
//   return () => {
//     document.removeEventListener('mousemove', mouseMoveHandler);
//   };
// }, []);

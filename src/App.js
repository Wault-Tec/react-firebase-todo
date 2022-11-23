import './App.scss';
import { getRequest } from './api/firebaseApi';
import { TodosContext } from './context/TodosContext';
import { useEffect, useState } from "react";
import TodoList from './components/TodoList/TodoList';
import TodoInput from './components/TodoInput/TodoInput';
import dayjs from 'dayjs';
import Header from './components/Header/Header';

function App() {
    const [todos, setTodos] = useState([])

    /**
     * Send a request to the server and update to-do list
     * @returns {array} todos - to-do list
     */
    const updateTodos = async () => {
        return await getRequest().then(
            (todos) => {
                setTodos(getSortTodos(todos)) 
                return todos
            }
        )
    }

    /**
     * Function sorts the array by date ascending
     * @param {array} todos 
     * @returns {array}
     */
    const getSortTodos = (todos) => {
        const dateInMs = (date) => dayjs(date).valueOf()
        return todos.sort((a,b) => dateInMs(a.completionDate) - dateInMs(b.completionDate))
    }

    useEffect(() => {
        updateTodos()
    }, [])

    return (
        <TodosContext.Provider value={{todos, setTodos, updateTodos }}>
            <div className='app'>
            <Header />
                <div className='app__content'>
                    <div className='app__content--wrapper'>
                        <TodoInput />
                        <TodoList todos={todos}/>
                    </div>
                </div>
            </div>
        </TodosContext.Provider>
    );
}

export default App;

import TodoItem from "../TodoItem/TodoItem";
import './TodoList.scss';

const TodoList = (props) => {
    return ( 
        <ul className="list">
            {props.todos.map((todo) => (
                <TodoItem todo={todo} key={todo.id}/>
            ))}
        </ul>
     );
}
 
export default TodoList;
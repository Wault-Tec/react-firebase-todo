import { useReducer, useState, useContext } from "react";
import { TodosContext } from "../../Context/TodosContext";
import { reducer } from "../../reducer";
import { setRequest, uploadFile } from '../../api/firebaseApi';
import './TodoInput.scss'

const TodoInput = () => {
    const initialState = {
        title: '',
        description: '',
        completed: false,
        completionDate: '',
        id: null,
        fileName: null
    };

    const [todo, dispatch] = useReducer(reducer, initialState)
    const [fileUpload, setFileUpdoad] = useState(null)
    const { updateTodos } = useContext(TodosContext)

    /**
     * Function saves the data entered by the user in todo state
     * @param {event} e 
     */
    const handleChange = (e) => {
        const {name, value} = e.target
        dispatch({type:name, payload:value})
    }

    /**
     * Function saves the file uploaded by the user in fileUpload state
     * @param {event} e 
     */
    const handleUpload = (e) => {
        console.log('aaa')
        const file = e.target.files[0];
        if(file) {
            setFileUpdoad(file)
            dispatch({type:'fileName', payload:file.name})
        }
    }
    
    /**
     * Function saves todo-item info on the server and reset inputs
     * @param {event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        
        setRequest(todo)
            .then((id) => {
                updateTodos()
                if (fileUpload) {
                    uploadFile(fileUpload, id)
                }
            })
        dispatch({type:'reset'})
        setFileUpdoad(null)
    }

    return ( 
        <form onSubmit={handleSubmit} className="form">
            <input name="title" type="text" placeholder="Title" onChange={handleChange} value={todo.title} className="form__input" required />
            <textarea name="description" type="text" placeholder="Description" onChange={handleChange} value={todo.description} className="form__input form__input--textarea" />
            <div className="form__group">
                <input name="date" type="date" onChange={handleChange} value={todo.completionDate} className="form__input form__input--date" required />
                <label htmlFor="files" className="form__input form__input--files__label">
                    <span>Upload files</span>
                    <p>{fileUpload?.name}</p>
                </label>
                <input name="files" id="files" type="file" onChange={handleUpload} className=" form__input--files__input"/>
                <button type='submit' className="form__btn">
                    <span>
                    ADD
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                        <path d="M7.98373 1.45158C9.27565 1.45158 10.5386 1.83468 11.6128 2.55244C12.687 3.27019 13.5242 4.29037 14.0186 5.48395C14.513 6.67754 14.6424 7.99092 14.3903 9.25802C14.1383 10.5251 13.5161 11.689 12.6026 12.6026C11.6891 13.5161 10.5252 14.1382 9.25808 14.3903C7.99097 14.6423 6.67759 14.5129 5.484 14.0185C4.29042 13.5241 3.27025 12.6869 2.55249 11.6127C1.83473 10.5385 1.45163 9.2756 1.45163 7.98368C1.45832 6.25332 2.14867 4.59574 3.37223 3.37218C4.59579 2.14862 6.25337 1.45827 7.98373 1.45158V1.45158ZM7.98373 5.77648e-06C6.40611 0.00645971 4.86578 0.480174 3.55717 1.36134C2.24857 2.24252 1.23037 3.49164 0.631106 4.95102C0.031846 6.4104 -0.121605 8.01461 0.190125 9.56114C0.501855 11.1077 1.26479 12.5272 2.38262 13.6404C3.50044 14.7537 4.92304 15.5108 6.47082 15.8162C8.01861 16.1217 9.62218 15.9617 11.0791 15.3564C12.536 14.7512 13.781 13.7279 14.6568 12.4158C15.5326 11.1036 16 9.5613 16.0001 7.98368C16.0001 6.93249 15.7925 5.89165 15.3892 4.92089C14.986 3.95014 14.395 3.06857 13.6502 2.32679C12.9053 1.58501 12.0214 0.997618 11.049 0.598327C10.0766 0.199035 9.0349 -0.00429452 7.98373 5.77648e-06V5.77648e-06Z" fill="#F2F2F2"/>
                        <path d="M11.707 7.38128H8.4954V4.16966H7.41397V7.38128H4.19873V8.4627H7.41397V11.6743H8.4954V8.4627H11.707V7.38128Z" fill="#F2F2F2"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2114_154">
                        <rect width="16" height="16" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </form>
     );
}
 
export default TodoInput;
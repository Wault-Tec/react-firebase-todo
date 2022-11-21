import { firestore } from "../firebase";
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc  } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

/**
 * Send a request to the server and upload file
 * @param {blob} file 
 * @param {string} id 
 */
export const uploadFile = async (file, id) => {
    try {
        const storage = getStorage()
        const fileRef = ref(storage, `todos/${id}/${file.name}`)
        uploadBytes(fileRef, file).then((snapshot) => {
            console.log('Uploaded a file!');
          });
    } catch (e) {
        throw new Error(e)
    }
}

/**
 * Send a request to the server and upload file to the user device
 * @param {string} id 
 * @param {string} name 
 */
export const downloadFile = async (id,name) => {
    const storage = getStorage();
        getDownloadURL(ref(storage, `todos/${id}/${name}`)).then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (e) => {
            const blob = xhr.response;
            const link = document.createElement('a');
            document.body.appendChild(link);
            link.download = name;
            link.href = window.URL.createObjectURL(blob);
            link.click();
            document.body.removeChild(link);
        };
        xhr.open('GET', url, true);
        xhr.send();
    }).catch((e) => {
        throw new Error(e)
    })
}

/**
 * Send a request to the server and remove a file from the server
 * @param {string} id 
 * @param {string} name 
 */
export const deleteFile = async (id, name) => {
    const storage = getStorage();
    const fileRef = ref(storage, `todos/${id}/${name}`)

    deleteObject(fileRef).then(() => {
        console.log("File deleted successfully")
      }).catch((e) => {
        throw new Error(e)
      });
}

/**
 * Send a request to the server and saves todo-item info
 * @param {object} data 
 * @returns {string} id - To-do item id which was assigned on the server
 */
export const setRequest = async (data) => {
    try {
        const docRef = await addDoc(collection(firestore, "todos"),
            {
                title: data.title,
                description: data.description,
                completionDate: data.completionDate,
                completed: false,
                id: data.id,
                fileName: data.fileName
            }
        );
        console.log("Document written with ID: ", docRef.id);
        return docRef.id
    } catch (e) {
        throw new Error(e)
    }
}

/**
 * Send a request to the server and get to-do list info
 * @returns {array} todos - To-do list
 */
export const getRequest = async () => {
    try {
        const todos = [];
        const querySnapshot = await getDocs(collection(firestore, "todos"));
        querySnapshot.forEach((doc) => {
            todos.push({...doc.data(), id: doc.id})
        });
        return todos
    } catch (e) {
        throw new Error(e)
    }   
}

/**
 * Send a request to the server and remove to-do item info
 * @param {string} id - Id, which was assigned on the server
 */
export const deleteRequest = async (id) => {
    try {
        await deleteDoc(doc(firestore, "todos", id));
    } catch (e) {
        throw new Error(e)
    }   
}

/**
 * Send a request to the server and update to-do item key value
 * @param {string} id 
 * @param {string} key 
 * @param {boolean} value 
 */
export const updateRequest = async (id, key, value) => {
    try {
       const todoRef = doc(firestore, "todos", id);
       await updateDoc(todoRef, {
        [key]: value
      })
    } catch (e) {
        throw new Error(e)
    }
}


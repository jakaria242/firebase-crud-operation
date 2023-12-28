import { useEffect, useState } from 'react'
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const db = getDatabase();

  let [text, setText] = useState("")
  let [todo, setTodo] = useState([])
  let [toggolebtn, setToggolbtn ] = useState(false)
  let [todoid, setTodoid] = useState()


  let handleFrom = (e) =>{
    setText(e.target.value)
  }
  // write operation
  let handleAdd = () =>{
      set(push(ref(db, 'alltodo')), {
        todotext : text
      });
      setText(" ")
    }
  

  // read operation

  useEffect(()=>{
    const todoRef = ref(db, 'alltodo/');
    onValue(todoRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(), id:item.key})
    })
      setTodo(arr);
  });
  },[])


  // delet operation
  let handleDelet = (id) =>{
    remove(ref(db, 'alltodo/'+id)).then(()=>(
      toast('🦄 Delet Sucsessfull!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    ))
  }


  // All delet operation
  let handleClearall = () =>{
    remove(ref(db, 'alltodo'))
  }
 

  // Edit operation
  let handleEdit = (item)=>{
    setTodoid(item.id)
    setText(item.todotext)
    setToggolbtn(true)
  }
 
  // Update operation
  let handleUpdate = () => {
    update(ref(db, 'alltodo/'+ todoid),{
      todotext : text
    })
    setToggolbtn(false)
    setText(" ")
  }



  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
<ToastContainer />
    <div>
        <input placeholder='Enter your text' value={text} onChange={handleFrom} />
        {
          toggolebtn
          ?
          <button onClick={handleUpdate} >Update</button>
          :
          <button onClick={handleAdd} >Add</button>
        }
        <button onClick={handleClearall}>Clear All</button>
      
    </div>
     <ul>
      {
        todo.map((item, index)=>(
          <li key={index}>
            {item.todotext}
             <button onClick={()=> handleDelet(item.id)}>Delet</button>
             <button onClick={()=> handleEdit(item)}>Edit</button>
             </li>
        ))
      }
     </ul>
    </>
  )
}

export default App

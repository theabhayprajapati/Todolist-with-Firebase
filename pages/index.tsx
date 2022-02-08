import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { fstatSync } from 'fs'
import ReactLoading from 'react-loading';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { db } from '../Firebase'
import { TrashIcon, PencilAltIcon } from "@Heroicons/react/outline";
export default function Home() {
  const [todo, settodo] = useState<any>();
  const [loadingtype, setloadingtype] = useState('Blank');
  const [loadingColor, setloadingColor] = useState('blue')
  const [addloading, setaddloading] = useState("Blank")
  const [todos, settodos] = useState([]);
  let colRef = collection(db, 'todos')
  useEffect(() => {

    let getTodos = async () => {
      let todos = onSnapshot(colRef, (snapshot) => { settodos(snapshot.docs) })
    }
    getTodos()

  }, []);

  console.log("Todos are", todos)

  // adding todos to the firebase
  const addTodo = async () => {
    setloadingtype("balls");
    let todoVal = todo;
    setaddloading(addloading + 40)

    await addDoc((colRef), { task: todoVal, createdAt: serverTimestamp() })

    console.log("your tod is", todoVal)
    settodo('')
    setloadingtype("blank")

  }


  // deleting todos from the firebase
  const deleteTodo = async (id: string) => {
    setloadingColor('red')
    await deleteDoc(doc(colRef, id))
  }
  console.log(todo)

  // updating todos in the firebase
  const updateTodo = async (id: string, task: string) => {
    await updateDoc(doc(colRef, id), { task: 'task' })
  }
  return (
    <div>
      <Head>
        <title>Firebase Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='font-Syne p-5 '>
        {/* Navbar for todolist */}
        <nav>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Todo List</h1>
            <div className="flex">
              {/* making github type button with green backgroud color*/}
              <button className="bg-green-500 hover:#6cc644 text-white font-bold py-2 px-4 rounded-md">
                Github
              </button>
            </div>
          </div>
        </nav>
        {/* TODO HEADING */}
        <h1 className='text-2xl font-bold'>
          Add to the list
        </h1>
        {/* Loading Bar */}
        <ReactLoading type={loadingtype} color={loadingColor} height={'10%'} width={'10%'} />
        {/* TODO INPUT */}
        <div className='flex gap-4 items-center mb-5 min-w-full justify-between'>

          <input value={todo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => settodo(e.target.value)} type="text" className=" bg-yellow-50 text-yellow-900 font-semibold rounded-md p-2 w-[70%]  border-yellow-900 text hover:h-32 hover:mt-0 " />
          <button onClick={addTodo} className="bg-blue-500 active:bg-blue-400 rounded-md p-2 w-[30%] shadow-lg">
            Add
          </button>
        </div>

        {/* TODO LIST */}
        {/* showing todos to the users' */}
        <div className=''>
          {todos.length > 0 &&
            todos.map((todo: any) => {
              return (
                <div key={todo.id} className='flex items-center mb-3 '>
                  <div className='flex  items-center justify-between gap-3 bg-yellow-100 text-yellow-900 shadow-md rounded-md px-1 min-w-full '>

                    <p className='text-2xl '>
                      {todo.data().task}
                    </p>

                    <h1 className='flex w-[20%]  gap-3'>
                      <PencilAltIcon className='text-blue-500   h-8' onClick={() => { updateTodo(todo.id, todo.data().task) }} />
                      <TrashIcon onClick={() => { deleteTodo(todo.id); }} className='h-8 text-red-500' />
                    </h1>
                  </div>
                </div>)
            })
          }
        </div>
      </main>
    </div>
  )
}

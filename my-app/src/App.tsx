import { useState } from "react";
import "./App.css";
import "./index.css";

type Todo = {
  task: string;
  id: number;
  status: 'todo' | 'inprogress' | 'done' | '';
};

function App() {
  const [editStatus, setEditStatus] = useState<Todo['status']>('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editingEdit, setEditing] = useState(false);
  const [newtask, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Todo[]>([]);

  const [listprogress, setListprogess] = useState<Todo[]>([]);
  const [listdone, setListdone] = useState<Todo[]>([]);
 
  const handleSubmit = () => {
    if(newtask.trim() === "") {
      alert("Enter task");
      return;
    }
    setTasks([
      ...tasks, 
      { task: newtask, id: tasks.length + 1, status:'todo'}]);
    setTask("");
  };

  const handleEdit = (taskInfo: Todo) => {
    setTask(taskInfo.task); //cập nhật giá trị của task trong setTask ô input
    setEditTaskId(taskInfo.id);
    setEditing(true);
    setEditStatus(taskInfo.status);
  };

  const handleUpdate = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, task: newtask, status: editStatus} : task
    );

    if(editStatus !== 'todo') {
      const updatedTask = updatedTasks.find((task) => task.id === editTaskId);
    
      if(updatedTask) {
        const updateTodoList = tasks.filter((task) => task.id !== editTaskId);
        setTasks(updateTodoList);
        if (editStatus === 'inprogress') {
          setListprogess([...listprogress, updatedTask]);
        } else if (editStatus === 'done') {
          setListdone([...listdone, updatedTask]);
        }
      }
    }
    else{
      const updateTodoList = tasks.filter((task) => task.id !== editTaskId);
      setTasks(updateTodoList);

      const removeFromList = (list: Todo[]) => list.filter((task) => task.id !== editTaskId)
      setListprogess(removeFromList(listprogress))
      setListdone(removeFromList(listdone) )
    }
    setTask("");
    
  };

  const handleStatus = (status: Todo['status']) => {
    setEditStatus(status);
  }
  console.log(editStatus);  

  return (
    <div className="mx-auto mt-12 p-10 drop-shadow-xl h-full w-full">
      <div className="bg-red-400 text-white pt-0 text-left pl-10 pr-10">
        <h1 className="text-5xl font-bold pt-5 text-center">Todo List</h1>
        <p className="pt-3 pb-3 text-center">A simple React Todo List App</p>
        <hr className="border-t border-solid boder-white my-0 "></hr>
      </div>

      <div className="grid grid-cols-6">
        {/* cột 1 */}
        <div className="col-span-2 bg-red-400 text-white pt-5 text-left pl-1 pr-10 pb-5 ">
          <div>
            <h1 className="text-3xl font-bold pl-32">To do</h1>
            <input
              type="text"
              className="border border-gray-300 p-2 mt-4 text-black w-40"
              placeholder="New todo"
              value={newtask}onChange={(e) => setTask(e.target.value)}
              />
              {/* ADD TODO START */}
              {editingEdit === false ? (
              <button
                className="text-white ml-2 text-lg border-solid border-2 border-white p-1"
                onClick={handleSubmit}
              >
                Add todo
              </button>
              ) : (
                <span>
                  <button
                    className="text-white mx-1 text-lg border-solid border-2 border-white p-1"
                    onClick={handleSubmit}
                  >
                    Add todo
                  </button>
                  {/* ADD TODO END */}

                  {/* UPDATE TODO START */}
                  <button
                    className="text-white mx-1 text-lg border-solid border-2 border-white p-1"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  {/* UPDATE TODO END */}


                  {/* RADIO TODO */}
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="default-radio" 
                      className="w-4 h-4 text-blue-600" 
                      value="todo"
                      checked={editStatus === 'todo'}
                      onChange={() => {handleStatus("todo")}}
                    >
                    </input>
                    <label className="ms-2 text-sm font-medium text-white">To do</label>
                  </div>

                  {/* IMPROGRESS TODO */}
                  <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="default-radio" 
                        className="w-4 h-4 text-blue-600 mt-3 mb-3" 
                        value="inprogress"
                        checked={editStatus === 'inprogress'} 
                        onChange={() => {handleStatus("inprogress")}} 
                      >
                      </input>
                      <label className="ms-2 text-sm font-medium text-white mt-3 mb-3">Inprogress</label>
                  </div>
  
                  {/* DONE TODO */}
                  <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="default-radio" 
                        className="w-4 h-4 text-blue-600" 
                        value="done"
                        checked={editStatus ==="done"}
                        onChange={() => {handleStatus("done")}}
                        >
                      </input>
                      <label className="ms-2 text-sm font-medium text-white">Done</label>
                  </div>
                </span>
            )}

            {/* EDIT + DELETE START */}
              <div className="bg-red-400 p-3">
                <div className=" text-white">
                  {tasks.map((task, id) => (
                    <div key={id} className="grid grid-cols-6 py-2 px-1 w-80 ml-0">
                      <span className="col-span-4 text-white bg-red-300 pl-1">
                        {task.task}
                      </span>
  
                      <button
                        className="col-span-1 text-white bg-red-300"onClick={() => handleEdit(task)}
                        >
                          Edit
                        </button>
    
                        <button
                          className="col-span-1 text-white bg-red-300"
                          onClick={() => {
                            setTasks(tasks.filter((a) => a.id !== task.id)); //tạo ra 1 mảng các công việc có id khác với task.id và lọc task.id ra khỏi mảng => render lại mảng mới sau lọc
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    </div>
                </div>
              </div>
            {/* EDIT + DELETE START */}
            

            </div>
            {/* COL 2 LISTIMPROGRESS*/}
            <div className="col-span-2 bg-red-400 text-white pt-5 text-left pl-1 pr-10 pb-5 ">
              <div>
                <h1 className="text-3xl font-bold pl-32">In Progress</h1>
                <div>
                  {
                    listprogress.map((task, id) => (
                      <div key={id} className="grid grid-cols-6 py-2 px-1 w-80 ml-0">
                        <span className="col-span-4 text-white bg-red-300 pl-1">
                          {task.task}
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            {/* COL 3 LISTDONE*/}
            <div className="col-span-2 bg-red-400 text-white pt-5 text-left pl-1 pr-10 pb-5 ">
              <div>
                <h1 className="text-3xl font-bold pl-32">Done</h1>
                <div>
                  {
                    listdone.map((task, id) => (
                      <div key={id} className="grid grid-cols-6 py-2 px-1 w-80 ml-0">
                        <span className="col-span-4 text-white bg-red-300 pl-1">
                          {task.task}
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
    
        </div>
      );
    }
    
    export default App;
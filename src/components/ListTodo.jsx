import React, {useEffect, useState} from 'react';
import { getTodos, todoSelector, saveTodo, updateTodo, deleteTodo } from '../redux/features/todoSlice';
import ModalAddTodo from './ModalAddTodo'
import { useDispatch, useSelector } from 'react-redux';
import ModalEditTodo from './ModalEditTodo';

const ListTodo = () => {
    const todo = useSelector(todoSelector.selectAll);
    //add
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('');
    const [alert, setAlert] = useState('')
    const [display, setdisplay] = useState('d-none')    
    const handleClose = () => setShow(false);    
    const handleShow = () => setShow(true);
    const handleSave = async(e) => {
        e.preventDefault();
        if(task == '' || status == ''){
            setAlert('Values not be empty');
            setShow(true)
            setdisplay('')
        }else{
            await dispatch(saveTodo({task, status}));            
            setShow(false)
            setTask('');
            setStatus('');
            setAlert('');
            setdisplay('d-none');
        }
   }

    //edit
    const [showEdit, setShowEdit] = useState(false);    
    const [taskEdit, setTaskEdit] = useState('');
    const [statusEdit, setStatusEdit] = useState('');
    const [id, setId] = useState('');


    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (todo) =>{
        setTaskEdit(todo.task);
        setStatusEdit(todo.status);
        setId(todo.id)
        setShowEdit(true);
    } 
    const handleSaveEdit = async(e) => {
        e.preventDefault()
        if(taskEdit == '' || statusEdit == ''){
            setAlert('Values not be empty');
            setShowEdit(true)
            setdisplay('')
        }else{
            await dispatch(updateTodo({id, task : taskEdit, status: statusEdit}))
            await dispatch(getTodos());
            setShowEdit(false)
            setAlert('');
            setdisplay('d-none');
        }
    }    

    const confirmDelete = (id)=>{
        if(window.confirm('Yakin mau hapus'))
        dispatch(deleteTodo(id))
    }

    useEffect(() => {
        dispatch(getTodos());
     }, [dispatch]);


    return (
        <>
        <div className='container mt-5'>
            <button className='btn btn-primary btn-sm' onClick={handleShow}>Add New</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Task</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map((todo, index)=>(
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{todo.task}</td>
                            <td>{todo.status}</td>
                            <td>
                                <button className='btn btn-success btn-sm' onClick={()=>handleShowEdit(todo)}>Edit</button>
                                <button className='btn btn-danger btn-sm ms-1' onClick={()=>confirmDelete(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <ModalAddTodo
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        handleSave={handleSave}
        setTask={setTask}
        setStatus={setStatus}
        alert={alert}
        display={display}
        title="Add Todo"
      />
      <ModalEditTodo
       showEdit={showEdit}
       handleShowEdit={handleShowEdit}
       handleCloseEdit={handleCloseEdit}
       taskEdit={taskEdit}
       statusEdit={statusEdit}
       setTaskEdit={setTaskEdit}
       setStatusEdit={setStatusEdit}
       handleSaveEdit={handleSaveEdit}
       alert={alert}
       display={display}
       titleEdit="Edit Todo"
      />
        </>
    );
}

export default ListTodo;

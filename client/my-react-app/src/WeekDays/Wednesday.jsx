import React , {useState} from "react" ;
import ReactDom from "react-dom" ;
import axios from "axios" ;

function Wednesday(props){
    const user_id = props.id ;
    const day = "Wednesday" ;
    console.log(props.id + "Entered into monday page") ;
    const [pendingTasks , setPendingTasks] = useState([]) ;
    const [postponedTasks , setPostponedTasks] = useState([]) ;
    const [completedTasks , setCompletedTasks] = useState([]) ;
    const [task_info , setTaskInfo] = useState("") ;
    const pendingArr = [] ;
    const postponedArr = [] ;
    const completedArr = [] ;
    async function FetchData(){
        try{
           const result = await axios.post("http://localhost:5000/getWednesdayTasks" , {user_id}) ;
           console.log(result.data) ;
           const tasks = result.data.tasks.rows ;
           tasks.forEach(task => {
            if(task.task_status == "pending"){
                pendingArr.push(<li>{task.task_description}</li>) ;
            }
            else if(task.task_status == "completed"){
                completedArr.push(<li>{task.task_description}</li>) ;
            }
            else{
                postponedArr.push(<li>{task.task_description}</li>)
            }
        });
        setPendingTasks(pendingArr) ;
        setPostponedTasks(postponedArr) ;
        setCompletedTasks(completedArr) ;
        }
        catch(error){
            //console.log(error.response.status);
            console.log(error) ;
        }
    }

    React.useEffect(()=>{FetchData()} , [user_id]) ;

    const HandleTaskInfo = (e) => {
        setTaskInfo(e.target.value);
    };

    async function AddTask(){
        try{
            const result = await axios.post("http://localhost:5000/addNewTask" , {
                user_id ,
                task_info,
                day : "wednesday" 
            }) ;
            console.log("Task Added") ;
            setPendingTasks(prevPendingTasks => [...prevPendingTasks, <li>{task_info}</li>]);
            setTaskInfo("") ;
        }
        catch(error){
            console.log(error) ;
        }
    }

    return (
       <div>
         <h1>Wednesday</h1>
        <input
        className="taskInput"
        name="tasktype"
        type="text"
        placeholder="typehere"
        onChange={HandleTaskInfo}
        value={task_info}
        ></input>
        <button type="button" onClick={AddTask}>Add</button>
        <div className="task-Lists">
            <div className="ToBeDone-List">
                <h2>Tasks to be done</h2>
                {pendingTasks}
            </div>
            <div className="Postponed-List">
                <h2>Postponed tasks</h2>
                {postponedTasks}
            </div>
            <div className="Completed-List">
                <h2>Completed tasks</h2>
                {completedTasks}
            </div>
        </div>
      </div>
    )
}

export default Wednesday ;
import { useState } from 'react';
import './TaskTracker.css';
const TaskTracker = () => {

    //Here we are declaring states of the input fields 
    const [taskName, setTaskName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [priority, setPriority] = useState("")
    const [progress, setProgress] = useState("")

    //state for tracking the number of tasks
    const [tasks, setTasks] = useState([]);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(10);

    // States for edit mode
    const [editMode, setEditMode] = useState(false);
    const [editTask, setEditTask] = useState(null);


    // Function to handle pagination
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            const updatedTask = {
                taskName: taskName,
                startDate: startDate,
                endDate: endDate,
                priority: priority,
                status: calculateStatus(startDate, endDate),
                addedOn: tasks[editTask].addedOn,
            };
            const updatedTasks = [...tasks];
            updatedTasks[editTask] = updatedTask;
            setTasks(updatedTasks);
            setEditMode(false);
            setSuccessMessage("Task updated successfully.");
        } else {
            const newTask = {
                taskName: taskName,
                startDate: startDate,
                endDate: endDate,
                priority: priority,
                status: progress,
                addedOn: new Date(),
            };
            setTasks([...tasks, newTask]);
            setSuccessMessage("Task added successfully.");
        }
        setTaskName("");
        setStartDate("");
        setEndDate("");
        setPriority("");
    };

    // Function to calculate status based on start and end dates
    const calculateStatus = (start, end) => {
        const currentDate = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (currentDate < startDate) {
            return "Not Yet";
        } else if (currentDate >= startDate && currentDate <= endDate) {
            return "In Progress";
        } else {
            return "Completed";
        }
    };

    // Function to handle task deletion
    const handleDelete = (index) => {
        if (window.confirm(`Do you really want to delete ${tasks[0].taskName}?`)) {
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1);
            setTasks(updatedTasks);
            setSuccessMessage("Task deleted successfully.");
        }
    };

    // State for success message
    const [successMessage, setSuccessMessage] = useState("");

    // Function to handle edit button click
    const handleEdit = (index) => {
        setEditMode(true);
        setEditTask(index);
        setTaskName(tasks[index].taskName);
        setStartDate(tasks[index].startDate);
        setEndDate(tasks[index].endDate);
        setPriority(tasks[index].priority);
    };



    // const handleDelete = (index) => {
    //     alert(`Do you really want to delete`)
    //     const newTasks = [...tasks];
    //     newTasks.splice(index, 1);
    //     setTasks(newTasks);
    // };

    return (
        <div className="Body">

            <h1>Task Tracker</h1>
            <form onSubmit={handleSubmit}>
                <label>Task Name: <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} /></label>
                <label>
                    Start Date:
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <label>
                    Priority : <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="SELECT">SELECT</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="low">High</option>
                    </select>
                </label>
                <label>
                    Progress : <select value={progress} onChange={(e) => setProgress(e.target.value)}>
                        <option value="SELECT">SELECT</option>
                        <option value="not-yet">Not Yet</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                </label>
                <button type="submit">{editMode ? 'Update' : 'Add'}</button>
            </form>

            <input type="text" placeholder="Search" />
            <select>
                {/* <label>
                    Progress : <select value={progress} onChange={(e)=>setProgress(e.target.value)}>
                
                <option value="not-yet">Not Yet</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                </select>

                </label> */}

            </select>

            <table>
                <thead>
                    <tr>

                        <th>Sl No</th>
                        <th>Task Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map((task, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{task.taskName}</td>
                            <td>{task.startDate}</td>
                            <td>{task.endDate}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                            <td>{task.addedOn.toLocaleString()}</td>
                            <td>{task.progress}</td>
                            <td>
                                {/* <button onClick={handleEdit}>Edit</button> */}
                                {/* <button onClick={handleUpdate}>update</button> */}
                                {/* <button onClick={handleDelete}>Delete</button> */}
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            

        </div >
    );
}

export default TaskTracker;


import React from 'react'
import ReactDOM from 'react-dom'
import Pokemon from './components/Pokemon.js'
import {sendQuery} from './utils'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

// Get unique ID for each task
const getRandomInt = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Custom hook to use local storage
const useStickyState = (defaultValue, key) => {
const [value, setValue] = React.useState(() => {
const stickyValue = window.localStorage.getItem(key);
return stickyValue !== null
  ? JSON.parse(stickyValue)
  : defaultValue;
});

React.useEffect(() => {
window.localStorage.setItem(key, JSON.stringify(value));
}, [key, value]);
return [value, setValue];
}

const Task = (props) => {
const {type, allTasks, setAllTasks, prev, next} = props
const classname = `${type}Div`
const [taskValue, setTaskValue] = React.useState('')
let id = React.useRef(0)

const handleDeleteTask = (e) => {
    const ifDelete = confirm('Are you sure you want to remove it?')
    if (ifDelete) {
        const filtered = allTasks.filter((task) => task.id !== e.target.id)
        setAllTasks(filtered)
    }
}

const handleSwap = (e) => {
    const selectedTask = allTasks.filter((task) => task.id === e.target.id)[0]
    const newType = e.target.className.includes('right') ? next : prev

    // remove old
    const filtered = allTasks.filter((currentTask) => currentTask.id !== selectedTask.id)

    id.current = getRandomInt()
    const newTask = {id: id.current, type: newType, taskValue: selectedTask.taskValue}
    setAllTasks([...filtered, newTask])
}

const handleSubmit = (e) => {
    e.preventDefault()
    if (taskValue == '') return
    id.current = getRandomInt()

    // add new task
    setAllTasks([...allTasks, {id: id.current, type, taskValue}])
    // clear the value
    setTaskValue('')
}
    return (
        <div className={classname}>
        <div className={type} style={{color:"white", textAlign: "center", fontSize: 22, padding: 10, margin: "auto"}} > {type} </div>
        <div className="output"> 
            {allTasks.map(({id, type, taskValue}) => {
            if (type === props.type) {
            return (  
                <div className="task" key={id} id={id}>
                    <div className="lefts" id ={id} onClick={handleSwap} > {prev ? '<' : ''} </div>  
                    <div className="li" id={id} onClick={handleDeleteTask}> {taskValue} </div>
                    <div className="rights" id={id}  onClick={handleSwap}> {next ? '>' : ''} </div>                                 
                </div>
            )} 
            
        })}
        </div>
        <div className="form">
            <textarea rows="6" value={taskValue} onChange= {(e) => setTaskValue(e.target.value)}> </textarea>
            <button className="submit" onClick={handleSubmit}> Submit </button>
        </div>
    </div>
    )
}

const board = [
    { type: 'todo', prev: '', next: 'doing' },
    { type: 'doing', prev: 'todo', next: 'done' },
    { type: 'done', prev: 'doing', next: 'approved' },
    { type: 'approved', prev: 'done', next: '' }
]

const KanbanBoard = () => {
const [allTasks,setAllTasks] = useStickyState([], "tasks")

return (
        <div className="body"> 
            {board.map((task, i ) => {
                const { type, prev, next } = task
                return <Task type={type} allTasks={allTasks} setAllTasks={setAllTasks} prev={prev} next={next} key={i}/>
         })}
        </div>
    ) 
}

/////////////////////////////////////////// STARS /////////////////////////

const Star = ({id, selected, setSelected, clicked, setClicked, title}) => {

function handeMouseOver() {
if (clicked) return 
setSelected(id)
}
function handleClick () {
if (clicked) return 
setClicked(id)
sendQuery(`mutation {rate(title: "${title}", rating: "${id}"){lessons{title,rating}}}`).then((data) => {
location.reload()
})

}
return (
<i className={selected >= id ? 'fas fa-star' : 'far fa-star'} onMouseEnter={handeMouseOver} onClick={handleClick} > </i>
)}

const Stars = ({stars, rating, title}) => {
const [selected, setSelected] = React.useState(rating || 0)
const [clicked, setClicked] = React.useState(rating || 0)

return (
<div onMouseEnter={() => setClicked(0)}>
{stars.map((id) => {
return (
    <Star key={id} 
    id={id} 
    setSelected={setSelected} 
    selected={selected} 
    clicked={clicked} 
    setClicked={setClicked} 
    title={title}/>
)
})}
<p> {clicked ? `You have given ${clicked} stars!` : null} </p>
</div>
)
}

const App = () => {
const path = window.location.pathname.split('/').pop()
if (path === 'stars') return <Stars stars={[1,2,3,4,5]}/>
if (path === 'kanban') return <KanbanBoard />
return <Pokemon />
}

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

ReactDOM.render( 
<ApolloProvider client={client}>
    <App />
</ApolloProvider>,
document.getElementById('root')
);

export default Stars;
import React from 'react'
import {sendQuery} from '../utils'
import Stars from '../index.js'


const User = ({user}) => {
    const [enrolled, setEnrolled] = React.useState(user.lessons)
    const [unenrolled, setUnenrolled] = React.useState([])
    React.useEffect(() => {
        sendQuery(`{lessons{title, rating}}`).then((data) => {
            const enrolledTitles = enrolled.map((l)=>l['title'])
            // filter data, if it is not enrolled already, put it into unenrolled array
            setUnenrolled(data.lessons.filter(lesson => !enrolledTitles.includes(lesson.title)))
        })
        
    },[])

    const handleUnenroll = (e) => {
        const title = e.target.innerText
        let rating = 0
        sendQuery(`{user{lessons {title,rating}}} `).then((data) => {
            rating = data.user.lessons.filter((l) => l['title'] === title)[0].rating
        })
        sendQuery(`mutation {unenroll(title: "${title}"){name, image}}`).then(() => {
                setUnenrolled([...unenrolled, {title, rating}])
                setEnrolled(enrolled.filter((lesson) => lesson.title !== title))
        })
    
    }

    const handleEnroll = (e) => {
        const title = e.target.innerText
        sendQuery(`mutation {enroll(title: "${title}"){lessons{title, rating}}}`).then((data) => {
            console.log(data)
            const rating = data.enroll.lessons.filter((l) => l['title'] === title)[0].rating
            setEnrolled([...enrolled, {title, rating}])
            setUnenrolled(unenrolled.filter((lesson) => lesson.title !== title))
        })
    }
    
return (
<div>
    <h1> {user.name} </h1>
    <img src={user.image} alt="pp" />
    <hr />

    <h1> Enrolled </h1>
    <h5> Click to Unenroll </h5>
    <div> 
        {enrolled.map((lesson, i) => (
            <div>
            <h4 className='pointer' onClick={handleUnenroll} key={i}>
                {lesson.title}
            </h4>
            <p> / Rating: {lesson.rating | null} </p>
            <Stars stars={[1,2,3,4,5]} rating={parseInt(lesson.rating)} title={lesson.title}/>
            </div>
        ))}

    </div>
    <hr /> 

    <h1> Unenrolled </h1>
    <h5> Click to Enroll </h5>
    <div>
        {unenrolled.map((lesson, i) => (
            <h4 className='pointer' onClick={handleEnroll} key={i}>
                {lesson.title} 
            </h4>
        ))}
    </div>
</div>
)}

export default User
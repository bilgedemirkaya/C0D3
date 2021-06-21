import React from 'react'
import {GET_LESSONS, GET_USER, ENROLL, UNENROLL, RATE} from '../utils'
import Stars from '../index.js'
import { useQuery, useMutation } from '@apollo/client';

const User = ({user}) => {
    const [enrolled, setEnrolled] = React.useState(user.lessons)
    const [unenrolled, setUnenrolled] = React.useState([])
    const { loading, error, data:lessonData } = useQuery(GET_LESSONS)
    const { l, data: userData } = useQuery(GET_USER);
    const [enroll] = useMutation(ENROLL)
    const [unenroll] = useMutation(UNENROLL)
    const [rate] = useMutation(RATE)


    React.useEffect(() => {
        if (lessonData && userData && userData.user) {
            const enrolledLessons = userData.user.lessons
            const enrolledTitles = enrolledLessons.map((l) => l['title'])
            setEnrolled(enrolledLessons)
            setUnenrolled(lessonData.lessons.filter(lesson => !enrolledTitles.includes(lesson['title'])))
        }
    },[lessonData, userData])


    const handleUnenroll = (e) => {
        const title = e.target.innerText
        const rating = enrolled.filter((l) => l['title'] === title)[0]?.rating
        unenroll({variables: {title}})
        setUnenrolled([...unenrolled, {title, rating}])
        setEnrolled(enrolled.filter((lesson) => lesson.title !== title))
    }

    const handleEnroll = (e) => {
        const title = e.target.innerText
        
        enroll({variables: {title}})
        const rating = unenrolled.filter((l) => l['title'] === title)[0]?.rating?.toString()
        if (rating) {
            // save the previous rating to database
            rate({variables: {title, rating}})
        }
        
        setEnrolled([...enrolled, {title, rating}])
        setUnenrolled(unenrolled.filter((lesson) => lesson.title !== title))
    }

if (loading || l) return 'Loading...';
if (error) return error;

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
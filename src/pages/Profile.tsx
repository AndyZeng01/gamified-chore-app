import { usePoints } from "../PointsContext";

function Profile() {
    const {counter, allPoints, maxStreak} = usePoints(); 
    return (
        <div className="profile">
            <h1> Tasks Completed: {counter}</h1>
            <h1> All Time Score: {allPoints}</h1>
            <h1> Longest Streak: {maxStreak}</h1>
        </div>
        
    )
}

export default Profile
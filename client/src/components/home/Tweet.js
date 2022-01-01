// > The Tweet object that we broke apart to give it its own function
import Axios from 'axios'
import React, {useContext, useEffect} from 'react'

import UserContext from '../../context/UserContext'

import './Tweet.scss'

function Tweet({tweetData, getTweetsFunction}){
    
    const {user, setUserObject} = useContext(UserContext)
    
    async function deleteTweet(){
        if(window.confirm('Do you want to delete this Tweet?')){
            await Axios.delete(`http://localhost:5000/tweet/${tweetData._id}`)
        }

        getTweetsFunction()
    }
    
    

    return(
        <div className="tweet">
            {<h2 className='header'>{tweetData.user.username}</h2>}
            
            {tweetData.message && <p className='message'>{tweetData.message}</p>}
            {user === tweetData.user._id && (
                <button className='btn-delete' onClick={deleteTweet}>Delete</button>
            )
            }
            
        </div>
    )
}

export default Tweet
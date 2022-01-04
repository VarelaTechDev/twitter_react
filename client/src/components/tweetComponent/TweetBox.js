import React, {useState, useEffect, useContext} from "react";
import './TweetBox.scss'
import UserContext from "../../context/UserContext";

const Axios = require('axios')

function TweetBox({getTweetsFunction: getTweets}) {
    
    const[tweetMessage, setTweetMessage] = useState('')

    const [didSubmit, setDidSubmit] = useState(false)
    
    const {user} = useContext(UserContext)
    

    useEffect(()=>{
        setTweetMessage('')
        setDidSubmit(false)
    }, [didSubmit])

    async function submitTweet(e){
        e.preventDefault()
        console.log(user)
        const tweetData = {
            header: user.validatedUser_id,
            message: tweetMessage
        }
        
        try{
            await Axios.post('http://localhost:5000/tweet', tweetData)
            setDidSubmit(true)
        }catch(err){
            return
        }

        getTweets()
    }
    
    return  (
        <section className="submit-tweet-box">
            <form className='form' onSubmit={submitTweet}>
                <div className="pfp-text">
                    <div className="pfp">
            
                    </div>
                    
                    <div className="text-input">
                        <input
                            id='tweet-message' 
                            value={tweetMessage} 
                            placeholder="What's happening?"
                            onChange={(e)=> setTweetMessage(e.target.value)}
                        />
                    </div>
                </div>
                <div className="misc">
                    <button className='btn-submit' type='submit'>Tweet</button>
                </div>
                
            </form>
        </section>
    )
};

export default TweetBox;
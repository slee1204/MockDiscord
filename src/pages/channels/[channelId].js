import { getAllMessages } from "@/database";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Channel({channelId, messages: initialMessages}){

    const [userName, setUserName] = useState('');
    const [text, setText] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    // const [loading, setLoading] = useState(false);


    useEffect(() => {
        const interval = setInterval(async() => {
            const result = await axios.get(`/api/channels/${channelId}/messages`);
            const newMessages = result.data;
            setMessages(newMessages);
        }, 1000);
        return () => clearInterval(interval);
    }, [channelId]);
    



    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log('submit', userName, text);

        const result = await axios.post(`/api/channels/${channelId}/messages`, {
            userName, text
        })
        const newMessage = result.data
        //append a new message to the messages array
        setMessages([...messages, newMessage]);
        // setLoading(false);
    }

    return(
        <div>
            <h1>Channel {channelId}</h1>
            {messages.map((message) => {
                return(
                    <div key={message.id}>
                        <p>{message.text}</p>
                    </div>
                ) 
            })}
            <form onSubmit={handleSubmit}>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context){
    const channelId = context.query.channelId;
    const messages = await getAllMessages(channelId);
    return {
        props: {
            channelId,
            messages: JSON.parse(JSON.stringify(messages))
        }
    }
}
import {useState, useEffect} from 'react';
import axios from 'axios';
import { getAllChannels } from '@/database';
import Link from 'next/link';


export default function Channels({channels}){

    // const [channels, setChannels] = useState([]);

    //anything in useEffect will run on the client in the browser
    //useEffect will load empty array on first render
    //then it will load the channels array
    // useEffect(() => {
    //     axios.get('/api/channels')
    //     .then((response) => {
    //         setChannels(response.data);
    //     })
    // }, []);

    //Get request to api channels
    //useState
    //useEffect
    return(
        <div>
            <h1>Channels</h1>
            {channels.map((channel) => {
                return(
                    <div key={channel.id}>
                        <p><Link href={`/channels/${channel.id}`}>{channel.name}</Link></p>
                    </div>
                )
            })}
        </div>
    )
}

async function wait(ms){
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}



export async function getServerSideProps() {

    //always runs on the server side
    //we can run the call directly from api folder

    await wait(5000);
    const channels = await getAllChannels();

    return {
        props: {
            channels: JSON.parse(JSON.stringify(channels))
        }
    }
}
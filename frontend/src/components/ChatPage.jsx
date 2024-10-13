import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [groups, setGroups] = useState([]);

    const fetchChats = async () => {
        const backend_url = "http://localhost:5002";
        const response = await axios.get(`${backend_url}/group`)
        console.log(response.data);
        setGroups(response.data);
    }

    useEffect(() => {
        fetchChats();
    }, []);
    
    return (
    <>
    <h1>Chat Page</h1>
    {/* Display data here */}
    {groups?.map( each_group => (
        <div key={each_group._id}>
        <h2>{each_group.name}</h2>
        <p>Admin: {each_group.admin}</p>
        <p>Participants: {each_group.participants.map((participant) => participant).join(', ')}</p>
        <p>Last Message: {each_group.lastMessage}</p>
        <br />
        </div>

    ))}
    </>
    )
}

export default ChatPage;

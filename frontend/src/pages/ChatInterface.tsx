import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import InviteComponent from '../components/InviteComponent'
import Invites from '../components/Invites'

const MessageComponent = ({ sender, message }: { sender: string, message: string }) => {
    const { username } = useParams();
    const messageStyle = sender === username ? 'justify-end bg-blue-100' : 'bg-slate-200';

    return (
        <div className={`w-full flex ${messageStyle}`}>
            <div className={`text-left max-w-[70%] p-3 rounded-md break-words ${messageStyle}`}>
                {message}
            </div>
        </div>
    )
}

// TODO: in ChatInterface, let's also add another section for invites
// decline invite option -> create a delete invites route

export default function ChatInterface() {
    const [messages, setMessages] = useState([{ sender: 'chatbot', message: 'Hi there! What movie review questions do you have?' }]);
    const [input, setInput] = useState<string>('');
    const { username } = useParams();
    const [invites, setInvites] = useState([]);
    const navigate = useNavigate(); 

    const feed = () => {
        navigate('/' + username + '/home');
    };
    const friends = () => {
        navigate("/"+ username+"/friends");
    };

    const createChatroom = () => {
        navigate('/' + username + '/createChat');
    };

    const testInvites = [
        { inviteeName: 'Joanna', chatroomName: 'NETS2120' },
        { inviteeName: 'Iain', chatroomName: 'NETS2121' },
        { inviteeName: 'Linda', chatroomName: 'NETS2122' }
    ];

    useEffect(() => {
        fetchInvites();
    }, []);

    const fetchInvites = async () => {
        try {
            // edit this part to use the correct axios call
            // const response = await axios.get(`/api/invites/${username}`);
            // setInvites(response.data.invites);

            // for now let's do dummy variables
            setInvites(testInvites);
        } catch (error) {
            console.error('Error fetching invites:', error);
        }
    };

    // create a function called getChats or something here

    const sendMessage = async () => {
        // TODO: add the user's message to the messages state 
        setMessages([...messages, {sender : username, message: input}]);
        console.log('input: ', input);
        console.log('messages: ', messages);
        
        // TODO: make a call to postText route in backend
        try {
            await axios.post('/postText', {
                message: input
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }

        // TODO: make a call to the getMovies route 
        // try {
        //     const response = await axios.get(`/${username}/movies`, {
        //         params: {
        //             message: input
        //         }
        //     });
        //     setMessages([...messages, { sender: 'chatbot', message: response.data }]);
        // } catch (error) {
        //     console.error('Error sending message:', error);
        // }
        setInput('');
    }

    // accepting invite
    const handleAcceptInvite = async () => {
        try {
          // Make a request to update the confirmed status in the invites table
        //   await axios.post('/api/acceptInvite', { inviteId: 'your_invite_id' });
          // Optionally, update the UI or state to reflect the acceptance
        } catch (error) {
        //   console.error('Error accepting invite:', error);
        }
      };

    return (
        <div className='w-screen h-screen flex flex-col items-center'>
        <div className='w-full h-16 bg-slate-50 flex justify-center mb-2'>
            <div className='font-bold text-2xl max-w-[1800px] w-full flex items-center'>
                Chat with your PennstaFriends, {username} ! &nbsp;
            <button type="button" className='px-2 py-2 rounded-md bg-blue-500 outline-none text-white'
              onClick={feed}>Feed</button>&nbsp;
            <button type="button" className='px-2 py-2 rounded-md bg-blue-500 outline-none text-white'
              onClick={friends}>Friends</button>
            </div>
        </div>
            <div className='font-bold text-3xl'>Chatroom</div>
            <div className="p-4 w-full flex items-center justify-between bg-blue-200">
            <button className='px-2 py-2 rounded-md bg-blue-500 outline-none text-white' onClick = {createChatroom}>Create Chatroom</button>
            {/* You can add toolbar content here */}
            </div>
            <div className='flex'> {/* Add a container div */}
            <div className='w-1/3'> {/* First div */}
                    <div className='font-bold text-2xl'>Your Invites</div>
                    <Invites  invites={invites} ></Invites>
                    {/* <InviteComponent onClick={handleAcceptInvite} inviteeName={'Joanna'} chatroomName={'NETS2120'}/> */}
                </div>
                <div className='w-1/3'> {/* First div */}
                    <div className='font-bold text-2xl'>Your Chats</div>
                    <div className='h-[40rem] w-100% bg-blue-100 p-3'></div>
                </div>
                <div className='w-1/3'> {/* Second div */}
                    <div className='font-bold text-2xl'>INSERT CHAT TITLE</div>
                    <div className='h-100% w-[30rem] bg-slate-100 p-3'>
                <div className='h-[90%] overflow-scroll'>
                    <div className='space-y-2'>
                        {messages.map(msg => {
                            return (
                                <MessageComponent sender={msg.sender} message={msg.message} />
                            )
                        })}
                    </div>
                </div>
                <div className='w-full flex space-x-2'>
                    <input className='w-full outline-none border-none px-3 py-1 rounded-md'
                        placeholder='Ask something!'
                        onChange={e => setInput(e.target.value)}
                        value={input}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                sendMessage();
                                setInput('');
                            }
                        }} />
                    <button className='outline-none px-3 py-1 rounded-md text-bold bg-indigo-600 text-white'
                        onClick={() => {
                            sendMessage();
                        }}>Send</button>
                </div>
            </div>
                </div>
            </div>
            
        </div>
    )
}

import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import config from '../../config.json';
// import InviteComponent from '../components/InviteComponent'
import CreateChatComponent from '../components/chats/CreateChatComponent';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';

export default function CreateChat() {

  const { username } = useParams();
  const rootURL = config.serverRootURL;

  const navigate = useNavigate(); 

  const friends = () => {
      navigate("/"+ username+"/friends");
  };

  const chat = () => {
    navigate("/"+ username+"/chat");
  };
  
    // TODO: add state variable for posts
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
    // TODO: fetch posts data and set appropriate state variables 
      const postsRes = await axios.get(`${rootURL}/${username}/feed`);
      setPosts(postsRes.data.results);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
    useEffect(() => { 
        fetchData();
    }, []);

  return (
    <div className='w-screen h-screen'>
      <NavBar username={username}></NavBar>
        <div className='w-full h-5 bg-slate-50 flex justify-center mb-2'>
            {/* <div className='text-2xl max-w-[1800px] w-full flex items-center'>
                Pennstagram - {username} &nbsp;
                <button type="button" className='px-2 py-2 rounded-md bg-gray-500 outline-none text-white'
              onClick={friends}>Friends</button>&nbsp;
                <button type="button" className='px-2 py-2 rounded-md bg-gray-500 outline-none text-white'
              onClick={chat}>Chat</button>

            </div> */}
        </div>
        
        <div className='h-full w-full mx-auto max-w-[1800px] flex flex-col items-center space-y-4'>
          <CreateChatComponent updatePosts={fetchData} />
        </div>
    </div>
  )
}

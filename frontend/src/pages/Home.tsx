import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import SideBar from '../components/SideBar';
import AuthContext from '../contexts/AuthContext';
import ChatContext from '../contexts/ChatContext';
import MessageContext from '../contexts/MessageContext';
import { User } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

function Home() {

    const [display, setDisplay] = useState(true);

    const socket = React.useRef<Socket>(null!);

    const { setMessages } = React.useContext(MessageContext);
    const { render } = React.useContext(ChatContext);

    const [onlineUser, setOnlineUser] = React.useState([]);

    const { state } = React.useContext(AuthContext);

    const { user } = state;
    const currentUser = user as User;

    const notify = () => {
        toast("You recieved a new message!");
      };

    React.useEffect(() => {
        socket.current = io("http://localhost:9000");
        socket.current.emit("add-new-user", currentUser?.id);
        socket.current.on("get-online-users", (activeUsers) => {
            setOnlineUser(activeUsers);
        })
    }, [currentUser]);


    React.useEffect(() => {
        socket.current.on("receive-message", data => {
            notify()
            console.log(data)
          setMessages(prev => (
            [...prev, data]
          ))
        });

        socket.current.on("is-online", data => {
            console.log(data)
        });

        if (window.innerWidth <= 1200) {
            setDisplay(false);
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth <= 1200) {
                setDisplay(false);
            }
        })
    }, []);
    

    return (
        <div className='flex justify-center items-center h-screen'>
             <ToastContainer /> 
            {
                window.innerWidth > 1200 ? (
                    <div className='flex justify-center w-[90%] h-[500px]'>
                        <SideBar />
                        <ChatBox socket={socket} />
                    </div>
                ) : <>
                {
                    render ? <SideBar /> : <div className='flex justify-center w-full h-[500px]'><ChatBox socket={socket} /></div>
                }
                </>
            }

        </div>
    );
}

export default Home;
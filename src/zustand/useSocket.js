import useConversation from '@/zustand/useConversation.js'
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (userId) => {
    const socketRef = useRef();
    const { setMessages } = useConversation();

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:3000');

        socketRef.current.on('message', (newMessage) => {
            setMessages((oldMessages) => [...oldMessages, newMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [userId, setMessages]);

    const sendMessage = (recipientId, text) => {
        socketRef.current.emit('message', { userId, recipientId, text });
    };

    return { sendMessage };
};
export default useSocket;
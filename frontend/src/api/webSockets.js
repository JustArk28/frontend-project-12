import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
// import { addMessages } from "../slices/messagesSlice";
import { addMessage } from '../slices/messagesSlice';
import io from "socket.io-client";

const runSocket = () => {
  const socket = io();
  const dispatch = useDispatch();
  socket.on("newMessage", (payload) => {
        // Испольуем callback (prev => ...), чтобы не потерять сообщения
        dispatch(addMessage(payload));
        // setNewMessages((prevMessages) => [...prevMessages, payload]);
      });
      return () => {
      socket.off("newMessage");
    };
  // const [messages, setMessages] = useState([])
  // console.log(messages)
  // useEffect(() => {
  //   // Подписываемся на событие 'message'
  //   socket.on('message', (payload) => {
  //     // Испольуем callback (prev => ...), чтобы не потерять сообщения
  //     setMessages((prevMessages) => [...prevMessages, payload]);
  //   });
    
  //   // Важно: отписываемся от события при размонтировании компонента
  //   return () => {
  //     socket.off('message');
  //   };
  // }, []);

};

export default runSocket;
import { useState, useEffect, useRef } from "react";
import "/src/assets/css/style.css";
import { Tab } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import routes from "../../routes";
import {
  getChannels,
  addChannel,
  editChannelName,
  removeChannel,
} from "../../slices/channelsSlice";
import { getMessages, addMessage } from "../../slices/messagesSlice";
import AddChannelModal from "../Modals/AddChannelModal";
import RenameChannelModal from "../Modals/RenameChannelModal";
import RemoveChannelModal from "../Modals/RemoveChannelModal";
import io from "socket.io-client";
import { useTranslation } from "react-i18next";
import ChannelsList from "./ChannelsList";
import MessagesBox from "./MessagesBox";
import MessagesForm from "./MessagesForm";

const socket = io();

const ChatPage = () => {
  const { t } = useTranslation();
  const [currentChannelId, setCurrentChannelId] = useState("1");
  const [inputFocus, setInputFocus] = useState(true);
  const [currentChannel, setCurrentChannel] = useState({});
  const [showRename, setShowRename] = useState(false);
  const handleCloseRename = () => setShowRename(false);
  const handleShowRename = () => setShowRename(true);

  const [showRemove, setShowRemove] = useState(false);
  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = () => setShowRemove(true);

  const { token } = useSelector((state) => state.authStore);
  const channels = useSelector((state) => state.channelsStore.channels);
  const messages = useSelector((state) => state.messagesStore.messages);

  console.log("state", messages);
  // console.log("mfr", messagesForRoom);
  // console.log("mes", newMessages);
  console.log("chan", channels);
  // console.log('local', localStorage)
  // console.log('', newChannelName)
  const dispatch = useDispatch();

  // const inputRef = useRef(null);

  const handleRename = (e) => {
    const channel = channels.find((channel) => channel.id === e.target.id);
    setCurrentChannel(channel);
    handleShowRename();
  };

  const handleRemove = (e) => {
    const channel = channels.find((channel) => channel.id === e.target.id);
    setCurrentChannel(channel);
    handleShowRemove();
  };
  // console.log("CС", currentChannel);
  // useEffect(() => {
  //   inputFocus ? inputRef.current.focus() : null
  // }, [inputFocus])

  useEffect(() => {
    if (token) {
      axios
        .get(routes.getChannels(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => dispatch(getChannels(response.data)));
      axios
        .get(routes.getMessages(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => dispatch(getMessages(response.data)));
    }
  }, []);

  useEffect(() => {
    socket.on("newMessage", (payload) => {
      // Испольуем callback (prev => ...), чтобы не потерять сообщения
      dispatch(addMessage(payload));
      // setNewMessages((prevMessages) => [...prevMessages, payload]);
    });
    socket.on("newChannel", (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on("renameChannel", (payload) => {
      dispatch(editChannelName(payload));
    });
    socket.on("removeChannel", (payload) => {
      dispatch(removeChannel(payload));
    });
    // Важно: отписываемся от события при размонтировании компонента
    return () => {
      socket.off("newMessage");
      socket.off("newChannel");
      socket.off("renameChannel");
      socket.off("removeChannel");
    };
  }, []);
  return (
    <>
      <div className="chat-body">
        <Tab.Container
          activeKey={currentChannelId}
          onSelect={(currentChannelId) => setCurrentChannelId(currentChannelId)}
          id="list-group-tabs-example"
        >
          <div className="channels">
            <div className="title-and-button-of-channels">
              <h2 className="channels-title">{t("channelTitle.title")}</h2>
              <AddChannelModal setCurrentChannelId={setCurrentChannelId} />
              <RenameChannelModal
                showRename={showRename}
                handleCloseRename={handleCloseRename}
                currentChannel={currentChannel}
              />
              <RemoveChannelModal
                showRemove={showRemove}
                handleCloseRemove={handleCloseRemove}
                currentChannel={currentChannel}
                setCurrentChannelId={setCurrentChannelId}
              />
            </div>
            <ChannelsList
              handleRename={handleRename}
              handleRemove={handleRemove}
              currentChannelId={currentChannelId}
              setCurrentChannelId={setCurrentChannelId}
              setInputFocus={setInputFocus}
            />
          </div>
          <MessagesBox currentChannelId={currentChannelId} />
          <MessagesForm
            currentChannelId={currentChannelId}
            inputFocus={inputFocus}
          />
        </Tab.Container>
      </div>
    </>
  );
};

export default ChatPage;

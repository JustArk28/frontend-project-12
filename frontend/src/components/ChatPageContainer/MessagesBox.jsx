// import { useSelector } from "react-redux";
// import { Tab } from "react-bootstrap";
// import { useTranslation } from "react-i18next";

// const MessagesBox = ({ currentChannelId }) => {
//   const { t } = useTranslation();
//   const channels = useSelector((state) => state.channelsStore.channels);
//   const messages = useSelector((state) => state.messagesStore.messages);
//   const messagesForRoom = messages.filter(
//     ({ channelId }) => channelId === currentChannelId,
//   );
//   return (
//     <>
//       <div className="header-of-chat">
//         <Tab.Content>
//           {channels.map(({ id, name }) => {
//             return (
//               <Tab.Pane key={id} eventKey={id} className="name-of-chat">
//                 # {name}
//               </Tab.Pane>
//             );
//           })}
//         </Tab.Content>
//         <div>
//           <p className="counter">
//             {t("messagesContainer.messages", {
//               count: messagesForRoom.length,
//             })}
//           </p>
//         </div>
//       </div>
//       <div className="chat-area">
//         <div className="field-for-messages">
//           <Tab.Content>
//             {channels.map(({ id }) => {
//               return (
//                 <Tab.Pane key={id} eventKey={id}>
//                   {messagesForRoom.length > 0 ? (
//                     <ul className="message-history">
//                       {messagesForRoom.map(({ id, username, body }) => {
//                         return (
//                           <li key={id}>
//                             <span className="username">{username}: </span>
//                             <span>{body}</span>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   ) : null}
//                 </Tab.Pane>
//               );
//             })}
//           </Tab.Content>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MessagesBox;


import { useSelector } from "react-redux";
import { Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const MessagesBox = ({ currentChannelId }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelsStore.channels);
  const messages = useSelector((state) => state.messagesStore.messages);
  const messagesForRoom = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );
  return (
    <>
      <div className="header-of-chat">
        <Tab.Content>
          {channels.map(({ id, name }) => {
            return (
              <Tab.Pane key={id} eventKey={id} className="name-of-chat">
                # {name}
              </Tab.Pane>
            );
          })}
        </Tab.Content>
        <div>
          <p className="counter">
            {t("messagesContainer.messages", {
              count: messagesForRoom.length,
            })}
          </p>
        </div>
      </div>
      <div className="chat-area">
        <div className="field-for-messages">
          <Tab.Content>
            {channels.map(({ id }) => (
              <Tab.Pane key={id} eventKey={id}>
                {id === currentChannelId && (
                  <>
                    {messagesForRoom.length > 0 ? (
                      <ul className="message-history">
                        {messagesForRoom.map(({ id: msgId, username, body }) => (
                          <li key={msgId}>
                            <span className="username">{username}: </span>
                            <span>{body}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                )}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </div>
      </div>
    </>
  );
};

export default MessagesBox;
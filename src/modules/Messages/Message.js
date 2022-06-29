// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import { Icon } from "../../components/Icon/Icon";
// import { Flex } from "../../components/UI/Flex/Flex";
// export const Message = () => {
//   // const [socket,setSocket] =useState(null)

//   // useEffect(() => {
//   //   const newSocket= io("http://localhost:8080")
//   //   setSocket(newSocket)
//   // },[setSocket])
//   // console.log("socket,,",socket);
//   // const sendMsg=()=>{
//   //   socket.emit("sample",
//   //   sender: user.userId,
//   //   conversation_id: userListenTo.conversation_id,
//   //   message: typedMessage,
//   //   receiver: userListenTo.user.id)

//   //   console.log("entered button fun");
//   // }

//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   // const socket = io.connect("http://localhost:8080");
//   console.log("socket", socket);
//   console.log("chat",chat);
//   const SendChat = () => {
//     console.log("send mesage");
//     socket.emit("messages", { message: message });
//     setMessage("");
//   };

//   useEffect(() => {
//     // socket.on("messages", (payload) => {
//       setChat([...chat,message]);
//     // });
//   },[setChat]);

  

//   return (
//     <div>
//       <div className="message_input_box">
//         <Flex alignItems="center" className="message_input">
//           <i class="fa-regular fa-face-smile"></i>

//           <input
//             type="text"
//             placeholder="enter a message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </Flex>

//         {/* <Icon onClick={SendChat} icon="fa-regular fa-paper-plane" /> */}
//         <button onClick={SendChat}>Send</button>
//       </div>
//     </div>
//   );
// };

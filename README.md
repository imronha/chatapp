[React Chat App Live Demo](https://5eb879b0c2f2d219e9287487--romantic-sammet-487476.netlify.app/)

# React Chat App

Realtime React chat app created using ReactJS, NodeJS, socket.io, react-emoji, react-scroll-to-bottom, react-router that allows users to enter their name and join a chat room.

## Technologies Used:

* ReactJS
* JavaScript
* HTML/CSS
* Node.js
* Socket.io
* React-Emoji
* React-scroll-to-bottom
* React-router

## Features:

![React chat app](ReactChatApp.gif)

### Custom username and room name
Users can manually enter their own unique name and enter a chat room of their choosing. Other users in the room will be notified of the new user once they enter.

```Javascript
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join Chatroom</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};
```
### Game Loop using custom hook (useInterval)
Interval is increased everytime the player clears 10 rows to make the game more challenging.

```Javascript
export function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
```

### Chat Room

```Javascript
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://still-falls-41956.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // console.log(socket);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);
  return (
    <div className="outerContainer">
      <TextContainer users={users} />
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
```

### Current users component
```Javascript
const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div className="sectionTitle">
      <h3>Realtime Chat Application </h3>
    </div>
    {users ? (
      <div>
        <h3 className="sectionTitle">People currently chatting:</h3>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);
```
Lists all the current users in the current chat room. Only available on larger screen sizes.

## Features to implement in next iterations
* Profiles for users
* Login and registration
* UI/UX improvements
* Send file/picture functionality





import { useRef, useState } from "react";
import "./App.css";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Mallang",
      email: "mallang@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@gmail.com",
      active: false,
    },
    {
      id: 3,
      username: "chj",
      email: "chj@gmail.com",
      active: false,
    },
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user)); // [...users, user]와 동일
    setInputs({
      username: "",
      email: "",
    });
    console.log(nextId.current);
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id가 파라미터랑 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
    // = user.id가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default App;

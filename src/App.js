import React, { useRef, useState, useMemo, useCallback } from "react";
import "./App.css";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

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

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };

    setUsers((users) => users.concat(user)); // [...users, user]와 동일
    setInputs({
      username: "",
      email: "",
    });
    console.log(nextId.current);
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    // user.id가 파라미터랑 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
    // = user.id가 id 인 것을 제거함
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  //함수형 업데이트로 최적화를 해주면 상태를 참조하지 않게 할 수 있다
  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);
  //useMemo Hook을 사용하면 이전에 계산 한 값을 재사용(memorized)
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default React.memo(App);

import React, { useEffect } from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;
  // useEffect(() => {
  //   //컴포넌트가 마운트(처음 나타났을 때) 됐을 때 작업 처리
  //   console.log("user값이 설정됨");
  //   console.log(user);
  //   return () => {
  //     //컴포넌트가 언마운트(사라질 때) 됐을 때 작업 처리
  //     console.log("user가 바뀌기 전");
  //     console.log(user);
  //   };
  // }, [user]);
  // //deps에 특정 값을 넣으면 처음 마운트 될 때도 호출이 되고, 업데이트 될 때도 호출이 됨.
  //반대로 언마운트 될 때도 호출이 되고, 값이 바뀌기 직전에도 호출이 됨.

  return (
    <div>
      <div>
        <b
          style={{
            cursor: "pointer",
            color: active ? "green" : "black",
          }}
          onClick={() => onToggle(user.id)}
        >
          {username}
        </b>
        &nbsp;
        <span>{email}</span>
        <button onClick={() => onRemove(id)}>삭제</button>
      </div>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        //key값을 정해줘야 렌더링 성능에 문제가 안됨. 값이 업데이트 될 때 참조를 하기 때문.
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);

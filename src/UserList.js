import React from "react";

function User({ user }) {
  return (
    <div>
      <div>
        <b>{user.username}</b> <span>{user.email}</span>
      </div>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        //key값을 정해줘야 렌더링 성능에 문제가 안됨. 값이 업데이트 될 때 참조를 하기 때문.
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;

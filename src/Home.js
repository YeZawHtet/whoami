import UserList from "./UserList";
import useFetch from "./useFetch";
import React from "react";

function Home() {
  const {
    error,
    isPending,
    data: users,
  } = useFetch("https://whoami-data.vercel.app/Tbl_Users");

  return (
    <div className="col-md-6 offset-md-3">
      {error && <div>{error}</div>}
      {isPending && (
        <div className="text-warning text-center fs-1">Loading...</div>
      )}
      {users && <UserList users={users} />}
    </div>
  );
}

export default Home;

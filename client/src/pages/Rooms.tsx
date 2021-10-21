import styled from "styled-components";
import { getToken } from "../common/auth";
import TopMenu from "../components/TopMenu";
import UserList from "../components/UserList";

function Rooms() {
  return (
    <>
      <TopMenu />
      <main className="flex border items-center justify-center flex-1">
        <ul className="overflow-scroll" style={{ height: "700px" }}>
          <UserList></UserList>
          <UserList></UserList>
          <UserList></UserList>
          <UserList></UserList>
          <UserList></UserList>
          <UserList></UserList>
          <UserList></UserList>
          <UserList></UserList>
          <UserList></UserList>
          <UserList></UserList>
        </ul>
      </main>
    </>
  );
}

export default Rooms;

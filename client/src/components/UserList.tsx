import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getToken } from "../common/auth";
import { userInfoState } from "../state-persist";
import UserDetail from "./UserDetail";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

interface Room {
  createdAt: Date;
  id: number;
  most: string[];
  nickname: string;
  position: string;
  profileIconId: number;
  recent_rate: string;
  summonerLevel: number;
  tier: string;
  total_rate: number;
  username: string;
}

function UserList({ room, last, setDummy }: any) {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const createdAt = moment(room.createdAt).fromNow();
  const { nickname, username } = useRecoilValue(userInfoState);

  const requestDuo = async () => {
    socket.emit(`join room`, { from: nickname, room: room.nickname });
    // 조인한 룸 상대방에게 노티를 뿌려줘야함
  };

  const deleteUserList = async () => {
    console.log("유저리스트 삭제");
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/userlist/${room.id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );
    console.log(data);
    if (data) {
      setDummy((old: any) => {
        return old.filter((el: any) => el.id !== room.id);
      });
    }
  };

  return (
    <>
      <li
        className="relative flex flex-row border h-20 justify-start rounded-lg mb-2 overflow-hidden shadow-md bg-gray-50 hover:bg-white hover:scale-105 transform transition duration-500"
        style={{ color: "#333d4b" }}
        ref={last}
      >
        <section className="flex flex-row items-center ">
          <div className="w-14 h-14 rounded-full ml-2 overflow-hidden">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/${room.profileIconId}.png`}
            />
          </div>
          <div className="ml-2 w-36 text-left">
            <p
              className="font-bold cursor-pointer"
              onClick={() => setIsDetail((old) => !old)}
            >
              {room.username}
            </p>
            <p className="opacity-40">{room.nickname}</p>
          </div>
          <div className="w-14 h-14">
            <img src={`./${room.position}.png`} />
          </div>
          <TierText tier={room.tier} className="w-4 m-3 font-bold">
            {room.tier}
          </TierText>
          <div className="w-40 bg-gray-200 h-6 ml-2">
            <Graph rate={room.recent_rate}>
              <p className="text-xs font-light">{room.recent_rate}%</p>
            </Graph>
          </div>
          <div
            className="flex flex-row ml-2 border h-14"
            style={{ width: "168px" }}
          >
            {room.most.length > 0 && (
              <>
                <img
                  className="h-full"
                  style={{ width: "56px" }}
                  src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room?.most[0]}.png`}
                  alt="img"
                ></img>
                <img
                  className="h-full"
                  style={{ width: "56px" }}
                  src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room?.most[1]}.png`}
                  alt="img"
                ></img>
                <img
                  className="h-full"
                  style={{ width: "56px" }}
                  src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room?.most[2]}.png`}
                  alt="img"
                ></img>
              </>
            )}
          </div>
          {/* <div className="w-4 m-3">{room.poro}</div> */}
          {/* <div className="w-4 m-3">{room.synergy}</div> */}
          {/* <div className="w-4 m-3">{room.kda}</div> */}
          <div className="w-4 ml-2">{room.total_rate}%</div>
          <p className="flex absolute text-xs opacity-40 ml-6 right-14 h-full items-end">
            {createdAt}
          </p>
          {room.username === username ? (
            <button
              className="absolute bg-red-400 w-10 h-full flex flex-row items-center justify-center inset-y-0 right-0"
              onClick={deleteUserList}
            >
              {/* <img className="w-4 h-4" src="icon_arrow.png"></img> */}
              <p className="font-bold text-white">X</p>
            </button>
          ) : (
            <button
              className="absolute bg-green-400 w-10 h-full flex flex-row items-center justify-center inset-y-0 right-0"
              onClick={requestDuo}
            >
              <img className="w-4 h-4" src="icon_arrow.png"></img>
            </button>
          )}
        </section>
      </li>
      {isDetail && <UserDetail></UserDetail>}
    </>
  );
}

const Graph = styled.div<{ rate: string }>`
  width: ${(props) => (props.rate ? `${props.rate}%` : "0%")};
  height: 100%;
  background-color: #34d399;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TierText = styled.div<{ tier: string }>`
  color: ${(props) => {
    if (!props.tier) return "#333d4b";
    const tier = props.tier[0];
    const tierToColor: { [index: string]: string } = {
      I: "#69605C",
      B: "#964B00",
      S: "#C0C0C0",
      G: "#FFD700",
      P: "#65c3ba",
      D: "#6FD1F4",
      M: "#D486BB",
      C: "#aaaaaa",
    };
    return tierToColor[tier];
  }};
`;

export default UserList;

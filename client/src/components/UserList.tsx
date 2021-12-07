import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import UserDetail from "./UserDetail";

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

function UserList({ room, last }: any) {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const createdAt = moment(room.createdAt).fromNow();
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
          <button className="absolute bg-green-400 w-10 h-full flex flex-row items-center justify-center inset-y-0 right-0">
            <img className="w-4 h-4" src="icon_arrow.png"></img>
          </button>
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

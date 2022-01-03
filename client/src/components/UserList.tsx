import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getToken } from "../common/auth";
import { userInfoState } from "../state-persist";
import UserDetail from "./UserDetail";
// import { io } from "socket.io-client";
// const socket = io(`${process.env.REACT_APP_SOCKET_SERVER_URL}`);

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

  const calcReactRate = (rate: number) => {
    if (rate >= 85) {
      return "최상";
    } else if (rate >= 65) {
      return "상";
    } else if (rate >= 40) {
      return "중";
    } else if (rate >= 20) {
      return "하";
    } else {
      return "최하";
    }
  };

  const requestDuo = async () => {
    // socket.emit(`join room`, { from: nickname, room: room.username });
    // // 조인한 룸 상대방에게 노티를 뿌려줘야함
    // // 상대방 socket.id를 알아야 됨
    // // userlist가 socket.id를 가지고 있어야 됨
    // socket.emit(`send notice`, {
    //   room: room.username,
    //   category: "duo",
    //   from: username,
    // });
  };

  const deleteUserList = async () => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/userlist/${room.id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );
    if (data) {
      setDummy((old: any) => {
        return old.filter((el: any) => el.id !== room.id);
      });
    }
  };

  return (
    <>
      <li
        className="flex flex-row h-20 rounded-lg mb-2 w-full overflow-hidden shadow-md bg-gray-50 hover:bg-white hover:scale-105 transform transition duration-500"
        style={{ color: "#333d4b" }}
        ref={last}
      >
        <section className="flex flex-row items-center justify-between w-full">
          {/* TOP */}
          <section className="flex flex-row h-full items-center min-w-max">
            <div className="w-14 h-14 ml-2 overflow-hidden">
              <img
                className="rounded-full"
                src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/${room.profileIconId}.png`}
              />
            </div>
            <div className="ml-2 md:w-40 w-32 text-left">
              <p
                className="font-bold cursor-pointer md:text-base text-xs"
                // onClick={() => setIsDetail((old) => !old)}
              >
                {room.username}
              </p>
              <p className="opacity-40">{room.nickname}</p>
            </div>
          </section>
          {/* MID */}
          <section className="flex flex-row justify-center items-center h-full min-w-max">
            <div className="w-12 h-12">
              <img src={`./${room.position}.png`} />
            </div>
            <TierText tier={room.tier} className="w-4 m-3 font-bold">
              {room.tier}
            </TierText>
            <div className="w-40 bg-gray-200 h-4 ml-2 font-semibold text-xs ">
              <Graph rate={room.total_rate}>
                <p className="text-white">{room.total_rate}%</p>
              </Graph>
              <p className="opacity-40">
                {room.total_wins + room.total_losses} 판
              </p>
            </div>
            <div className="flex flex-row ml-4 h-16 text-xs items-center font-semibold">
              {room.most.length > 0 && (
                <>
                  <section className="mr-1 flex-1 overflow-hidden flex flex-col justify-center items-center">
                    <RateText rate={room.most_rate[0]}>
                      {room.most_rate[0]}%
                    </RateText>
                    <img
                      className="rounded-full w-10 h-10"
                      src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room?.most[0]}.png`}
                      alt="img"
                    ></img>
                    <KdaText kda={room.most_kda[0]}>{room.most_kda[0]}</KdaText>
                  </section>
                  <section className="mr-1 flex-1 overflow-hidden">
                    <RateText rate={room.most_rate[1]}>
                      {room.most_rate[1]}%
                    </RateText>
                    <img
                      className="rounded-full w-10 h-10"
                      src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room?.most[1]}.png`}
                      alt="img"
                    ></img>
                    <KdaText kda={room.most_kda[1]}>{room.most_kda[1]}</KdaText>
                  </section>
                  <section className="mr-1 flex-1 overflow-hidden">
                    <RateText rate={room.most_rate[2]}>
                      {room.most_rate[2]}%
                    </RateText>
                    <img
                      className="rounded-full w-10 h-10"
                      src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room?.most[2]}.png`}
                      alt="img"
                    ></img>
                    <KdaText kda={room.most_kda[2]}>{room.most_kda[2]}</KdaText>
                  </section>
                </>
              )}
            </div>
            {/* <div className="w-4 m-3">{room.poro}</div> */}
            {/* <div className="w-4 m-3">{room.synergy}</div> */}
            {/* <div className="w-4 m-3">{room.kda}</div> */}
            <section className="flex flex-col justify-center items-center ml-4 font-semibold text-xs">
              <p className="opacity-40">퍼포먼스</p>
              <RecentText
                rate={room.recent_rate}
                className="text-sm font-semibold"
              >
                {calcReactRate(room.recent_rate)}
              </RecentText>
            </section>
          </section>
          {/* BOTTOM */}
          <section className="flex flex-row justify-center items-center h-full min-w-max">
            <section className="h-full py-2">
              <section className="px-2 h-full text-center border text-xs font-semibold border w-32 flex justify-center items-center bg-gray-200">
                일이삼사오육칠팔구십십일십이십삼ㄴㅁㅇㅁㅇㅁㄴㅇㅁㅁㅇㅁㄴㅇ
              </section>
            </section>
            <p className="flex text-xs opacity-40 mx-2">{createdAt}</p>
            {room.username === username ? (
              <button
                className=" bg-red-400 w-8 h-full flex flex-row items-center justify-center"
                onClick={deleteUserList}
              >
                {/* <img className="w-4 h-4" src="icon_arrow.png"></img> */}
                <p className="font-bold text-white">X</p>
              </button>
            ) : (
              <button
                className=" bg-green-400 w-10 h-full flex flex-row items-center justify-center"
                onClick={requestDuo}
              >
                <img className="w-4 h-4" src="icon_arrow.png"></img>
              </button>
            )}
          </section>
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

const KdaText = styled.div<{ kda: number }>`
  color: ${(props) => {
    const kda = props.kda;
    if (kda > 6) {
      return "#FACC14";
    } else if (kda > 4) {
      return "#34D399";
    } else if (kda > 3) {
      return "#3A83F7";
    } else if (kda > 2) {
      return "gray";
    } else if (kda > 1) {
      return "gray";
    } else {
      return "#F77171";
    }
  }};
`;

const RecentText = styled.p<{ rate: number }>`
  color: ${(props) => {
    const rate = props.rate;
    if (rate > 85) {
      return "#FACC14";
    } else if (rate > 65) {
      return "#34D399";
    } else if (rate > 50) {
      return "#3A83F7";
    } else if (rate > 20) {
      return "gray";
    } else {
      return "#F77171";
    }
  }};
`;

const RateText = styled.p<{ rate: number }>`
  color: ${(props) => {
    const rate = props.rate;
    if (rate > 85) {
      return "#FACC14";
    } else if (rate > 65) {
      return "#34D399";
    } else if (rate > 50) {
      return "#3A83F7";
    } else if (rate > 20) {
      return "gray";
    } else {
      return "#F77171";
    }
  }};
`;

export default UserList;

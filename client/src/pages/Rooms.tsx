import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { delay, movePage, setTimeRemoveAlarm } from "../common/api/page";
import { destroyToken, expiredJwt, getToken } from "../common/auth";
import FilterBtn from "../components/FilterBtn";
import FilterBtnBox from "../components/FilterBtnBox";
import LineModal from "../components/LineModal";
import TopMenu from "../components/TopMenu";
import UserList from "../components/UserList";
import UserListSK from "../components/UserListSK";
import { Alarm, alarmModalState, filtersState } from "../state";
import { userInfoState, userListCooldownState } from "../state-persist";
import Loading from "./Loading";
import { io } from "socket.io-client";
import styled from "styled-components";
// const socket = io(`${process.env.REACT_APP_SOCKET_SERVER_URL}`);

function Rooms() {
  const [socketId, setSocketId] = useState();
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView();
  const [dummys, setDummy] = useState<Array<object>>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isSK, setIsSK] = useState<boolean>(false);
  const [textSK, setTextSK] = useState<string>("");
  const userInfo = useRecoilValue(userInfoState);
  const [userListCooldown, setUserListCooldown] = useRecoilState<string>(
    userListCooldownState
  );
  const signIn = getToken().token ? true : false;
  const [alarmModals, setAlarmModal] = useRecoilState<Alarm[]>(alarmModalState);
  const filters = useRecoilValue<any[]>(filtersState);
  // 가공이 필요없는 lol 플레이어 데이터는 여기서 가져옴
  const getLeague = async (encryptedSummonerId: string) => {
    const { data } = await axios.get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${process.env.REACT_APP_API_KEY_RIOT}`
    );

    return data[0].queueType === "RANKED_TFT_PAIRS" ? data[1] : data[0];
  };

  const getSummoner = async () => {
    const { data } = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userInfo.username}?api_key=${process.env.REACT_APP_API_KEY_RIOT}`
    );
    return data;
  };

  const addUserList = async (position: string) => {
    if (position === "none") {
      setAlarmModal((old) => [
        { text: "최소 1개의 포지션이 필요합니다", type: 0 },
        ...old,
      ]);
      setTimeRemoveAlarm(setAlarmModal);
      return;
    }
    setIsSK(true);
    setTextSK("일꾼 포로들을 소집하는 중입니다...");
    setIsModal(false);
    setTextSK("소환사님의 유저정보를 가져옵니다...");
    const summoner = await getSummoner();
    setTextSK("소환사님의 리그정보를 가져옵니다...");
    const league = await getLeague(summoner.id);
    // typescript는 string type으로 객체 값 접근을 허용하지 않는다. 때문에 허용하는 객체라고 타입을 지정하거나 string-literal 타입을 이용해서 접근한다.
    const rankToNumber: { [index: string]: number } = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 5,
    };

    const result = {
      puuid: summoner.puuid,
      username: userInfo.username,
      nickname: userInfo.nickname,
      position: position,
      tier: league.tier[0] + rankToNumber[league.rank],
      total_rate: logicWinRate(league.wins, league.losses),
      profileIconId: summoner.profileIconId,
      summonerLevel: summoner.summonerLevel,
    };

    setTextSK("일꾼 포로들이 리스트를 생성하고 있습니다...");
    const { data } = await axios.post(
      "http://localhost:8080/userlist",
      result,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );
    if (data.most && data.most.length > 0) {
      // 유저리스트를 생성하면 룸을 생선한다.
      // 룸 이름은 리스트 생성자 롤 닉네임
      // socket.emit(`join room`, {
      //   from: userInfo.nickname,
      //   room: userInfo.username,
      // });
      // 다른 유저가 해당 유저리스트 듀오 요청시, 룸에 참가 및 노티를 보낸다.
      // 노티를 받은 유저가 수락하면 채팅을 할 수 있게 된다.
      setDummy((old) => {
        return [data, ...old];
      });
    } else {
      // jwt expired
      destroyToken();
      movePage("/signin");
      return;
    }
    setTextSK("일꾼 포로들이 집으로 돌아갑니다...");
    const dDate = new Date();
    // 쿨타임 설정
    dDate.setMinutes(dDate.getSeconds() + 1);
    const dDateStr = dDate.toString();
    setUserListCooldown(dDateStr);
    setIsSK(false);
    setAlarmModal((old) => [{ text: "리스트 생성 완료", type: 1 }, ...old]);
    setTimeRemoveAlarm(setAlarmModal);
  };

  const logicWinRate = (win: number, defeat: number) => {
    const total = win + defeat;
    return (win / total) * 100;
  };

  useEffect(() => {
    axios.get("http://localhost:8080/userlist").then((res) => {
      const { data } = res;
      setDummy(data);
    });
  }, []);

  useEffect(() => {
    if (inView && page * 10 === dummys.length) {
      axios
        .get("http://localhost:8080/userlist/infinite", {
          headers: { Page: page },
        })
        .then((res) => {
          const { data } = res;
          setDummy((old) => [...old, ...data]);
          setPage((old) => old + 1);
        });
    }
  }, [inView]);

  return (
    <>
      {isModal && (
        <LineModal setIsModal={setIsModal} addUserList={addUserList} />
      )}
      <TopMenu />
      <Con>
        <section className="flex flex-row justify-center mb-2">
          <div className="w-full h-24 flex flex-col justify-end">
            <FilterBtnBox />
          </div>
        </section>
        <header className="flex flex-row justify-center items-center">
          <section
            className="relative flex flex-row border h-20 justify-start rounded-lg mb-2 overflow-hidden w-full cursor-pointer hover:bg-white shadow-md bg-gray-50"
            onClick={() => {
              if (!signIn) {
                movePage("/signin");
                return;
              }
              const now = new Date();
              if (userListCooldown > now.toString()) {
                setAlarmModal((old) => {
                  const result = [
                    { text: "5분 후 다시 시도하세요", type: 0 },
                    ...old,
                  ];
                  return result;
                });
                setTimeRemoveAlarm(setAlarmModal);
              } else {
                setIsModal(true);
              }
            }}
          >
            <section className="flex flex-row items-center">
              {/* <div className="border-2 border-green-300 w-16 h-16 rounded-full m-2"></div> */}
              {/* <div className="m-2 w-40 text-left"> */}
              {/* <p>{""}</p> */}
              {/* <p className="opacity-50">{""}</p> */}
              {/* </div> */}
              {/* <div className="border w-14 h-14 ml-2"></div> */}
              {/* <p className="w-4 m-3 font-black">{"S2"}</p> */}
              {/* <div className="w-40 bg-gray-200 h-6 m-2"></div> */}
              {/* <div className="m-2 border w-40 h-16"></div> */}
              {/* <div className="w-4 m-3">{""}</div> */}
              {/* <div className="w-4 m-3">{""}</div> */}
              {/* <div className="w-4 m-3">{""}</div> */}
              {/* <div className="w-4 m-3"></div> */}
              {/* <button className="absolute bg-green-400 ml-10 w-10 h-full flex flex-row items-center justify-center index-y-0 right-0"> */}
              {/* <img className="w-6 h-6" src="icon_arrow.png"></img> */}
              {/* </button> */}
            </section>
          </section>
          <p className="absolute font-bold mb-3 text-xl cursor-pointer">+</p>
        </header>
        {isSK && <UserListSK textSK={textSK}></UserListSK>}
        <main className="flex items-center justify-center">
          <ul
            className="w-full"
            // style={{ height: "520px" }}
          >
            {dummys
              .filter((el: any) =>
                filters[0].length > 0 ? filters[0].includes(el.position) : true
              )
              .filter((el: any) =>
                filters[1].length > 0 ? filters[1].includes(el.tier[0]) : true
              )
              .map((room: any, idx) => {
                if (
                  idx === dummys.length - 1 &&
                  idx > 8 &&
                  dummys.length % 10 === 0
                ) {
                  return (
                    <UserList
                      key={room.id}
                      room={room}
                      last={ref}
                      setDummy={setDummy}
                    />
                  );
                } else {
                  return (
                    <UserList key={room.id} room={room} setDummy={setDummy} />
                  );
                }
              })}
          </ul>
        </main>
        {inView && <img></img>}
      </Con>
    </>
  );
}

const Con = styled.section`
  margin-left: 16.666%;
  margin-right: 16.666%;
  @media screen and (max-width: 767px) {
    margin-left: 2%;
    margin-right: 2%;
  }
`;

export default Rooms;

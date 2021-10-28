import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import LineModal from "../components/LineModal";
import TopMenu from "../components/TopMenu";
import UserList from "../components/UserList";
import { userInfoState } from "../state-persist";

function Rooms() {
  const [dummys, setDummy] = useState<Array<object>>([]);
  const userInfo = useRecoilValue(userInfoState);

  const [isModal, setIsModal] = useState<boolean>(false);

  const getLeague = async (encryptedSummonerId: string) => {
    const { data } = await axios.get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${process.env.REACT_APP_API_KEY_RIOT}`
    );
    return data[0];
  };

  const getSummoner = async () => {
    const { data } = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userInfo.username}?api_key=${process.env.REACT_APP_API_KEY_RIOT}`
    );
    return data;
  };

  const getMatches = async (puuid: string) => {
    const { data } = await axios.get(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.REACT_APP_API_KEY_RIOT}`
    );

    return data;
  };

  const addUserList = async (position: string) => {
    const summoner = await getSummoner();
    const league = await getLeague(summoner.id);
    console.log(league);
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

    const { data } = await axios.post("http://localhost:8080/userlist", result);

    setDummy((old) => {
      return [data, ...old];
    });

    setIsModal(false);
  };

  const logicWinRate = (win: number, defeat: number) => {
    const total = win + defeat;
    return (win / total) * 100;
  };

  useEffect(() => {
    console.log("change");
    axios.get("http://localhost:8080/userlist").then((res) => {
      const { data } = res;
      setDummy(data);
    });
  }, []);

  return (
    <>
      {isModal && (
        <LineModal setIsModal={setIsModal} addUserList={addUserList} />
      )}
      <TopMenu />
      <section className="flex flex-row justify-center">
        <header
          className="w-4/6 flex flex-row text-white justify-start"
          style={{ backgroundColor: "#2b2d42" }}
        >
          <section className="flex flex-row items-center">
            <div className="w-16 h-16 m-2"></div>
            <div className="m-2 w-40 text-left">
              <p>소환사명</p>
              <p className="opacity-50">회원명</p>
            </div>
            <div className="w-16 h-16 m-2 flex items-center justify-center">
              포지션
            </div>
            <p className="m-2">티어</p>
            <div className="w-40 h-6 m-2">최근승률</div>
            <div className="flex items-center justify-center m-2 w-32 h-16">
              모스트
            </div>
            <div className="m-1">KDA</div>
            <div className="m-1">포로점수</div>
            <div className="m-1">시너지</div>
            <div className="m-1">전체승률</div>
          </section>
        </header>
      </section>
      <header className="flex flex-row justify-center items-center">
        <section className="flex flex-row border h-20 text-white justify-start rounded-l-lg mb-2 overflow-hidden w-4/6 opacity-30">
          <section className="flex flex-row items-center">
            <div className="border-2 border-green-300 w-16 h-16 rounded-full m-2"></div>
            <div className="m-2 w-40 text-left">
              <p>{""}</p>
              <p className="opacity-50">{""}</p>
            </div>
            <div className="border w-16 h-16 ml-2"></div>
            <p className="w-4 m-3 font-black">{"S2"}</p>
            <div className="w-40 bg-gray-200 h-6 m-2"></div>
            <div className="m-2 border w-40 h-16"></div>
            <div className="w-4 m-3">{""}</div>
            <div className="w-4 m-3">{""}</div>
            <div className="w-4 m-3">{""}</div>
            <div className="w-4 m-3"></div>
            <button className="bg-green-400 ml-10 w-10 h-full flex flex-row items-center justify-center">
              <img className="w-6 h-6" src="icon_arrow.png"></img>
            </button>
          </section>
        </section>
        <button
          className="absolute font-bold mb-3 text-white text-3xl"
          onClick={() => {
            // addUserList()
            setIsModal(true);
          }}
        >
          +
        </button>
      </header>
      <main className="flex items-center justify-center">
        <ul className="overflow-scroll w-4/6" style={{ height: "520px" }}>
          {dummys.map((room, idx) => {
            return <UserList key={idx} room={room} />;
          })}
        </ul>
      </main>
    </>
  );
}

export default Rooms;

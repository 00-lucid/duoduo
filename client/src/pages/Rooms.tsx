import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { getToken } from "../common/auth";
import TopMenu from "../components/TopMenu";
import UserList from "../components/UserList";

function Rooms() {
  const [dummys, setDummy] = useState<Array<object>>([]);
  const addUserList = async () => {
    const result = {
      username: "username",
      nickname: "nickname",
      position: ["mid", "adc"],
      tier: "D4",
      recent_win: 10,
      recent_defeat: 10,
      most: [],
      kda: 3,
      poro: 80,
      synergy: 70,
      total_win: 200,
      total_defeat: 200,
    };

    const { data } = await axios.post("http://localhost:8080/userlist", result);
    console.log(data);
    setDummy((old) => {
      return [data, ...old];
    });
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
          onClick={addUserList}
        >
          +
        </button>
      </header>
      <main className="flex items-center justify-center">
        <ul className="overflow-scroll w-4/6" style={{ height: "520px" }}>
          {dummys.map((room) => {
            return <UserList room={room} />;
          })}
        </ul>
      </main>
    </>
  );
}

export default Rooms;

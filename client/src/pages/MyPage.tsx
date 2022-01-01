import axios from "axios";
import { userInfo } from "os";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import moveHome, { movePage } from "../common/api/page";
import { decodeJwt, destroyToken, expiredJwt, getToken } from "../common/auth";
import MyPageInfoBlock from "../components/MyPageInfoBlock";
import TopMenu from "../components/TopMenu";
import { Alarm, alarmModalState } from "../state";
import { userInfoState } from "../state-persist";

function MyPage() {
  const token = getToken().token;
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const userInfo = useRecoilValue(userInfoState);
  const getMypage = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/mypage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!data) {
      destroyToken();
      movePage("/signin");
      return;
    }
    return data;
  };

  const signout = () => {
    destroyToken();
    moveHome();
  };

  useEffect(() => {
    // TODO: config
    getMypage().then((data) => {
      setEmail(data.email);
      setUserName(data.username);
    });
  }, []);
  return (
    <>
      <TopMenu />
      <main
        className="flex flex-row justify-center md:pt-24 pt-12"
        style={{ height: "calc(100vh - 4rem - 6rem)" }}
      >
        <Page>
          {/* 좌측 */}
          <div className="relative md:w-1/3 flex flex-col items-center pt-10 h-auto ">
            <img
              className="rounded-full w-24 h-24 border"
              src="./profile.png"
            ></img>
            <section className="mt-4 flex flex-row">
              <p className="font-bold text-lg ">{userInfo.nickname}</p>
              <p className="font-normal opacity-40 text-lg">님</p>
            </section>
            <section className="mb-4">
              <div className="font-normal flex flex-row">
                <p className="text-gray-400 text-sm">300 🚀</p>
              </div>
            </section>
            <div
              className="bg-red-400 text-xl h-9 w-full flex items-center cursor-pointer text-white md:absolute md:bottom-0"
              onClick={signout}
            >
              <p className="mx-4 font-bold">SIGNOUT</p>
            </div>
          </div>
          {/* 우측 */}
          <div className="w-full md:p-10 p-4 flex flex-col justify-between">
            {/* black */}
            <MyPageInfoBlock
              title={"이메일"}
              value={email}
              setValues={setEmail}
              token={token}
            />
            <MyPageInfoBlock
              title={"소환사명"}
              value={username}
              setValues={setUserName}
              token={token}
            />
            <MyPageInfoBlock title={"훈장"} value={"🎉"} token={token} />
          </div>
        </Page>
      </main>
    </>
  );
}

const Page = styled.div`
  width: 66.6%;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;
  }
`;
export default MyPage;

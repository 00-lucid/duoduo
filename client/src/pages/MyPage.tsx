import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { destroyToken, getToken } from "../common/auth";
import MyPageInfoBlock from "../components/MyPageInfoBlock";
import TopMenu from "../components/TopMenu";
import { userInfoState } from "../state-persist";

function MyPage() {
  const token = getToken().token;
  return (
    <>
      <TopMenu />
      <main
        className="flex flex-row justify-center pt-24"
        style={{ height: "calc(100vh - 4rem - 6rem)" }}
      >
        <section className="w-4/6 flex flex-row shadow-lg border">
          {/* 좌측 */}
          <div className="relative w-2/6 flex flex-col items-center border-r pt-10">
            <img
              className="rounded-full w-24 h-24 border"
              src="./logo192.png"
            ></img>
            <section className="mt-4 flex flex-row">
              <p className="font-bold text-lg ">테스트</p>
              <p className="font-normal opacity-40 text-lg">님</p>
            </section>
            <div className="font-normal flex flex-row">
              <p className="text-gray-400 text-sm">300 🚀</p>
            </div>
            <hr className="mt-2 mb-2" />
            <div className="bg-red-400 text-xl h-9 w-full flex items-center cursor-pointer text-white absolute bottom-0">
              <p className="mx-4 font-bold" onClick={destroyToken}>
                SIGNOUT
              </p>
            </div>
          </div>
          {/* 우측 */}
          <div className="w-4/6 p-10 flex flex-col justify-between">
            {/* black */}
            <MyPageInfoBlock
              title={"이메일"}
              value={"test@test.com"}
              token={token}
            />
            <MyPageInfoBlock
              title={"소환사명"}
              value={"나보다많을까"}
              token={token}
            />
            <MyPageInfoBlock title={"훈장"} value={"🎉"} token={token} />
          </div>
        </section>
      </main>
    </>
  );
}

export default MyPage;

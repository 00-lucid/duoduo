import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import moveHome from "../common/api/page";
import { destroyToken, getCookie, getToken } from "../common/auth";
import Modal from "../components/Modal";
import UserCard from "../components/UserCard";
import { isLoadingState } from "../state";
import { userInfoState } from "../state-persist";

function Root() {
  let loggedIn = !!getToken().token;
  let isUsername = getCookie("isUsername");
  const userInfo = useRecoilValue(userInfoState);

  return (
    <>
      {loggedIn && isUsername === "false" && <Modal></Modal>}
      <Top className="border-2">
        <p
          className="text-4xl font-bold border-2 cursor-pointer"
          onClick={moveHome}
        >
          DUODUO
        </p>
        {!loggedIn && (
          <GreenBtn className="flex-2 bg-green-400">
            <Link to="signin">
              <p className="text-2xl font-bold">SIGN IN</p>
            </Link>
          </GreenBtn>
        )}
        {loggedIn && (
          <div className="flex flex-row w-1/5 justify-between">
            <p className="text-2xl font-bold border-2">{`${userInfo}`}</p>
            <p
              className="text-2xl font-bold border-2 cursor-pointer"
              onClick={destroyToken}
            >
              SIGN OUT
            </p>
          </div>
        )}
      </Top>
      <main>
        <Screen
          style={{
            backgroundImage:
              "linear-gradient(rgba(43,45,66,1), rgba(43,45,66,0.5), rgba(43,45,66,1)), url('https://kr-publish.s3.amazonaws.com/notice/0268f49d4d229bcee46589954838b252d9aa3f89.jpg')",
            backgroundPosition: "center",
          }}
        >
          <p className="text-white text-5xl font-medium"></p>
        </Screen>
        <Screen className="flex flex-col justify-center">
          <p className="text-white text-5xl font-medium mb-14">
            DUODUO를 사용한 게이머 통계
          </p>
          <section className="flex flex-row justify-around">
            <section className="w-48">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQ5Ni45OTcsNDgxLjk5OWMtMzg3Ljc2OCwwLTM4NC44OTQsMC00ODEuOTk3LDBjLTguMjkxLDAtMTUsNi43MDktMTUsMTVjMCw4LjI5MSw2LjcwOSwxNSwxNSwxNWg0ODEuOTk3ICAgIGM4LjI5MSwwLDE1LTYuNzA5LDE1LTE1QzUxMS45OTcsNDg4LjcwOCw1MDUuMjg4LDQ4MS45OTksNDk2Ljk5Nyw0ODEuOTk5eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNMTM2Ljk5OSwzMzJINDVjLTguMjkxLDAtMTUsNi43MDktMTUsMTV2MTA0Ljk5OWgxMjEuOTk5VjM0N0MxNTEuOTk5LDMzOC43MDksMTQ1LjI5LDMzMiwxMzYuOTk5LDMzMnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTI4Ni45OTgsMjQyaC05MGMtOC4yOTEsMC0xNSw2LjcwOS0xNSwxNXYxOTQuOTk5aDExOS45OTlWMjU3QzMwMS45OTgsMjQ4LjcwOSwyOTUuMjg5LDI0MiwyODYuOTk4LDI0MnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTUwNy42MDIsMTI0LjM5NUw0MDIuNjAzLDQuMzk2Yy01Ljg1OS01Ljg1OS0xNS4zNTItNS44NTktMjEuMjExLDBMMjc2LjM5MiwxMjQuMzk1ICAgIGMtNC4yOTIsNC4yOTItNS41ODEsMTAuNzM3LTMuMjUyLDE2LjM0OGMyLjMxNCw1LjYxLDcuNzkzLDkuMjU4LDEzLjg1Nyw5LjI1OGg0NXYzMDEuOTk4aDEyMFYxNTAuMDAxaDQ1ICAgIGM2LjA2NCwwLDExLjU0My0zLjY0NywxMy44NTctOS4yNThDNTEzLjE4MywxMzUuMTMzLDUxMS44OTQsMTI4LjY4Nyw1MDcuNjAyLDEyNC4zOTV6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" />
              <p className="text-white mt-6">승률 / KDA 상승</p>
            </section>
            <section className="w-48">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTI1NiAxMDYuNjY3OTY5Yy0xMS43OTY4NzUgMC0yMS4zMzIwMzEgOS41NTQ2ODctMjEuMzMyMDMxIDIxLjMzMjAzMXYxMjhjMCAxMS43NzczNDQgOS41MzUxNTYgMjEuMzMyMDMxIDIxLjMzMjAzMSAyMS4zMzIwMzFoMTI4YzExLjc5Njg3NSAwIDIxLjMzMjAzMS05LjU1NDY4NyAyMS4zMzIwMzEtMjEuMzMyMDMxcy05LjUzNTE1Ni0yMS4zMzIwMzEtMjEuMzMyMDMxLTIxLjMzMjAzMWgtMTA2LjY2Nzk2OXYtMTA2LjY2Nzk2OWMwLTExLjc3NzM0NC05LjUzNTE1Ni0yMS4zMzIwMzEtMjEuMzMyMDMxLTIxLjMzMjAzMXptMCAwIiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjU2IDBjLTY3LjgzOTg0NCAwLTEzMy41NDY4NzUgMjcuMDkzNzUtMTgyLjM1NTQ2OSA3Mi4zMzk4NDRsLTQ2LjMzNTkzNy00Ni4zMTI1Yy00LjU4OTg0NC00LjU4NTkzOC0xMS40NTcwMzItNS45NTMxMjUtMTcuNDI5Njg4LTMuNDc2NTYzLTUuOTc2NTYyIDIuNDcyNjU3LTkuODc4OTA2IDguMzIwMzEzLTkuODc4OTA2IDE0Ljc4MTI1djEzOC42Njc5NjljMCA4LjgzMjAzMSA3LjE2Nzk2OSAxNiAxNiAxNmgxMzguNjY3OTY5YzYuNDg0Mzc1IDAgMTIuMzA4NTkzLTMuOTAyMzQ0IDE0Ljc4MTI1LTkuODc4OTA2IDIuNDc2NTYyLTUuOTcyNjU2IDEuMTA5Mzc1LTEyLjg2MzI4Mi0zLjQ3NjU2My0xNy40Mjk2ODhsLTYxLjk3MjY1Ni02MS45OTIxODdjNDAuODUxNTYyLTM3LjQxNzk2OSA5NS40NDUzMTItNjAuMDMxMjUgMTUyLTYwLjAzMTI1IDExNy42MzI4MTIgMCAyMTMuMzMyMDMxIDk1LjY5OTIxOSAyMTMuMzMyMDMxIDIxMy4zMzIwMzFzLTk1LjY5OTIxOSAyMTMuMzMyMDMxLTIxMy4zMzIwMzEgMjEzLjMzMjAzMWMtNTcuMDQ2ODc1IDAtMTEwLjU3MDMxMi0yMi4yMjY1NjItMTUwLjY5OTIxOS02Mi41NDY4NzUtOC4zMjAzMTItOC4zNjMyODEtMjEuODQzNzUtOC4zODY3MTgtMzAuMTY0MDYyLS4wNjY0MDYtOC4zNjMyODEgOC4zMjAzMTItOC40MDYyNSAyMS44MjQyMTktLjA4NTkzOCAzMC4xODc1IDQ4LjIxNDg0NCA0OC40MjU3ODEgMTEyLjQ2ODc1IDc1LjA5Mzc1IDE4MC45NDkyMTkgNzUuMDkzNzUgMTQxLjE2NDA2MiAwIDI1Ni0xMTQuODM1OTM4IDI1Ni0yNTZzLTExNC44MzU5MzgtMjU2LTI1Ni0yNTZ6bTAgMCIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjwvZz48L3N2Zz4=" />
              <p className="text-white mt-6">구인 시간 감소</p>
            </section>{" "}
            <section className="w-48">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwQzExNC44MzcsMCwwLDExNC44MzcsMCwyNTZzMTE0LjgzNywyNTYsMjU2LDI1NnMyNTYtMTE0LjgzNywyNTYtMjU2UzM5Ny4xNjMsMCwyNTYsMHogTTM0MS4zMzMsMTI4ICAgIEMzNjQuOTA3LDEyOCwzODQsMTQ3LjExNSwzODQsMTcwLjY2N2MwLDIzLjU3My0xOS4wOTMsNDIuNjY3LTQyLjY2Nyw0Mi42NjdjLTIzLjU3MywwLTQyLjY2Ny0xOS4wOTMtNDIuNjY3LTQyLjY2NyAgICBDMjk4LjY2NywxNDcuMTE1LDMxNy43NiwxMjgsMzQxLjMzMywxMjh6IE0xNzAuNjY3LDEyOGMyMy41NzMsMCw0Mi42NjcsMTkuMTE1LDQyLjY2Nyw0Mi42NjcgICAgYzAsMjMuNTczLTE5LjA5Myw0Mi42NjctNDIuNjY3LDQyLjY2N2MtMjMuNTczLDAtNDIuNjY3LTE5LjA5My00Mi42NjctNDIuNjY3QzEyOCwxNDcuMTE1LDE0Ny4wOTMsMTI4LDE3MC42NjcsMTI4eiBNMjU2LDQ0OCAgICBjLTc5LjU1MiwwLTE0OS4zMzMtNjkuNzgxLTE0OS4zMzMtMTQ5LjMzM2MwLTExLjc3Niw5LjUzNi0yMS4zMzMsMjEuMzMzLTIxLjMzM2gyNTZjMTEuNzk3LDAsMjEuMzMzLDkuNTU3LDIxLjMzMywyMS4zMzMgICAgQzQwNS4zMzMsMzc4LjIxOSwzMzUuNTUyLDQ0OCwyNTYsNDQ4eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4=" />
              <p className="text-white mt-6">게임 경험 향상</p>
            </section>
          </section>
        </Screen>
        <Screen className="flex flex-col justify-center">
          <p className="text-white text-5xl font-medium mb-14">
            현재 듀오를 구하는 플레이어들입니다
          </p>
          <li className="flex flex-row overflow-scroll">
            <UserCard></UserCard>
            <UserCard></UserCard>
            <UserCard></UserCard>
            <UserCard></UserCard>
            <UserCard></UserCard>
            <UserCard></UserCard>
            <UserCard></UserCard>
            <UserCard></UserCard>
            <UserCard></UserCard>
            <UserCard></UserCard>
          </li>
          <Link to="rooms">
            <p className="text-white text-xl font-medium cursor-pointer">
              전체보기
            </p>
          </Link>
        </Screen>
        <Screen className="flex flex-col items-center justify-center">
          <p className="text-white text-5xl font-medium">
            또는 매칭을 통해 더 많은 사람들과 함께할 수 있습니다
          </p>
          <GreenBtn className="w-96 h-20 mt-10 rounded-xl bg-green-400">
            <p className="text-white font-bold text-2xl">매칭하기</p>
          </GreenBtn>
        </Screen>
      </main>
    </>
  );
}

const Top = styled.header({
  padding: "0.8rem",
  width: "100%",
  height: "4rem",
  color: "white",
  backgroundColor: "#2b2d42",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const GreenBtn = styled.button({
  padding: "0.7rem",
});

const Screen = styled.div({
  height: "100vh",
});

export default Root;

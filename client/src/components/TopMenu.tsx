import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import moveHome from "../common/api/page";
import { destroyToken, getToken } from "../common/auth";
import { userInfoState } from "../state-persist";

function TopMenu() {
  const userInfo = useRecoilValue(userInfoState);
  let loggedIn = !!getToken().token;

  return (
    <Top>
      <p className="text-4xl font-bold cursor-pointer" onClick={moveHome}>
        DUODUO
      </p>
      {/* <p className="cursor-pointer">듀오 찾기</p> */}
      {/* <p className="cursor-pointer">듀오 매칭</p> */}
      {/* <p>알람</p> */}
      {!loggedIn && (
        <Link
          to="signin"
          className="bg-green-400 text-2xl h-full flex items-center"
        >
          <p className="mx-4 font-bold">SIGNIN</p>
        </Link>
      )}
      {loggedIn && (
        <>
          <p className="text-2xl font-bold">{`${userInfo.nickname}`}</p>
        </>
      )}
    </Top>
  );
}

const Top = styled.header({
  paddingLeft: "0.8rem",
  paddingRight: "0.8rem",
  width: "100%",
  height: "4rem",
  color: "white",
  backgroundColor: "#4a4e4d",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export default TopMenu;

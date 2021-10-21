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

export default TopMenu;

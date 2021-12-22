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
      <p className="text-4xl font-black cursor-pointer" onClick={moveHome}>
        DUODUO
      </p>
      {/* <p className="cursor-pointer">듀오 찾기</p> */}
      {/* <p className="cursor-pointer">듀오 매칭</p> */}
      {/* <p>알람</p> */}
      {!loggedIn && (
        <Link to="signin" className="text-lg flex items-center text-green-400">
          <p className="mx-4 font-extrabold	">로그인</p>
        </Link>
      )}
      {loggedIn && (
        <>
          <Link to="mypage">
            <p className="text-lg font-medium">{`${userInfo.nickname}`}</p>
          </Link>
        </>
      )}
    </Top>
  );
}

const Top = styled.header`
  margin-left: 16.666%;
  margin-right: 16.666%;
  height: 4rem;
  color: #333d4b;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 0.1rem solid #333d4b;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

export default TopMenu;

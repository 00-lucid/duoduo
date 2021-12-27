import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Loading from "./Loading";
import { isLoadingState } from "../state";
import { saveToken } from "../common/auth";
import { userInfoState } from "../state-persist";
import moveHome from "../common/api/page";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const postSignin = async () => {
    setIsLoading(true);
    const res = await axios.post(
      "http://localhost:8080/signin",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (!res.data) {
      alert("invalid email or password");
      setIsLoading(false);
      return;
    }
    console.log(res);
    saveToken({ token: res.data.token, csrf: null });
    setUserInfo((old: object) => {
      {
        return {
          ...old,
          nickname: res.data.nickname,
        };
      }
    });
    setIsLoading(false);
    window.history.pushState("signin", "", "/");
    window.history.go(0);
  };

  return (
    <>
      {/* 로딩을 이렇게 구현하는게 효율적이지 않다 왜냐하면 로딩이 필요한 페이지마다 아래 코드 한줄을 삽입해야 하기 때문이다 다른 방법이 없을까? */}
      {/* {isLoading && <Loading></Loading>} */}
      <Top>
        <p
          className="text-4xl flex-1 font-bold cursor-pointer"
          onClick={moveHome}
        >
          DUODUO
        </p>
      </Top>
      <main className="flex flex-row h-full items-center justify-center mt-24">
        <Card className="flex justify-center items-center">
          <img className="w-full" src="umi-removebg.png" alt="umi"></img>
        </Card>
        <Card className="bg-white rounded-xl p-10">
          <p className="text-3xl font-bold mb-6">SignIn</p>
          <Input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <SocialLoginBtn
            className="bg-green-400 flex justify-center items-center"
            onClick={postSignin}
          >
            {isLoading ? <Loading></Loading> : "OK"}
          </SocialLoginBtn>
          <p>or</p>
          <SocialLoginBtn className="bg-yellow-300">Kakao</SocialLoginBtn>
          <SocialLoginBtn style={{ backgroundColor: "#E26757" }}>
            Google
          </SocialLoginBtn>
          <Link to="/signup">create duoduo account</Link>
        </Card>
      </main>
    </>
  );
}

const Top = styled.header({
  width: "100%",
  height: "4rem",
  color: "white",
  backgroundColor: "#2b2d42",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Card = styled.div({
  width: "30rem",
  height: "30rem",
  display: "flex",
  flexDirection: "column",
});

const Input = styled.input({
  outline: "none",
  color: "#343a40",
  backgroundColor: "#e9ecef",
  fontSize: "1.1rem",
  padding: "0.9rem",
  borderRadius: "0.375rem",
  marginBottom: "0.7rem",
});

const SocialLoginBtn = styled.button({
  color: "white",
  height: "60px",
  cursor: "pointer",
  marginBottom: "0.3rem",
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: "0.375rem",
});

export default Signin;

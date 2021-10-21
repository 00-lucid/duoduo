import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import moveHome from "../common/api/page";
import { setCookie } from "../common/auth";
import Modal from "../components/Modal";
import { isLoadingState } from "../state";
import Loading from "./Loading";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  const isPasswordCheck = () => {
    return password === passwordCheck;
  };

  const isAll = () => {
    return isEmail() && isPassword() && isNickname();
  };

  const isEmail = () => {
    const emailRule =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return emailRule.test(email);
  };

  const isPassword = () => {
    // 특수문자 / 대문자 1개이상 && 8자리 이상
    const passwordRule =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRule.test(password);
  };

  const isNickname = () => {
    // 한 / 영 / 수 두자리 이상 9자리 이하
    const nicknameRule = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
    return nicknameRule.test(nickname);
  };

  const feedback = (callback: Function, style: any) => {
    if (!callback()) {
      console.log("잘못된 " + callback.name + "");
      style.border = "3px solid red";
    } else {
      style.border = "none";
    }
  };

  const postSignup = async () => {
    if (isPasswordCheck() && isAll()) {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:8080/signup", {
        email,
        password,
        nickname,
      });

      console.log(data);
      if (!data) {
        // 실패시
        alert("exist account of email");
        setIsLoading(false);
        return;
      }
      // 로딩이 너무 빠른 관계로 오히려 시간을 늘림

      // TODO: cookie logic
      setCookie("isUsername", false);

      setTimeout(() => {
        setIsLoading(false);

        window.history.pushState("signup", "", "/signin");
        window.history.go(0);
      }, 800);
    } else {
      alert("invalid email / password / nickname");
    }
  };

  return (
    <>
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
          <p className="text-3xl font-bold mb-6">SignUp</p>
          <Input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
              feedback(isEmail, e.target.style);
            }}
          ></Input>
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
              feedback(isPassword, e.target.style);
            }}
          ></Input>
          <Input
            type="password"
            placeholder="password check"
            onChange={(e) => setPasswordCheck(e.target.value)}
          ></Input>
          <Input
            type="text"
            placeholder="nickname"
            onChange={(e) => {
              setNickname(e.target.value);
              feedback(isNickname, e.target.style);
            }}
          ></Input>

          <SocialLoginBtn
            className="bg-green-400 flex justify-center items-center"
            onClick={postSignup}
          >
            {isLoading ? <Loading></Loading> : "OK"}
          </SocialLoginBtn>
          <Link to="/signin">i have account or social login</Link>
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

export default Signup;

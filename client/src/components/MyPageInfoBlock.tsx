import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getToken } from "../common/auth";
import { userInfoState } from "../state-persist";

function MyPageInfoBlock({ title, value, setValues, token }: any) {
  const [isInput, setIsInput] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const patchInfo = async () => {
    // api 분리가 필요할 경우 분리하자
    let res: any = null;
    // TODO: 정규표현식을 통한 텍스트 양식 검사를 진행해야됨 (email, username)
    if (!text) {
      return;
    }
    setIsInput(false);
    if (title === "이메일") {
      res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/email`,
        {
          nextEmail: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/username`,
        {
          nextUserName: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo((old: any) => {
        return {
          nickname: old.nickname,
          username: res.data,
        };
      });
    }
    if (res.data) {
      setValues(res.data);
    }
  };

  return (
    <div className="">
      <p className="flex flex-row justify-start font-bold text-lg">{title}</p>
      <hr className="mt-2 mb-2"></hr>
      <div className="flex flex-row justify-between">
        {isInput ? (
          <Input onChange={(e) => setText(e.target.value)} value={text}></Input>
        ) : (
          <p className="text-gray-400">{value}</p>
        )}
        {title !== "훈장" && !isInput && (
          <button onClick={() => setIsInput(true)}>
            <img src="./icon_pen.png" width="16" height="16"></img>
          </button>
        )}
        {isInput && (
          <section className="flex flex-row items-center justify-center">
            <button onClick={patchInfo}>
              <img src="./icon_check.png" width="16" height="16"></img>
            </button>
            <button onClick={() => setIsInput(false)}>
              <img src="./icon_close.png" width="16" height="16"></img>
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

const Input = styled.input({
  outline: "none",
  color: "#343a40",
  backgroundColor: "#e9ecef",
});

export default MyPageInfoBlock;

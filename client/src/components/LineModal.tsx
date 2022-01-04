import axios from "axios";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getToken, setCookie } from "../common/auth";
import { isLoadingState } from "../state";
import { userInfoState } from "../state-persist";

function LineModal({ setIsModal, addUserList, setText }: any) {
  const [positions, setPosition] = useState<any>("none");

  const xy = (e: MouseEvent) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
  };

  const logicPostion = (position: string) => {
    setPosition(position);
  };

  return (
    <>
      <div
        className="fixed z-50 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex itmes-center justify-center flex-col">
              <div className="sm:text-center flex flex-col items-center">
                <h3
                  className="mt-4 text-xl leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  포지션을 선택해주세요
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">최대 1 개</p>
                </div>
                <img
                  id="line"
                  src={`./${positions}.png`}
                  className="mt-2"
                  width="250px"
                  onClick={xy}
                  useMap="#Map"
                />

                <map name="Map" id="Map">
                  {/* top */}
                  <area
                    shape="rect"
                    coords="0,0,210, 40"
                    onClick={() => logicPostion("top")}
                    href="javascript:void(0);"
                  ></area>
                  <area
                    shape="rect"
                    coords="0, 0, 40, 210"
                    onClick={() => logicPostion("top")}
                    href="javascript:void(0);"
                  ></area>
                  {/* mid */}
                  <area
                    shape="poly"
                    coords="41, 180, 180, 41, 209, 40, 209, 65, 65, 209, 40, 209"
                    onClick={() => logicPostion("mid")}
                    href="javascript:void(0);"
                  ></area>
                  {/* adc */}
                  <area
                    shape="poly"
                    coords="40, 250, 250, 250, 250, 40, 210, 40, 210, 210, 40, 210"
                    onClick={() => logicPostion("adc")}
                    href="javascript:void(0);"
                  ></area>
                  {/* jg */}
                  <area
                    shape="poly"
                    coords="50, 50, 146, 56, 56, 146"
                    onClick={() => logicPostion("jg")}
                    href="javascript:void(0);"
                  ></area>
                  {/* sup */}
                  <area
                    shape="poly"
                    coords="200, 200, 104, 195, 194, 105"
                    onClick={() => logicPostion("sup")}
                    href="javascript:void(0);"
                  ></area>
                </map>
                <Input
                  onChange={(e) => setText(e.target.value)}
                  className=""
                  type="text"
                  placeholder="메모(최대30글자)"
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white hover:bg-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => addUserList(positions)}
              >
                완료
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setIsModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Input = styled.input({
  width: "250px",
  outline: "none",
  color: "#343a40",
  backgroundColor: "#e9ecef",
  fontSize: "1rem",
  padding: "0.7rem",
  borderRadius: "0.375rem",
  marginTop: "0.7rem",
});

export default LineModal;

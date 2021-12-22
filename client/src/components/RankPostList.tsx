import styled from "styled-components";

function RankPostList({ idx }: any) {
  return (
    <li className="h-1/4 border-b-2 flex flex-row items-center">
      <section className="w-1/6">{idx + 1}</section>
      <section className="bg-gray-300 h-full md:w-24">
        <img></img>
      </section>
      <section className="flex-1 h-full flex flex-col justify-center items-start m-2">
        <div className="md:text-md text-xs flex flex-row">
          <p className="font-normal cursor-pointer">테스트 게시글</p>
          <p className="font-normal text-green-400">[99]</p>
        </div>
        <div className="md:text-sm text-xs flex flex-row w-full justify-between">
          <p className="text-gray-400">1시간 전</p>
          <p className="text-gray-400">테스트 계정</p>
        </div>
      </section>
    </li>
  );
}

export default RankPostList;

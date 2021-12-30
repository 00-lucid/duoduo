import { useState } from "react";
import styled from "styled-components";
import PostBtn from "./PostBtn";

function Post({
  title,
  body,
  nickname,
  liked,
  commented,
  likeCount,
  last,
}: any) {
  const [like, setLike] = useState(liked | 0);
  const [comment, setComment] = useState(commented | 0);

  const clickLike = () => {
    console.log("like");
    setLike((old: any) => (old ? 0 : 1));
  };

  const clickComment = () => {
    console.log("comment");
    setComment((old: any) => (old ? 0 : 1));
  };

  return (
    <>
      <section
        className="flex flex-col shadow-sm h-48 p-4 mb-2 bg-white "
        ref={last}
      >
        <section className="flex font-bold text-sm text-gray-400 justify-between items-center">
          <p>{title}</p>
          <p
            className="pt-1 pb-1 pl-2 pr-2 text-white rounded"
            style={{
              backgroundColor: "#333D4B",
            }}
          >
            자유
          </p>
        </section>
        <section
          className="flex flex-start font-semibold text-lg flex-1"
          style={{
            color: "#333d4b",
          }}
        >
          <p>{body}</p>
        </section>
        <section className="flex justify-between items-center flex text-sm text-gray-400 font-bold">
          <section className="flex flex-1">
            {/* icon is freepik */}
            <section onClick={clickLike} className="cursor-pointer mr-6">
              <PostBtn text={likeCount | 0} img={`../icon_like_${like}.png`} />
            </section>
            <section onClick={clickComment} className="cursor-pointer">
              <PostBtn text={"댓글"} img={`../icon_comment_${comment}.png`} />
            </section>
          </section>
          <section className="flex flex-row items-center justify-between w-32 text-xs">
            <p>10분 전</p>
            <p>{nickname}</p>
          </section>
        </section>
      </section>
    </>
  );
}

export default Post;

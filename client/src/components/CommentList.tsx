import moment from "moment";
import styled from "styled-components";

function CommentList({ comment }: any) {
  const createdAt = moment(comment.createdAt).fromNow();
  return (
    <>
      <section className="w-full h-auto border-green-400 flex flex-col text-sm mb-4">
        <section className="w-full flex flex-row justify-between itmes-center">
          <section className="flex flex-row items-center">
            <div className="mr-1 font-bold">{comment.user.nickname}</div>
            <div className="text-gray-400 text-xs">{createdAt}</div>
          </section>
          <button className="w-6 h-6 text-xs text-gray-400 font-bold">
            신고
          </button>
        </section>
        <section className="flex flex-row text-left">
          <p>{comment.text}</p>
        </section>
        <section className="flex flex-row borer h-4 ">
          <p className="text-gray-400 text-xs cursor-pointer font-bold">
            공감하기
          </p>
        </section>
      </section>
    </>
  );
}

export default CommentList;

import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/Post";
import PostWrite from "../components/PostWrite";
import TopMenu from "../components/TopMenu";

function Community() {
  const [width, setWidth] = useState(window.innerWidth);
  const [ref, inView] = useInView();
  const [link, setLink] = useState(window.location.href);
  const [isWrite, setIsWrite] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    // TODO: url에 따라 다른 요청이 필요함
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/community/all?page=0`)
      .then(({ data }) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  useEffect(() => {
    setLink(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    if (inView && page * 10 === posts.length) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/community/all?page=${page}`)
        .then(({ data }) => {
          setTimeout(() => {
            console.log(data);
            setPosts((old: any) => [...old, ...data]);
            setPage((old: any) => old + 1);
          }, 500);
        });
    }
  }, [inView]);

  return (
    <>
      <TopMenu />
      <Main className="flex flex-row">
        {width > 767 && <section className="border w-1/3">콘솔</section>}
        <section className="flex flex-col flex-1 bg-gray-100">
          <div className="bg-white w-full h-12 mb-2 shadow-md sticky top-0 flex flex-row justify-between">
            <section className="flex flex-row items-center h-full p-4 justify-between w-24 text-base font-extrabold text-gray-400">
              {/* {link === "http://localhost:3000/community/all?sort=hot" ? (
                <Link
                  to="/community/all?sort=hot"
                  className="cursor-pointer text-green-400"
                >
                  인기
                </Link>
              ) : (
                <Link to="/community/all?sort=hot" className="cursor-pointer">
                  인기
                </Link>
              )} */}
              {link === "http://localhost:3000/community/all?page=0" ? (
                <Link
                  to="/community/all?page=0"
                  className="cursor-pointer text-green-400"
                >
                  최신
                </Link>
              ) : (
                <Link to="/community/all?page=0" className="cursor-pointer">
                  최신
                </Link>
              )}
            </section>
            <section
              className="flex flex-row items-center h-full p-4 text-base font-extrabold"
              style={{
                color: "#333d4b",
              }}
            >
              {isWrite ? (
                <button onClick={() => setIsWrite(false)}>취소</button>
              ) : (
                <button onClick={() => setIsWrite(true)}>글쓰기</button>
              )}
            </section>
          </div>
          {isWrite && <PostWrite setIsWrite={setIsWrite} setPosts={setPosts} />}
          {posts.map((el: any, idx) => {
            if (
              idx === posts.length - 1 &&
              idx > 8 &&
              posts.length % 10 === 0
            ) {
              return (
                <Post
                  key={el.id}
                  title={el.title}
                  body={el.body}
                  nickname={el.nickname}
                  liked={el.liked}
                  commented={el.commented}
                  likeCount={el.like}
                  last={ref}
                />
              );
            } else {
              return (
                <Post
                  key={el.id}
                  title={el.title}
                  body={el.body}
                  nickname={el.nickname}
                  liked={el.liked}
                  commented={el.commented}
                  likeCount={el.like}
                />
              );
            }
          })}
        </section>
      </Main>
      {inView && <p>로딩중</p>}
    </>
  );
}
const Main = styled.main`
  padding-left: 16.666%;
  padding-right: 16.666%;
  color: #333d4b;
  @media screen and (max-width: 767px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default Community;

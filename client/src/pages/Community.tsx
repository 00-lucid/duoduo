import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { movePage } from "../common/api/page";
import { getToken } from "../common/auth";
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
  const [isAll, setIsAll] = useState(true);
  const [isConsole, setIsConsole] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    // TODO: url에 따라 다른 요청이 필요함
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/community/all?page=0`, {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      })
      .then(({ data }) => {
        setPosts(data);
      });
  }, []);

  const clickWrite = () => {
    if (getToken().token) {
      setIsWrite((old) => !old);
    } else {
      movePage("/signin");
    }
  };

  useEffect(() => {
    setLink(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    if (inView && page * 10 === posts.length) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/community/all?page=${page}`, {
          headers: {
            Authorization: `Bearer ${getToken().token}`,
          },
        })
        .then(({ data }) => {
          setPosts((old: any) => [...old, ...data]);
          setPage((old: any) => old + 1);
        });
    }
  }, [inView]);

  return (
    <>
      <TopMenu />
      <Main className="flex flex-row">
        {width > 767 ? (
          <section className="shadow-md w-1/3 h-80 sticky top-16 border-l border-t border-b bg-white">
            <div className="w-full h-80 flex flex-col text-left p-4 font-bold">
              {isAll ? (
                <>
                  <div className="cursor-pointer text-white bg-green-400 rounded p-2 mb-1">
                    전체
                  </div>
                  <div
                    className="cursor-pointer text-gray-400 m-2"
                    onClick={() => setIsAll(false)}
                  >
                    자유
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="cursor-pointer text-gray-400 rounded p-2 mb-1"
                    onClick={() => setIsAll(true)}
                  >
                    전체
                  </div>
                  <div className="cursor-pointer text-white rounded p-2 bg-green-400">
                    자유
                  </div>
                </>
              )}
            </div>
          </section>
        ) : isConsole ? (
          <section className="shadow-md w-full h-auto border-l border-t border-b fixed bottom-0 z-20 bg-white">
            <div className="w-full flex flex-col text-left pt-4 pl-4 pr-4 font-bold">
              {isAll ? (
                <>
                  <div className="cursor-pointer text-white bg-green-400 rounded p-2 mb-1">
                    전체
                  </div>
                  <div
                    className="cursor-pointer text-gray-400 m-2"
                    onClick={() => setIsAll(false)}
                  >
                    자유
                  </div>
                  <div
                    className="w-full flex flex-col font-bold items-center "
                    onClick={() => setIsConsole(false)}
                  >
                    <img src="../icon_down.png" width="32" height="32" />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="cursor-pointer text-gray-400 rounded p-2 mb-1"
                    onClick={() => setIsAll(true)}
                  >
                    전체
                  </div>
                  <div className="cursor-pointer text-white bg-green-400 rounded p-2 mb-1">
                    자유
                  </div>
                  <div
                    className="w-full flex flex-col font-bold items-center"
                    onClick={() => setIsConsole(false)}
                  >
                    <img
                      src="../icon_down.png"
                      width="32"
                      height="32"
                      onClick={() => setIsConsole(false)}
                    />
                  </div>
                </>
              )}
            </div>
          </section>
        ) : (
          <section className="shadow-md w-full h-auto border-l border-t border-b fixed bottom-0 z-20 bg-white">
            <div
              className="w-full flex flex-col p-1 font-bold items-center"
              onClick={() => setIsConsole(true)}
            >
              <img src="../icon_up.png" width="32" height="32" />
            </div>
          </section>
        )}
        <section className="flex flex-col flex-1 bg-gray-100 min-h-screen border">
          <div className="bg-white w-full h-12 mb-2 shadow-md sticky top-16 flex flex-row justify-between">
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
                <button onClick={clickWrite}>취소</button>
              ) : (
                <button onClick={clickWrite}>글쓰기</button>
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
                  postId={el.id}
                  title={el.title}
                  body={el.body}
                  nickname={el.nickname}
                  liked={el.liked}
                  commented={el.commented}
                  likeCount={el.like}
                  createdAt={el.createdAt}
                  last={ref}
                />
              );
            } else {
              return (
                <Post
                  key={el.id}
                  postId={el.id}
                  title={el.title}
                  body={el.body}
                  nickname={el.nickname}
                  liked={el.liked}
                  commented={el.commented}
                  likeCount={el.likeCount}
                  createdAt={el.createdAt}
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

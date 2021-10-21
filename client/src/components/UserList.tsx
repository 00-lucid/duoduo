import styled from "styled-components";

function UserList() {
  return (
    <li className="flex flex-row border h-20 bg-white">
      <section className="flex flex-row items-center">
        <div className="border-2 border-green-300 w-16 h-16 rounded-full m-2"></div>
        <div className="m-2">
          <p>SKT T1 Faker</p>
          <p>t1_faker</p>
        </div>
        <div className="border w-16 h-16 m-2"></div>
        <p className="m-2">C1</p>
      </section>
      <section className="flex flex-row items-center">
        <div className="w-40 bg-gray-200 h-6 m-2">최근승률</div>
        <div className="m-2">가렌 갈리오 갱플랭크</div>
        <div className="m-2">4.3</div>
        <div className="m-2">상</div>
        <div className="m-2">76점</div>
        <div className="m-2">53%</div>
      </section>
      <section className="border">
        <button className="bg-green-400">
          <p className="text-white font-medium text-medium">같이하기</p>
        </button>
      </section>
    </li>
  );
}

export default UserList;

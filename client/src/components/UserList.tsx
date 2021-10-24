import styled from "styled-components";

function UserList({ room }: any) {
  return (
    <li
      className="flex flex-row border h-20 text-white justify-start rounded-l-lg mb-2 overflow-hidden"
      style={{ backgroundColor: "#2b2d42" }}
    >
      <section className="flex flex-row items-center">
        <div className="border-2 border-green-300 w-16 h-16 rounded-full m-2"></div>
        <div className="m-2 w-40 text-left">
          <p>{room.username}</p>
          <p className="opacity-50">{room.nickname}</p>
        </div>
        <div className="border w-16 h-16 ml-2"></div>
        <p className="w-4 m-3 font-black">{room.tier}</p>
        <div className="w-40 bg-gray-200 h-6 m-2"></div>
        <div className="m-2 border w-40 h-16"></div>
        <div className="w-4 m-3">{room.kda}</div>
        <div className="w-4 m-3">{room.poro}</div>
        <div className="w-4 m-3">{room.synergy}</div>
        <div className="w-4 m-3">53%</div>
        <button className="bg-green-400 ml-10 w-10 h-full flex flex-row items-center justify-center">
          <img className="w-6 h-6" src="icon_arrow.png"></img>
        </button>
      </section>
    </li>
  );
}

export default UserList;

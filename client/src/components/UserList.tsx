import styled from "styled-components";

function UserList({ room }: any) {
  return (
    <li
      className="relative flex flex-row border h-20 justify-start rounded-lg mb-2 overflow-hidden shadow-md bg-gray-50 hover:bg-white hover:scale-105 transform transition duration-500"
      style={{ color: "#333d4b" }}
    >
      <section className="flex flex-row items-center ">
        <div className="border-green-300 w-14 h-14 rounded-full m-2 overflow-hidden">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/${room.profileIconId}.png`}
          />
        </div>
        <div className="m-2 w-40 text-left">
          <p className="font-bold">{room.username}</p>
          <p className="opacity-40">{room.nickname}</p>
        </div>
        <div className="w-14 h-14 ml-2">
          <img src={`./${room.position}.png`} />
        </div>
        <TierText tier={room.tier} className="w-4 m-3 font-bold">
          {room.tier}
        </TierText>
        <div className="w-40 bg-gray-200 h-6 m-2">
          <Graph rate={room.recent_rate}>
            <p className="text-xs font-light">{room.recent_rate}%</p>
          </Graph>
        </div>
        <div
          className="flex flex-row m-2 border h-14"
          style={{ width: "168px" }}
        >
          <img
            className="h-full"
            style={{ width: "56px" }}
            src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room.most[0].championName}.png`}
          ></img>
          <img
            className="h-full"
            style={{ width: "56px" }}
            src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room.most[1].championName}.png`}
          ></img>
          <img
            className="h-full"
            style={{ width: "56px" }}
            src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${room.most[2].championName}.png`}
          ></img>
        </div>
        {/* <div className="w-4 m-3">{room.kda}</div> */}
        {/* <div className="w-4 m-3">{room.poro}</div> */}
        {/* <div className="w-4 m-3">{room.synergy}</div> */}
        <div className="w-4 m-3">{room.total_rate}%</div>
        <button className="absolute bg-green-400 ml-10 w-10 h-full flex flex-row items-center justify-center inset-y-0 right-0">
          <img className="w-6 h-6" src="icon_arrow.png"></img>
        </button>
      </section>
    </li>
  );
}

const Graph = styled.div<{ rate: string }>`
  width: ${(props) => (props.rate ? `${props.rate}%` : "0%")};
  height: 100%;
  background-color: #34d399;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TierText = styled.div<{ tier: string }>`
  color: ${(props) => {
    if (!props.tier) return "#333d4b";
    const tier = props.tier[0];
    const tierToColor: { [index: string]: string } = {
      I: "#69605C",
      B: "#964B00",
      S: "#C0C0C0",
      G: "#FFD700",
      P: "#65c3ba",
      D: "#6FD1F4",
      M: "#D486BB",
      C: "#aaaaaa",
    };
    return tierToColor[tier];
  }};
`;

export default UserList;

import styled from "styled-components";

function PermissionList({ username }: any) {
  return (
    <>
      <div
        className="bg-white w-full h-8 shadow-md mb-2 flex flex-row items-center pl-2 justify-between rounded-sm"
        style={{ color: "#333d4b" }}
      >
        <section>
          <p className="font-bold text-sm">{username}</p>
        </section>
        <section className="text-sm text-white h-full">
          <button className="bg-red-400 font-bold h-full p-2">거절</button>
          <button className="bg-green-400 font-bold h-full p-2 rounded-r-sm">
            수락
          </button>
        </section>
      </div>
    </>
  );
}

export default PermissionList;

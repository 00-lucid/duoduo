import styled from "styled-components";

function AlarmModal({ alarm }: any) {
  return (
    <>
      <div className="flex flex-col fixed bg-white w-1/3 items-center justify-center rounded-md left-1/3 top-14 p-3">
        <img src="./icon_x.png" width="32" height="32" className="mb-1"></img>
        <p className="text-sm font-medium">{alarm?.text}</p>
      </div>
    </>
  );
}

export default AlarmModal;

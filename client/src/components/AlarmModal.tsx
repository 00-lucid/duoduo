import styled from "styled-components";

function AlarmModal({ alarm, idx }: any) {
  return (
    <>
      <Alarm interval={idx}>
        <img
          src={`./icon_${alarm.type}.png`}
          width="32"
          height="32"
          className="mb-1"
        ></img>
        <p className="text-sm font-medium">{alarm?.text}</p>
      </Alarm>
    </>
  );
}

const Alarm = styled.div<{ interval: number }>`
  display: flex;
  position: fixed;
  flex-direction: column;
  background-color: white;
  width: 33%;
  height: 10%;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  left: 33%;
  z-index: 20;
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  top: ${(props) => (props.interval ? `${props.interval * 12 + 3}%` : "3%")};
`;

export default AlarmModal;

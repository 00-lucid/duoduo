import styled from "styled-components";

function AlarmModal({ alarm, idx }: any) {
  return (
    <>
      <section className="w-full flex flex-row justify-center items-center z-50">
        <Alarm interval={idx} className="md:w-1/3 w-5/6 mt-16">
          {window.location.href.includes("community") ? (
            <img
              src={`../icon_${alarm.type}.png`}
              width="32"
              height="32"
              className="mb-1"
            ></img>
          ) : (
            <img
              src={`./icon_${alarm.type}.png`}
              width="32"
              height="32"
              className="mb-1"
            ></img>
          )}

          <p className="text-sm font-medium">{alarm?.text}</p>
        </Alarm>
      </section>
    </>
  );
}

const Alarm = styled.div<{ interval: number }>`
  display: flex;
  position: fixed;
  flex-direction: column;
  background-color: white;
  height: 10%;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  z-index: 50;
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  top: ${(props) => (props.interval ? `${props.interval * 12 + 3}%` : "3%")};
`;

export default AlarmModal;

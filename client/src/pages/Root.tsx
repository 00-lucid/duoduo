import { Link } from "react-router-dom";
import styled from "styled-components";

function Root() {
  return (
    <Top>
      <p className="text-4xl flex-1 font-bold">DUODUO</p>
      <GreenBtn className="flex-2">
        <Link to="signin">
          <p className="text-2xl font-bold">SIGN IN</p>
        </Link>
      </GreenBtn>
    </Top>
  );
}

const Top = styled.header({
  width: "100%",
  height: "4rem",
  color: "white",
  backgroundColor: "#2b2d42",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const GreenBtn = styled.button({
  backgroundColor: "#06d6a0",
  height: "100%",
  padding: "0.7rem",
});

export default Root;

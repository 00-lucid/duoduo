import "./App.css";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <TopMenu>
        <h1 className="text-black">DuODuO</h1>
        <h2>sign in</h2>
      </TopMenu>
    </div>
  );
}

const TopMenu = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  color: "white",
  alignItems: "center",
  backgroundColor: "#282c34",
});

export default App;

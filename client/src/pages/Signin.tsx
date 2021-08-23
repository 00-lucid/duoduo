import styled from "styled-components";

function Signin() {
  return (
    <>
      <Top>
        <p className="text-4xl flex-1 font-bold">DUODUO</p>
      </Top>
      <main className="flex flex-row h-full items-center justify-center mt-24">
        <Card className="flex justify-center items-center">
          <img
            className="w-full"
            src="https://o.remove.bg/downloads/edc7bb66-b66e-49c3-b446-108dffc61231/umi-removebg-preview.png"
            alt="umi"
          ></img>
        </Card>
        <Card className="bg-white rounded-xl p-10">
          <p className="text-3xl font-bold mb-6">SignIn</p>
          <Input type="text" placeholder="email"></Input>
          <Input type="password" placeholder="password"></Input>
          <SocialLoginBtn className="bg-yellow-300">Kakao</SocialLoginBtn>
          <SocialLoginBtn style={{ backgroundColor: "#E26757" }}>
            Google
          </SocialLoginBtn>
          <SocialLoginBtn className="bg-blue-500">Facebook</SocialLoginBtn>
        </Card>
      </main>
    </>
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

const Card = styled.div({
  width: "30rem",
  height: "30rem",
  display: "flex",
  flexDirection: "column",
});

const Input = styled.input({
  outline: "none",
  color: "#343a40",
  backgroundColor: "#e9ecef",
  fontSize: "1.2rem",
  padding: "0.9rem",
  borderRadius: "0.375rem",
  marginBottom: "0.7rem",
});

const SocialLoginBtn = styled.button({
  color: "white",
  height: "60px",
  cursor: "pointer",
  marginBottom: "0.3rem",
  fontSize: "1.2rem",
  fontWeight: 600,
  borderRadius: "0.375rem",
});

export default Signin;

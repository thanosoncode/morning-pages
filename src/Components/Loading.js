import styled from "styled-components";

const Loading = () => {
  return <Spinner></Spinner>;
};

export default Loading;

const Spinner = styled.div`
  width: 6rem;
  height: 6rem;
  border: 5px solid lightgray;
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.color};
  animation: spinner 0.6s linear infinite;
  margin: 0 auto;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

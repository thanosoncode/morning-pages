import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  p {
    width: 100%;
    margin: 0;
    padding: 0 30px;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 10px 0;
`;

export const SwitchContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 999px;
  padding: 3px 9px;
  width: 240px;
  span {
    width: 50%;
    text-align: center;
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

export const SwitchHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.color};
  border-radius: 999px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(${({ move }) => move});
  cursor: pointer;
  transition: 0.4s ease-out;
`;

export const Insights = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 30px;
  border: 1px solid ${({ theme }) => theme.colorVeryLight};
  background: ${({ theme }) => theme.colorVeryLightBg};

  div {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  span:nth-child(odd) {
    font-size: 0.9rem;
    margin-bottom: 2px;
  }

  span:nth-child(even) {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex-direction: row;
  padding-right: 20px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    margin: 0;
    color: #777;
    cursor: pointer;
    transition: 0.3s ease;
  }

  span:hover {
    color: #aaa;
  }

  span:last-child {
    margin-left: 20px;
  }
`;

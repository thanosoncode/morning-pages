import styled from "styled-components";

export const StyledProfile = styled.div`
  max-width: 540px;
  margin: 20px auto;

  h1 {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 40px;
  }
`;
export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  p:first-child {
    font-weight: 500;
  }

  p:last-child {
    color: #8d9da1;
  }
`;

export const Button = styled.button`
  border-radius: 999px;
  background: none;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  padding: 12px 24px;
  transition: 0.3s ease;
  font-weight: 600;

  &:hover {
    background-color: #eee;
  }
`;

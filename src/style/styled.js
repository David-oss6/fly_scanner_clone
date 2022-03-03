import styled from "styled-components";

export const GoRetBtn = styled.button`
  font-size: 0.7rem;
  font-weight: bold;
  border: none;
  background-color: none;
  padding: 4px;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${({ goRet }) => (goRet ? "#340068" : "#ffffff")};
  color: ${({ goRet }) => (goRet ? "#ffffff" : "#000000")};

  @media (max-width: 800px) {
    font-size: 0.5rem;
  }
`;

export const GoBtn = styled.button`
  font-size: 0.7rem;
  font-weight: bold;
  border: none;
  background-color: none;
  padding: 4px;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${({ go }) => (go ? "#340068" : "white")};
  color: ${({ go }) => (go ? "#ffffff" : "#000000")};

  @media (max-width: 800px) {
    font-size: 0.5rem;
  }
`;

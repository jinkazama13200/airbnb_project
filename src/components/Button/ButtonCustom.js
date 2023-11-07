import styled from "@emotion/styled";
import { colorConfigs } from "../../configs/colorConfigs";

export const ButtonSign = styled.button`
  color: black;
  background-color: ${colorConfigs.color.primary.main};
  padding: 10px 15px;
  border: 2px solid ${colorConfigs.color.primary.main};
  border-radius: 7px;
  cursor: pointer;
  margin: 10px;
  font-size: 15px;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    color: black;
  }
`;
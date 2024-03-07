import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { color, flexbox, grid, layout, overflow, position, space, width } from "styled-system";

const backColors = {
  Work: "hsl(15, 100%, 70%)",
  Play: "hsl(195, 74%, 62%)",
  Study: "hsl(348, 100%, 68%)",
  Exercise: "hsl(145, 58%, 55%)",
  Social: "hsl(264, 64%, 52%)",
  "Self Care": "hsl(43, 84%, 65%)",
  common: "hsl(235, 46%, 20%)",
  profile: "hsl(246, 80%, 60%)",
};

const Box = styled("div", {
  shouldForwardProp,
})` 
  border-radius: 14px;
  display: flex; 
  flex-direction: column; 
  height: ${(prop) => (!prop.height ? prop.height : "fit-content")};
  background-color: ${(prop) => backColors[prop.bgcolor]};
  ${layout}
  ${position}
  ${flexbox}
  ${space}
  ${color}
  ${grid} 
  ${width}
  ${overflow}
`;

Box.propTypes = {
  ...layout.propTypes,
  ...space.propTypes,
  ...color.propTypes,
};
export default Box;

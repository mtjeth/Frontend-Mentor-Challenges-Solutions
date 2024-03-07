import Box from "./components/Box";
import { css } from "@emotion/react";
import data from "./data";
import { useState } from "react";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  color,
  grid,
  height,
  layout,
  space,
  typography,
  width,
} from "styled-system";

function Home() {
  const [duration, setDuration] = useState("daily");

  const Button = styled("a", {
    shouldForwardProp,
  })`
    color: ${(prop) => (prop.selected ? "white" : "hsl(235, 45%, 61%)")};
    &:hover {
      color: white;
      cursor: pointer;
    }
    padding-block: 12px;
    ${space}
  `;

  const Image = styled("img", { shouldForwardProp })`
    border: 4px solid white;
    border-radius: 50%;
    ${layout}
    ${space} 
    ${width}
    ${height}
  `;

  const Typography = styled("p", { shouldForwardProp })`
    font-size: 18px;
    margin: 0;
    width: fit-content;
    ${color}
    ${space}
    ${typography}
    ${layout}
  `;

  const Container = styled("div", { shouldForwardProp })`
    display: grid;
    height: fit-content;
    max-width: 1111px;
    color: white;
    padding-top: 80px;
    overflow: hidden;
    ${grid}
    ${layout} 
    ${width}
  `;

  return (
    <Container
      gridGap={["24px", "24px", "30px"]}
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
      gridTemplateRows={{
        _: "auto",
        mdlg: "repeat(3, 1fr)",
        xl: "repeat(2, 1fr)",
      }}
      width={["87%", "87%", "80%"]}
    >
      <Box
        gridRow={{ _: "1/1", lg: "1/-1" }}
        gridColumn={{ _: "1/-1", lg: "1/2" }}
      >
        <Box bgcolor="common" height="100%">
          <Box
            bgcolor="profile"
            flexDirection={{ _: "row", lg: "column" }}
            py={"30px"}
            px={["5px", "29px"]}
            justifyContent="center"
            alignItems="center"
            minHeight={[0, 0,0, "60%"]}
          >
            <Image
              width={["72px", "76px", "76px", "80px", "85px"]}
              height={["72px", "76px", "76px", "80px", "85px"]}
              src="./assets/images/image-jeremy.png"
            />
            <Box
              justifyContent="space-evenly"
              pl={["10px", "10px", "10px", "0"]}
              pt={[0, 0, 0,"40px"]}
            >
              <Typography fontSize="14px" color="hsl(236, 100%, 87%)">
                Report for
              </Typography>
              <Typography
                as={"h1"}
                fontSize={["24px", "24px", "24px", "28px", "32px"]}
                fontWeight={{ _: "500", lg: "700" }}
                mt="10px"
              >
                Jeremy Robson
              </Typography>
            </Box>
          </Box>
          <Box
            justifyContent={[
              "space-evenly",
              "space-evenly",
              "space-evenly",
              "center",
            ]}
            alignItems={["center", "center", "center", "flex-start"]}
            flexDirection={{ _: "row", lg: "column" }}
            minHeight={[0, 0, 0, "30%"]}
            px="30px"
            py={["14px", "14px", "14px", 0]}
          >
            <Button
              selected={duration === "daily"}
              onClick={() => setDuration("daily")}
            >
              Daily
            </Button>
            <Button
              selected={duration === "weekly"}
              onClick={() => setDuration("weekly")}
            >
              Weekly
            </Button>
            <Button
              selected={duration === "monthly"}
              onClick={() => setDuration("monthly")}
            >
              Monthly
            </Button>
          </Box>
        </Box>
      </Box>
      {data.map((card) => (
        <Box key={card.title} position="relative">
          <Box
            bgcolor={card.title}
            overflow="hidden"
            height="75px"
            width="100%"
            position="absolute"
          >
            <img
              style={{
                position: "absolute",
                top: -5,
                right: 15,
                height: "fit-content",
              }}
              src={`./assets/images/icon-${card.title
                .replace(/\s+/g, "-")
                .toLowerCase()}.svg`}
            />
          </Box>
          <Box
            px={["24px", "29px"]}
            py="30px"
            bgcolor="common"
            zIndex="2"
            mt={45}
            css={css`
              &:hover {
                background-color: hsl(235, 46%, 30%);
                cursor: pointer;
              }
            `}
          >
            <Box
              alignItems="center"
              justifyContent="space-between"
              css={css`
                flex-direction: row;
                svg {
                  fill: #bbc0ff;
                  z-index: 20;
                }
                svg:hover {
                  fill: white;
                }
              `}
            >
              <Typography as="h3" fontSize="16px" fontWeight="500">
                {card.title}
              </Typography>
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
              </svg>
            </Box>
            <Box
              flexDirection={{ _: "row", lg: "column" }}
              justifyContent="space-between"
              alignItems={{ _: "center", lg: "none" }}
            >
              <Typography
                as={"h2"}
                fontSize={["25px", "30px", "36px", "42px"]}
                pt={["14px ", "14px ", "30px "]}
                pb={[" 0", " 0", " 20px"]}
              >
                {card.timeframes[duration].current}hrs
              </Typography>
              <Typography
                fontSize={["14px", "14px", "16px"]}
                fontWeight="300"
                color=" hsl(235, 45%, 61%)"
                textAlign="right"
              >
                Last Week - {card.timeframes[duration].previous}hrs
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Container>
  );
}

export default Home;

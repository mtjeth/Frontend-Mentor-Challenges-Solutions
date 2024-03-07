import { Global, ThemeProvider, css } from "@emotion/react";
import Home from "./Home";
import theme from "./theme";
import Attribute from "./Attribute";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Global
          styles={css`
            html,
            body,
            #root,
            .app {
              min-height: 100vh;
              min-width: 100vw;
              margin: 0;
              padding: 0;
              font-family: "Rubik", sans-serif;
              overflow-x: hidden;
            }
            body {
              background: hsl(226, 43%, 10%);
            }
            .app {
              display: flex;
              justify-content: center; 
              align-items: center;
              flex-direction: column;
            }
          `}
        />
        <Home />
        <Attribute />
      </div>
    </ThemeProvider>
  );
};

export default App;

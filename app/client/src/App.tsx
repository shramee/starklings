import { ThemeProvider, Typography, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  publicProvider,
  voyager,
} from "@starknet-react/core";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import { ErrorFallback } from "./components/error/ErrorFallback";
import { BasicLayout } from "./components/layout/BasicLayout";
import { CheckGitHubAccount } from "./components/pages/Check/CheckGitHubAccount";
import { CheckGraduates } from "./components/pages/Check/CheckGraduates";
import { EvaluateGraduates } from "./components/pages/EvaluateGraduates/EvaluateGraduates";
import { FinalScreen } from "./components/pages/FinalScreen/FinalScreen";
import { Home } from "./components/pages/Home/Home";
import { Workspace } from "./components/pages/Workspace/Workspace";
import { StarknetProvider } from "./context/StarknetProvider";
import { useNotification } from "./hooks/useNotification";
import { GenericModal } from "./components/modals/GenericModal";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#dd3d3d",
    },
  },
});

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { showError } = useNotification();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        showError(error.message);
      },
    }),
  });

  const chains = [sepolia];
  const provider = publicProvider();
  const connectors = [braavos(), argent()];

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <StarknetConfig
        chains={chains}
        provider={provider}
        connectors={connectors}
        explorer={voyager}
      >
        <StarknetProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
              {/* <GenericModal
                id="starknet_hackathon"
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
                image_src="/starknet_hackathon.png"
                image_alt="Starknet Hackathon: Re{ignite}"
                // title="Starknet Hackathon"
                // date="Starting May 12"
                // description="From idea to MVP: Build real solutions, form teams, and compete for prizes."
                // button_text="Register for Hackathon"
                link="https://www.hackquest.io/hackathons/Starknet-Hackathon-Re%7Bignite%7D?utm=starklings"
              /> */}

              <BasicLayout>
                <>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/exercise/:id" element={<Workspace />} />
                    <Route path="/end" element={<FinalScreen />} />
                    <Route
                      path="/check/:account"
                      element={<CheckGitHubAccount />}
                    />{" "}
                    <Route path="/graduates" element={<CheckGraduates />} />
                    <Route
                      path="/evaluate-students"
                      element={<EvaluateGraduates />}
                    />
                  </Routes>
                  <Box
                    className="snf-pow"
                    sx={{ position: "fixed", bottom: 0, right: 0, zIndex: 999 }}
                  >
                    <Typography
                      sx={{
                        p: 1,
                        pr: 2,
                        pl: 2,
                        fontSize: 13,
                        color: "#b0b0b0",
                      }}
                    >
                      powered by Starknet Foundation
                    </Typography>
                  </Box>
                </>
              </BasicLayout>
            </ThemeProvider>
          </QueryClientProvider>
        </StarknetProvider>
      </StarknetConfig>
    </ErrorBoundary>
  );
}

export default App;

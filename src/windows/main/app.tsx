import React from "react";
import { RegisterForm } from "./../../shared/ui/register-form";
import { MainMenu } from "../../shared/ui/main-menu";
import { Box, AppBar } from "@mui/material";
import { LogEntriesTable } from "../../shared/ui/log-entries";
import { WorkingSummary } from "../../shared/ui/working-summary";

interface Props {}

const App: React.FC<Props> = (props) => {
  const [activePage, setActivePage] = React.useState("logEntries");

  return (
    <>
      <MainMenu width={300} setActivePage={setActivePage} />

      {activePage === "logEntries" && (
        <>
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${300}px)` },
              ml: { sm: `${300}px` },
              background: "#fff",
              color: "black",
            }}
          >
            <Box margin={2}>
              <RegisterForm />
            </Box>
          </AppBar>

          <Box style={{ marginLeft: 300 }} marginTop={11} padding={2}>
            <LogEntriesTable />
          </Box>
        </>
      )}
      {activePage === "workOverview" && (
        <Box style={{ marginLeft: 300 }} marginTop={1} padding={2}>
          <WorkingSummary />
        </Box>
      )}
    </>
  );
};

export default App;

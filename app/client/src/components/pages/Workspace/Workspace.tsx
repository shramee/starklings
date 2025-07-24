import { Editor } from "@monaco-editor/react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Edit } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useMemo, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  CURRENT_EXERCISE,
  EXERCISE_SOLUTION,
  GITHUB_ENABLED,
  USERNAME,
} from "../../../constants/localStorage";
import { useGetExercise } from "../../../queries/useGetExercise";
import { useGetExercises } from "../../../queries/useGetExercises";
import { useGetHint } from "../../../queries/useGetHint";
import { antiCheatShouldContain } from "../../../utils/antiCheat";
import { compileCairoCode } from "../../../utils/compileCairoCode";
import {
  findNextExercise,
  findPrevExercise,
} from "../../../utils/exerciseNavigation";
import { CircularProgressCenterLoader } from "../../shared/CircularProgressCenterLoader";
import { ActionBar } from "./ActionBar";
import { MobileWarningDialog } from "./MobileWarningDialog";
import { Sidebar } from "./Sidebar";
import { useMarkExerciseDone } from "../../../queries/useMarkExerciseDone";
import LinkifyText from "../../layout/LinkfyText";

export const Workspace = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const compatibility = !!searchParams.get("compatibility");

  const heightOffset = 50 + 38.5;

  const { data: exercises } = useGetExercises();
  const { data, isLoading } = useGetExercise(id);
  const [editorValue, setEditorValue] = useState("");
  const [compileError, setCompileError] = useState<string | undefined>(
    undefined
  );
  const [succeeded, setSucceeded] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const nextId = findNextExercise(exercises ?? [], id ?? "");
  const prevId = findPrevExercise(exercises ?? [], id ?? "");
  const navigate = useNavigate();
  const [hint, setHint] = useState<string | undefined>(undefined);
  const [warning, setWarning] = useState<string | undefined>(undefined);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const isTest = data?.mode === "test";
  const {
    mutate: getHint,
    data: hintResponse,
    isPending: hintLoading,
  } = useGetHint(id ?? "", (data) => {
    setHint(data.data.hints);
  });

  const { mutateAsync: markExerciseDone } = useMarkExerciseDone();

  useEffect(() => {
    const savedSolution = id
      ? localStorage.getItem(`${EXERCISE_SOLUTION}${id}`)
      : null;

    if (savedSolution) {
      if (!compatibility) {
        setEditorValue(savedSolution);
      }
    } else if (data?.code) {
      if (!compatibility) {
        setEditorValue(data.code);
      }
    } else {
      setEditorValue("");
    }
  }, [data?.code]);

  const reset = () => {
    setSucceeded(false);
    setHint(undefined);
    setCompileError(undefined);
    setWarning(undefined);
  };

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleEditAction = (action: () => void) => {
    closeEditDialog();
    action();
  };

  const handleCompileClick = async () => {
    let mode;
    if (data?.mode === "test") {
      if (data?.id.startsWith("starknet")) {
        mode = "TEST_CONTRACT";
      } else {
        mode = "TEST";
      }
    } else {
      mode = "COMPILE";
    }

    setCompiling(true);
    setCompileError(undefined);
    setSucceeded(false);

    try {
      const result = await compileCairoCode(editorValue, mode, data?.antiCheat?.append);

      if (result.success) {
        try {
          antiCheatShouldContain(editorValue, data?.antiCheat?.shouldContain);
          nextId && localStorage.setItem(CURRENT_EXERCISE, nextId);
          setSucceeded(true);
          if (id) {
            markExerciseDone(id);
            localStorage.setItem(`${EXERCISE_SOLUTION}${id}`, editorValue);
          }
          setHint(undefined);
          setWarning(undefined);
        } catch (e) {
          console.log(e);
          setWarning(e?.toString());
        }
      } else {
        const { message } = result;
        
        let processedMessage = message;
        if (message.includes("tests")) {
          const lines = message.split('\n');
          const originalLines = lines.slice();
          const filteredLines = lines.filter(line => !line.includes("duplicate"));
          const removedCount = originalLines.length - filteredLines.length;
          
          if (removedCount > 0) {
            const updatedLines = filteredLines.map(line => {
              if (line.startsWith("running") && line.includes("tests")) {
                const match = line.match(/running (\d+) tests/);
                if (match) {
                  const currentCount = parseInt(match[1]);
                  const newCount = currentCount - removedCount;
                  return line.replace(/running \d+ tests/, `running ${newCount} tests`);
                }
              }
              return line;
            });
            processedMessage = updatedLines.join('\n');
          } else {
            processedMessage = filteredLines.join('\n');
          }
        }
        
        setCompileError(processedMessage);
      }
    } catch (error) {
      console.error('Compilation request failed:', error);
      setCompileError(`Network error: ${error}`);
    } finally {
      setCompiling(false);
    }
  };

  const handleHintClick = async () => {
    getHint();
  };

  const handleNextClick = () => {
    reset();
    nextId && localStorage.setItem(CURRENT_EXERCISE, nextId);
    navigate(nextId ? `/exercise/${nextId}` : "/end");
  };

  const handlePrevClick = () => {
    reset();
    if (prevId) {
      localStorage.setItem(CURRENT_EXERCISE, prevId);
      navigate(`/exercise/${prevId}`);
    }
  };

  const handleRestartClick = () => {
    localStorage.removeItem(CURRENT_EXERCISE);
    navigate(`/`);
  };

  const resetCode = () => {
    localStorage.removeItem(`${EXERCISE_SOLUTION}${id}`);
    setEditorValue(data?.code ?? "");
  };

  const handleAddExerciseClick = () => {
    window.open("https://github.com/shramee/starklings/blob/main/EXERCISE_CONTRIBUTION_GUIDE.md", "_blank");
  };

  const handleEditExerciseClick = () => {
    if (data?.path) {
      const githubUsername = localStorage.getItem(USERNAME);
      window.open(`https://github.com/${githubUsername}/starklings/edit/main/${data.path}`, "_blank");
    }
  };

  const handleEditHintClick = async () => {
    const githubUsername = localStorage.getItem(USERNAME);

    try {
      const response = await fetch(`https://raw.githubusercontent.com/${githubUsername}/starklings/main/info.toml`);
      const content = await response.text();
      
      const lines = content.split('\n');
      const searchPattern = `name = "${data?.id}"`;
      const lineNumber = lines.findIndex(line => line.trim() === searchPattern) + 1;

      if (lineNumber > 0) {
        window.open(`https://github.com/${githubUsername}/starklings/edit/main/info.toml#L${lineNumber}`, "_blank");
      } else {
        window.open(`https://github.com/${githubUsername}/starklings/edit/main/info.toml`, "_blank");
      }
    } catch (error) {
      console.error('Error fetching info.toml:', error);
      window.open(`https://github.com/${githubUsername}/starklings/edit/main/info.toml`, "_blank");
    }
  };

  const isGitHubConnected = !!localStorage.getItem(GITHUB_ENABLED);

  return (
    <Box sx={{ height: "100%", overflowY: "hidden", display: "flex" }}>
      <Sidebar currentExercise={id ?? ""} />
      <PanelGroup direction={"horizontal"}>
        <Grid sx={{ mt: 0, height: "100%" }} container spacing={2}>
          <Panel minSizePercentage={25} defaultSizePercentage={50}>
            {/* description + alerts */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflowY: "auto",
                height: `calc(100vh - ${heightOffset}px)`,
              }}
            >
              {/* description */}
              <Box sx={{ px: 8, py: 6 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                  <Typography sx={{ textTransform: "capitalize" }} variant="h4">
                    {data?.name}
                  </Typography>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={openEditDialog}
                      sx={{ p: 0.25, color: "#FFF" }}
                      aria-label="edit-options"
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                {isLoading && <CircularProgressCenterLoader />}
                {data && (
                  <Typography>
                    {data.description?.trim() !== ""
                      ? data.description?.split(".\n").map((line, i) => <p key={i}>{line}.</p>)
                      : "Make me compile! Having trouble to solve it? Click 'GET HINT' button for help!"}
                  </Typography>
                )}
              </Box>
              {/* alerts */}
              <Box>
                {hintLoading && <CircularProgressCenterLoader />}
                {hint && (
                  <Alert
                    sx={{ m: 2, ml: 4, color: "#FFF" }}
                    severity="info"
                    variant="filled"
                  >
                    <AlertTitle>Hint</AlertTitle>
                    <Typography sx={{ whiteSpace: "pre-wrap", fontSize: 14 }}>
                      <LinkifyText
                        text={hint}
                        style={{ color: "#FFF" }}
                        linkStyle={{ color: "#FFF", fontStyle: "italic" }}
                      />
                      <br />
                      <br />
                      Remember that you can always check the Cairo book at{" "}
                      <Link
                        target="_blank"
                        sx={{ color: "#FFF", fontStyle: "italic" }}
                        href={"https://book.cairo-lang.org/"}
                      >
                        https://book.cairo-lang.org/
                      </Link>{" "}
                      or the Cairo documentation at{" "}
                      <Link
                        target="_blank"
                        sx={{ color: "#FFF", fontStyle: "italic" }}
                        href={"https://docs.cairo-lang.org/"}
                      >
                        https://docs.cairo-lang.org/
                      </Link>
                      .
                    </Typography>
                  </Alert>
                )}
                {warning && (
                  <Alert
                    sx={{ m: 2, ml: 4 }}
                    variant="filled"
                    severity="warning"
                  >
                    <AlertTitle>Beware!</AlertTitle>
                    The submitted code compiles, but you are not following the
                    exercise rules. <br /> <br />
                    <b>{warning}</b>
                    <br />
                    <br />
                    Please, re-read the exercise description and comments on the
                    code section. <br />
                    If necessary, you can reset code clicking the icon on the
                    bottom right corner.
                  </Alert>
                )}
                {succeeded && (
                  <Alert
                    sx={{ m: 2, ml: 4 }}
                    variant="filled"
                    severity="success"
                  >
                    <AlertTitle>Great!</AlertTitle>
                    The submitted code compiles perfectly. Click{" "}
                    <strong>NEXT</strong> whenever you are ready to proceed.
                  </Alert>
                )}
                {compileError && (
                  <Alert
                    sx={{ m: 2, ml: 4, wordBreak: "break-all" }}
                    variant="filled"
                    severity="error"
                  >
                    <AlertTitle>
                      Ups! Something went wrong with your code
                    </AlertTitle>
                    <Typography sx={{ whiteSpace: "pre-wrap", fontSize: 14 }}>
                      {compileError}
                      <br />
                      Fix the code and click <strong>{isTest ? "TEST" : "COMPILE"}</strong> again.
                    </Typography>
                  </Alert>
                )}
              </Box>
            </Box>
            <ActionBar
              onGetHintClick={handleHintClick}
              onCompileClick={handleCompileClick}
              onNextClick={handleNextClick}
              onPrevClick={handlePrevClick}
              onRestartClick={handleRestartClick}
              isTest={isTest}
              succeeded={succeeded}
              hintVisible={!!hint}
              first={!prevId}
              compilePending={compiling}
              last={!nextId}
            />
          </Panel>
          <PanelResizeHandle>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                backgroundColor: "#000",
                width: 5,
              }}
            />
          </PanelResizeHandle>
          <Panel minSizePercentage={25} defaultSizePercentage={50}>
            {isLoading ? (
              <CircularProgressCenterLoader />
            ) : (
              <>
                {compatibility ? (
                  <TextField
                    id="compatibility-editor"
                    multiline
                    rows={30}
                    onChange={(e) => {
                      const val = e.target.value;
                      val && setEditorValue(val);
                    }}
                    fullWidth
                    value={editorValue}
                  />
                ) : (
                  <Editor
                    onChange={(val) => val && setEditorValue(val)}
                    theme="vs-dark"
                    height="100%"
                    width="100%"
                    options={{
                      scrollBeyondLastLine: false,
                      fontSize: 16,
                    }}
                    defaultLanguage="rust"
                    value={editorValue}
                  />
                )}
                <Box sx={{ position: "absolute", bottom: 35, right: 25 }}>
                  <Tooltip title="Reset code">
                    <IconButton
                      onClick={resetCode}
                      sx={{ p: 0.5, color: "#FFF" }}
                      aria-label="reset-code"
                    >
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}
          </Panel>
        </Grid>
      </PanelGroup>
      {isMobileOnly && <MobileWarningDialog />}
      
      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="edit-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="edit-dialog-title">
          🛠️ Edit Options - {data?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            <strong>📋 Prerequisites:</strong>
            <br />
            • You must have the project <strong>forked</strong> in your GitHub account
            <br />
            • Your fork must be <strong>synced</strong> with the main repository
            <br />
            • You must be <strong>logged into GitHub</strong> in Starklings
          </DialogContentText>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleEditAction(handleAddExerciseClick)}
              sx={{ 
                justifyContent: "flex-start", 
                textAlign: "left",
                py: 1.5,
                px: 2,
                backgroundColor: "#2196f3",
                "&:hover": {
                  backgroundColor: "#1976d2"
                }
              }}
            >
              <Box>
                <Box sx={{ fontWeight: "bold", mb: 0.5 }}>
                  📚 View Contribution Guide
                </Box>
                <Box sx={{ fontSize: "0.85em", opacity: 0.9 }}>
                  Learn how to add or edit exercises
                </Box>
              </Box>
            </Button>

            {isGitHubConnected && (
              <Button
                variant="contained"
                onClick={() => handleEditAction(handleEditExerciseClick)}
                sx={{ 
                  justifyContent: "flex-start", 
                  textAlign: "left",
                  py: 1.5,
                  px: 2,
                  backgroundColor: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#388e3c"
                  }
                }}
              >
                <Box>
                  <Box sx={{ fontWeight: "bold", mb: 0.5 }}>
                    ✏️ Edit Exercise Code
                  </Box>
                  <Box sx={{ fontSize: "0.85em", opacity: 0.9 }}>
                    Modify description and code of {data?.name}
                  </Box>
                </Box>
              </Button>
            )}

            {isGitHubConnected && (
              <Button
                variant="contained"
                onClick={() => handleEditAction(handleEditHintClick)}
                sx={{ 
                  justifyContent: "flex-start", 
                  textAlign: "left",
                  py: 1.5,
                  px: 2,
                  backgroundColor: "#ff9800",
                  "&:hover": {
                    backgroundColor: "#f57c00"
                  }
                }}
              >
                <Box>
                  <Box sx={{ fontWeight: "bold", mb: 0.5 }}>
                    💡 Edit Exercise Hint
                  </Box>
                  <Box sx={{ fontSize: "0.85em", opacity: 0.9 }}>
                    Improve hints for {data?.name} (goes to exact line)
                  </Box>
                </Box>
              </Button>
            )}

            {!isGitHubConnected && (
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: "rgba(255, 193, 7, 0.1)", 
                  borderRadius: 1,
                  border: "1px solid rgba(255, 193, 7, 0.3)"
                }}
              >
                <Box sx={{ fontWeight: "bold", color: "#ff6f00", mb: 1 }}>
                  ⚠️ GitHub not connected
                </Box>
                <Box sx={{ fontSize: "0.9em" }}>
                  Connect your GitHub account to access exercise editing options.
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

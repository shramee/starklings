import { SkipNext, SkipPrevious, Edit } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

interface IActionBarProps {
  onGetHintClick: () => {};
  onCompileClick: () => void;
  onNextClick: () => void;
  onPrevClick: () => void;
  onRestartClick: () => void;
  onAddExerciseClick: () => void;
  onEditExerciseClick?: () => void;
  onEditHintClick?: () => void;
  isGitHubConnected?: boolean;
  currentExerciseName?: string;
  isTest: boolean;
  succeeded: boolean;
  hintVisible: boolean;
  first: boolean;
  compilePending: boolean;
  last: boolean;
}

export const ActionBar = ({
  onGetHintClick,
  onCompileClick,
  onPrevClick,
  onNextClick,
  onRestartClick,
  onAddExerciseClick,
  onEditExerciseClick,
  onEditHintClick,
  isGitHubConnected,
  currentExerciseName,
  isTest,
  succeeded,
  hintVisible,
  first,
  compilePending,
  last,
}: IActionBarProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
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

  return (
    <>
      <Box
        sx={{
          background: "#111",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", ml: 4, gap: 1 }}>
          {/* <Tooltip title="Start over">
                <IconButton
                  onClick={openDialog}
                  sx={{ p: 0.5, color: "#FFF" }}
                  aria-label="start-over"
                >
                  <RestartAltIcon />
                </IconButton>
              </Tooltip> */}
          <Tooltip title="Edit options">
            <IconButton
              onClick={openEditDialog}
              sx={{ p: 0.5, color: "#FFF" }}
              aria-label="edit-options"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to previous exercise">
            <IconButton
              disabled={first}
              onClick={onPrevClick}
              sx={{ p: 0.5, color: "#FFF" }}
              aria-label="previous exercise"
            >
              <SkipPrevious />
            </IconButton>
          </Tooltip>
          <Tooltip title="Skip current exercise">
            <IconButton
              disabled={last}
              onClick={onNextClick}
              sx={{ p: 0.5, color: "#FFF" }}
              aria-label="skip-exercise"
            >
              <SkipNext />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          className="exercise-btnset"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onGetHintClick}
            disabled={hintVisible || succeeded || compilePending}
          >
            Get Hint
          </Button>
          <Button
            disabled={compilePending}
            variant="contained"
            color="success"
            data-cy="run-button"
            onClick={onCompileClick}
          >
            {isTest ? "Test" : "Compile"}
            {compilePending && <CircularProgress sx={{ ml: 1 }} size="1rem" />}
          </Button>
          {succeeded && (
            <Button variant="contained" color="secondary" onClick={onNextClick}>
              Next
            </Button>
          )}
        </Box>
      </Box>

      {/* Edit Options Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="edit-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="edit-dialog-title">
          🛠️ Edit Options - {currentExerciseName}
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
              onClick={() => handleEditAction(onAddExerciseClick)}
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

            {isGitHubConnected && onEditExerciseClick && (
              <Button
                variant="contained"
                onClick={() => handleEditAction(onEditExerciseClick)}
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
                    Modify description and code of {currentExerciseName}
                  </Box>
                </Box>
              </Button>
            )}

            {isGitHubConnected && onEditHintClick && (
              <Button
                variant="contained"
                onClick={() => handleEditAction(onEditHintClick)}
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
                    Improve hints for {currentExerciseName} (goes to exact line)
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

      {/* Restart Dialog (existing) */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to start over?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you click 'OK', the app will be restarted and you will loose all
            your progress.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onRestartClick} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { List, ListItem, Typography, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetExercises } from "../../../queries/useGetExercises";
import { CircularProgressCenterLoader } from "../../shared/CircularProgressCenterLoader";

export const CheckGitHubAccount = () => {
  const { account } = useParams();
  const [accountInput, setAccountInput] = useState("");
  const [searchedAccount, setSearchedAccount] = useState<string | undefined>(account);
  const [hasSearched, setHasSearched] = useState(!!account);
  
  const { data: exercises, isLoading } = useGetExercises(searchedAccount);
  const completedExercises =
    exercises?.filter((exercise) => exercise.completed)?.length ?? 0;
    
  const handleSearch = () => {
    const trimmedAccount = accountInput.trim();
    if (trimmedAccount) {
      setSearchedAccount(trimmedAccount);
      setHasSearched(true);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 6,
        flexDirection: "column",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Check Student Progress
      </Typography>
      
      <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "center" }}>
        <TextField
          label="GitHub Username"
          variant="outlined"
          fullWidth
          value={accountInput}
          onChange={(e) => setAccountInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g.: username"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#FFF",
              "& fieldset": {
                borderColor: "#666",
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#dd3d3d",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#CCC",
              "&.Mui-focused": {
                color: "#dd3d3d",
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={!accountInput.trim()}
          sx={{
            backgroundColor: "#dd3d3d",
            "&:hover": {
              backgroundColor: "#bb2d2d",
            },
            "&:disabled": {
              backgroundColor: "#666",
            },
            minWidth: "120px",
            height: "56px",
          }}
        >
          Search
        </Button>
      </Box>

      {hasSearched && searchedAccount && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Results for: {searchedAccount}
          </Typography>
          {!isLoading && (
            <Typography sx={{ mb: 3 }}>
              {completedExercises}/{exercises?.length ?? 54} exercises completed
            </Typography>
          )}
          <Box sx={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}>
            {isLoading ? (
              <CircularProgressCenterLoader />
            ) : (
              <List>
                {exercises?.map((exercise) => (
                  <ListItem
                    sx={{
                      my: 0,
                      py: 0.5,
                    }}
                    key={exercise.id}
                  >
                    <Typography
                      sx={{
                        color: exercise.completed ? "#34b830" : "#999",
                      }}
                    >
                      {exercise.name}
                    </Typography>
                    {exercise.completed && (
                      <CheckCircleOutlineIcon
                        sx={{ fontSize: 18, color: "#34b830", ml: 2 }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

import { Alert, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

export const EvaluateGraduates = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 6,
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Evaluate students</Typography> <br />
      <Typography sx={{mt: 4}}>
        Upload a .csv file containing a single column labeled 'Students' with GitHub usernames, one per line.
      </Typography>
      <Typography variant="caption" component="div" sx={{ my: 2 }}>
        Example:
        <pre>
          Students <br />
          firstStudent <br />
          secondStudent <br />
          thirdStudent <br />
        </pre>
      </Typography>
      <Typography>
        Upon submission, you'll receive a .csv file listing the students and their Starklings exercises completion status.
      </Typography>
      <Alert severity="info" sx={{ my: 2, maxWidth: 600 }}>
        Student evaluation compares against the backend database of the full
        app. app-lite stores progress only in this browser, so evaluation is
        not available here — use the full app for this feature.
      </Alert>
      <Box sx={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="csv-file-input"
          />
          <label htmlFor="csv-file-input">
            <Button variant="contained" sx={{ my: 2, borderRadius: 0 }} component="span">
              Select CSV File
            </Button>
          </label>
          {file && (
            <Typography sx={{ mt: 2 }}>Selected file: {file.name}</Typography>
          )}
          <br />
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            disabled={!file}
          >
            Submit CSV
          </Button>
        </form>
      </Box>
    </Box>
  );
};

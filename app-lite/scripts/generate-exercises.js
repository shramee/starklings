#!/usr/bin/env node
/**
 * Generates src/data/exercises.json (lightweight index) and
 * src/data/exercises/<id>.json (one full file per exercise) from the
 * repo's info.toml, the .cairo exercise sources, and app/api/anti-cheat.json.
 *
 * Run with: npm run generate
 */
const fs = require("fs");
const path = require("path");
const toml = require("@iarna/toml");

const REPO_ROOT = path.resolve(__dirname, "../..");
const OUT_DIR = path.resolve(__dirname, "../src/data");
const OUT_EXERCISES_DIR = path.join(OUT_DIR, "exercises");

const infoToml = fs.readFileSync(path.join(REPO_ROOT, "info.toml"), "utf8");
const parsed = toml.parse(infoToml);

const antiCheat = JSON.parse(
  fs.readFileSync(path.join(REPO_ROOT, "app/api/anti-cheat.json"), "utf8")
);

/**
 * Splits exercise code into intro comments (description) and code, mirroring
 * app/api/src/controllers/exercises.controller.js parseExerciseContent.
 */
const parseExerciseContent = (code) => {
  const lines = code.split("\n");
  const introComments = [];
  const exerciseCodeLines = [];
  let foundFirstCodeLine = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (foundFirstCodeLine) {
      exerciseCodeLines.push(line);
      continue;
    }
    if (trimmedLine.startsWith("//")) {
      const commentText = line.replace(/^(\s*\/\/\s*)/, "").trim();
      if (!commentText.includes("I AM NOT DONE")) {
        introComments.push(commentText);
      }
    } else if (trimmedLine !== "") {
      foundFirstCodeLine = true;
      exerciseCodeLines.push(line);
    }
  }

  return [introComments.join("\n"), exerciseCodeLines.join("\n")];
};

/** Humanize an exercise id the same way the client's getName does. */
const getName = (name) => {
  let formattedName = name.replaceAll("_", " ");
  formattedName = formattedName.replace(/(\d+)/g, " $1");
  formattedName = formattedName.replace(/\s+/g, " ").trim();
  return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
};

const exercises = parsed.exercises.map((exercise, index) => {
  const sourcePath = path.join(REPO_ROOT, exercise.path);
  const source = fs.readFileSync(sourcePath, "utf8");
  const [description, code] = parseExerciseContent(source);

  return {
    id: exercise.name,
    name: getName(exercise.name),
    path: exercise.path,
    mode: exercise.mode,
    exercise_order: index + 1,
    description,
    code,
    hint: exercise.hint,
    antiCheat: antiCheat[exercise.name],
  };
});

// 1. Lightweight index — sidebar/ExerciseList/navigation only.
const index = exercises.map(({ id, name, mode, exercise_order }) => ({
  id,
  name,
  mode,
  exercise_order,
}));

// 2. One full file per exercise, loaded on demand via dynamic import.
fs.mkdirSync(OUT_EXERCISES_DIR, { recursive: true });
for (const exercise of exercises) {
  fs.writeFileSync(
    path.join(OUT_EXERCISES_DIR, `${exercise.id}.json`),
    JSON.stringify(exercise, null, 2)
  );
}

fs.writeFileSync(
  path.join(OUT_DIR, "exercises.json"),
  JSON.stringify(index, null, 2)
);

console.log(
  `Generated ${exercises.length} exercises -> ${OUT_EXERCISES_DIR} and ${OUT_DIR}/exercises.json`
);

use console::style;
use std::{env::current_dir, fs, path::PathBuf, process::Command};

// Prepares testing crate
// Copies the exercise file into testing crate
pub fn prepare_crate_for_exercise(file_path: &PathBuf) -> PathBuf {
    let crate_path = current_dir().unwrap().join(PathBuf::from("runner-crate"));
    let src_dir = crate_path.join("src");
    if !src_dir.exists() {
        let _ = fs::create_dir(&src_dir);
    }
    let lib_path = src_dir.join("lib.cairo");
    let file_path = current_dir().unwrap().join(file_path);

    match fs::copy(&file_path, &lib_path) {
        Ok(_) => {}
        Err(err) => panic!("Error occurred while preparing the exercise,\nExercise: {file_path:?}\nLib path: {lib_path:?}\n{err:?}"),
    };
    crate_path
}

// Builds the testing crate with scarb CLI
pub fn scarb_build(file_path: &PathBuf) -> anyhow::Result<String> {
    let crate_path = prepare_crate_for_exercise(file_path);

    let output = Command::new("scarb")
        .args(["build"])
        .current_dir(&crate_path)
        .env("FORCE_COLOR", "1")
        .env("CLICOLOR_FORCE", "1")
        .output()
        .map_err(|e| anyhow::anyhow!("Failed to execute scarb build: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        let stdout = String::from_utf8_lossy(&output.stdout);
        anyhow::bail!("Scarb build failed:\nstdout:\n{}\nstderr:\n{}", stdout, stderr);
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(stdout.to_string())
}

// Runs the crate with scarb CLI
pub fn scarb_run(file_path: &PathBuf) -> anyhow::Result<String> {
    let crate_path = prepare_crate_for_exercise(file_path);

    println!(
        "   {} {}\n",
        style("Running").green().bold(),
        file_path.to_str().unwrap()
    );

    let output = Command::new("scarb")
        .args(["cairo-run"])
        .current_dir(&crate_path)
        .env("FORCE_COLOR", "1")
        .env("CLICOLOR_FORCE", "1")
        .output()
        .map_err(|e| anyhow::anyhow!("Failed to execute scarb cairo-run: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        let stdout = String::from_utf8_lossy(&output.stdout);
        anyhow::bail!("Scarb cairo-run failed:\nstdout:\n{}\nstderr:\n{}", stdout, stderr);
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(stdout.to_string())
}

// Runs tests on the testing crate with scarb CLI
pub fn scarb_test(file_path: &PathBuf) -> anyhow::Result<String> {
    let crate_path = prepare_crate_for_exercise(file_path);

    let output = Command::new("scarb")
        .args(["test"])
        .current_dir(&crate_path)
        .env("FORCE_COLOR", "1")
        .env("CLICOLOR_FORCE", "1")
        .output()
        .map_err(|e| anyhow::anyhow!("Failed to execute scarb test: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        let stdout = String::from_utf8_lossy(&output.stdout);
        anyhow::bail!("Scarb test failed:\nstdout:\n{}\nstderr:\n{}", stdout, stderr);
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(stdout.to_string())
}

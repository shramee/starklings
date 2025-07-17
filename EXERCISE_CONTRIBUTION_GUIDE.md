# Guide to Adding or Editing Starklings Exercises

This guide will help you add new exercises or edit existing ones in the Starklings project, an interactive platform to learn Cairo and Starknet.

## 📁 Project Structure

Starklings exercises are organized as follows:

```
starklings/
├── exercises/                 # 📂 Main exercises directory
│   ├── arrays/               # 📂 Array exercises
│   ├── variables/            # 📂 Variable exercises
│   ├── functions/            # 📂 Function exercises
│   ├── starknet/             # 📂 Starknet-specific exercises
│   └── ...                   # 📂 Other categories
├── info.toml                 # ⚙️ Exercises and hints configuration
```

## 🔧 Exercise Components

Each exercise in Starklings has **3 main components**:

### 1. 📄 Exercise File (`.cairo`)
- **Location**: `exercises/<category>/<exercise_name>.cairo`
- **Contains**: Cairo code with descriptive comments and the marker `// I AM NOT DONE`

### 2. 📝 Configuration in `info.toml`
- **Location**: `info.toml` (project root)
- **Contains**: Exercise metadata, execution mode, and hints

📋 **Prerequisites:**
• You must have the project forked in your GitHub account
• Your fork must be synced with the main repository

## ✏️ Editing an Existing Exercise

### Edit the Exercise Description

To change the description of an exercise (for example, `arrays1.cairo`):

1. **Open the exercise file:**
   ```bash
   exercises/arrays/arrays1.cairo
   ```

2. **Edit the comments at the top of the file:**
   ```cairo
   // Your new exercise description here
   // Explain what the student should do
   // You can use multiple comment lines
   
   // I AM NOT DONE  ← This marker must stay
   
   fn create_array() -> Array<felt252> {
       // ... exercise code
   }
   ```

**⚠️ Important:**
- Only edit the comments at the top of the file
- **Do NOT remove** the `// I AM NOT DONE` line (it's needed for the system)
- Use `//` for all descriptions

### Edit the Exercise Hint

To change the hint shown to students:

1. **Open the configuration file:**
   ```bash
   info.toml
   ```

2. **Find the exercise section:**
   ```toml
   [[exercises]]
   name = "arrays1"
   path = "exercises/arrays/arrays1.cairo"
   mode = "test"
   hint = """
   Your new hint here.
   You can use multiple lines.
   Give key concepts or subtle tips.
   """
   ```

## ➕ Adding a New Exercise

### Step 1: Create the Exercise File

1. **Go to the right category** (or create a new one):
   ```bash
   cd exercises/<category>/
   ```

2. **Create the `.cairo` file:**
   ```cairo
   // Clear and concise exercise description
   // Explain what concept it teaches
   // Give specific instructions
   
   // I AM NOT DONE
   
   fn example_exercise() {
       // Starter code with blanks or errors
       // for the student to complete
   }
   
   // Test or verification code
   #[test]
   fn test_example() {
       // Tests to validate the solution
   }
   ```

### Step 2: Configure in `info.toml`

1. **Open `info.toml`** and find your category section

2. **Add the exercise configuration:**
   ```toml
   [[exercises]]
   name = "new_exercise"                    # Unique exercise name
   path = "exercises/category/new_exercise.cairo"  # Path to the file
   mode = "test"                            # "test", "run", or "build"
   hint = """
   Helpful hint for the student.
   Can include:
   - Links to docs: https://book.cairo-lang.org/...
   - Key concepts to remember
   - Tips about the solution (not the full answer)
   """
   ```

## 🔄 Exercise Modes

In `info.toml`, each exercise has a `mode` field that determines how it runs:

- **`"test"`**: Runs the exercise tests
- **`"run"`**: Runs the main program

## ✅ Best Practices

### For Exercise Descriptions:
- 📝 Be clear and concise
- 🎯 Focus on one concept per exercise
- 📚 Mention previous concepts if needed
- 🔍 Give enough context without revealing the solution

### For Hints:
- 💡 Give tips, not full solutions
- 🔗 Include links to relevant docs
- 📖 Explain key concepts if needed
- 🎯 Be specific about what to look for

### For Code:
- 🏗️ Include useful starter code
- ✅ Add tests to validate the solution
- 🚫 Keep the `// I AM NOT DONE` marker
- 📦 Import needed dependencies

With this guide and the quick edit buttons, you can now easily add and edit Starklings exercises! 🚀

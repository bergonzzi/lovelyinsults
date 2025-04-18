const fs = require("fs")
const path = require("path")

// Function to check if a file or directory exists
function exists(filePath) {
  try {
    return fs.existsSync(filePath)
  } catch (err) {
    return false
  }
}

// Function to delete a file if it exists
function deleteIfExists(filePath) {
  if (exists(filePath)) {
    console.log(`Deleting: ${filePath}`)
    try {
      fs.unlinkSync(filePath)
      return true
    } catch (err) {
      console.error(`Error deleting ${filePath}:`, err)
      return false
    }
  }
  return false
}

// Function to delete a directory recursively
function deleteDirectoryRecursive(directoryPath) {
  if (exists(directoryPath)) {
    console.log(`Deleting directory: ${directoryPath}`)
    try {
      fs.rmSync(directoryPath, { recursive: true, force: true })
      return true
    } catch (err) {
      console.error(`Error deleting directory ${directoryPath}:`, err)
      return false
    }
  }
  return false
}

console.log("Starting cleanup of conflicting files...")

// Delete App Router files if Pages Router files exist
if (exists(path.join(process.cwd(), "pages", "index.js"))) {
  deleteIfExists(path.join(process.cwd(), "app", "page.tsx"))
  deleteIfExists(path.join(process.cwd(), "app", "page.js"))
}

// Delete duplicate 404 files
if (exists(path.join(process.cwd(), "pages", "404.js")) && exists(path.join(process.cwd(), "pages", "404.tsx"))) {
  deleteIfExists(path.join(process.cwd(), "pages", "404.tsx"))
}

// Delete duplicate not-found files
if (
  exists(path.join(process.cwd(), "pages", "not-found.js")) &&
  exists(path.join(process.cwd(), "pages", "not-found.tsx"))
) {
  deleteIfExists(path.join(process.cwd(), "pages", "not-found.tsx"))
}

// Delete the entire app directory if it exists
deleteDirectoryRecursive(path.join(process.cwd(), "app"))

console.log("Cleanup completed.")

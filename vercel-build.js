const fs = require("fs")
const { execSync } = require("child_process")
const path = require("path")

// Function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath)
  } catch (err) {
    return false
  }
}

// Check for conflicting files
const pagesIndexPath = path.join(process.cwd(), "pages", "index.js")
const appPagePath = path.join(process.cwd(), "app", "page.tsx")

// If both exist, remove the pages/index.js file
if (fileExists(pagesIndexPath) && fileExists(appPagePath)) {
  console.log("Detected conflicting files. Removing pages/index.js...")
  fs.unlinkSync(pagesIndexPath)
}

// Create a simple 404.js file in the pages directory
const simple404Content = `
export default function Custom404() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
        flexDirection: "column",
        textAlign: "center",
        padding: "0 1rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 - Page Not Found</h1>
      <p style={{ marginBottom: "2rem" }}>"404: The page is missing. Much like your sense of direction."</p>
      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          backgroundColor: "#f0f0f0",
          color: "#333",
          textDecoration: "none",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      >
        Return to Home
      </a>
    </div>
  )
}
`

const pages404Path = path.join(process.cwd(), "pages", "404.js")
fs.writeFileSync(pages404Path, simple404Content)
console.log("Created simple 404.js file in pages directory")

// Create a simple not-found.js file in the app directory
const simpleNotFoundContent = `
export default function NotFound() {
  return null
}
`

const appNotFoundPath = path.join(process.cwd(), "app", "not-found.js")
fs.writeFileSync(appNotFoundPath, simpleNotFoundContent)
console.log("Created simple not-found.js file in app directory")

// Check for _document.js and fix it if needed
const documentPath = path.join(process.cwd(), "pages", "_document.js")
if (fileExists(documentPath)) {
  console.log("Checking _document.js file...")
  const documentContent = fs.readFileSync(documentPath, "utf8")

  // If it contains problematic imports, replace the file
  if (documentContent.includes("import { Html,") || documentContent.includes("import {Html,")) {
    const fixedDocumentContent = `
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
`
    fs.writeFileSync(documentPath, fixedDocumentContent)
    console.log("Fixed _document.js file")
  }
}

// Run the actual build command
console.log("Running Next.js build...")
try {
  execSync("next build", { stdio: "inherit" })
  console.log("Build completed successfully!")
} catch (error) {
  console.error("Build failed:", error)
  process.exit(1)
}

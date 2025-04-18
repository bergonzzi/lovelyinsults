const fs = require("fs")
const path = require("path")

// Clean up conflicting files before build
try {
  // Check if app directory exists and remove it
  const appDir = path.join(__dirname, "app")
  if (fs.existsSync(appDir)) {
    console.log("Removing app directory to avoid conflicts...")
    fs.rmSync(appDir, { recursive: true, force: true })
  }

  // Check for duplicate 404 files
  const page404tsx = path.join(__dirname, "pages", "404.tsx")
  if (fs.existsSync(page404tsx)) {
    console.log("Removing duplicate 404.tsx...")
    fs.unlinkSync(page404tsx)
  }

  // Check for duplicate not-found files
  const pageNotFoundTsx = path.join(__dirname, "pages", "not-found.tsx")
  if (fs.existsSync(pageNotFoundTsx)) {
    console.log("Removing duplicate not-found.tsx...")
    fs.unlinkSync(pageNotFoundTsx)
  }
} catch (error) {
  console.error("Error during cleanup:", error)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

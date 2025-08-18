#!/usr/bin/env node

// Pre-build optimizations
console.log('🔧 Running pre-build optimizations...')

// Clean build artifacts
const fs = require('fs')
const path = require('path')

const cleanDirs = ['.next', 'out', 'dist']
cleanDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true })
    console.log(`✅ Cleaned ${dir}`)
  }
})

console.log('✅ Pre-build complete')
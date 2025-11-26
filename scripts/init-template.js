#!/usr/bin/env node

/**
 * Template Initialization Script
 *
 * This script helps initialize a new project from the React Native Expo template.
 * It prompts for project details and updates all necessary configuration files.
 *
 * Usage:
 *   node scripts/init-template.js
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * Prompts user for input with a question
 */
function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

/**
 * Sanitizes project name for use as a slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Replaces content in a file
 */
function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`)
    return
  }

  let content = fs.readFileSync(filePath, 'utf8')

  for (const [search, replace] of Object.entries(replacements)) {
    content = content.replace(new RegExp(search, 'g'), replace)
  }

  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`✅ Updated: ${filePath}`)
}

/**
 * Updates JSON file with new values
 */
function updateJsonFile(filePath, updates) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`)
    return
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const json = JSON.parse(content)

  Object.assign(json, updates)

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8')
  console.log(`✅ Updated: ${filePath}`)
}

/**
 * Main initialization function
 */
async function main() {
  console.log('\n🚀 React Native Expo Template Initialization\n')
  console.log(
    'This script will help you set up a new project from this template.\n',
  )

  // Gather project information
  const projectName = await question('Project name (e.g., "My Awesome App"): ')
  const projectSlug = slugify(projectName)
  const defaultSlug = await question(
    `Project slug [${projectSlug}]: `,
  )
  const slug = defaultSlug || projectSlug

  const bundleId = await question(
    'iOS Bundle ID (e.g., "com.company.appname"): ',
  )
  const androidPackage = await question(
    `Android package name [${bundleId}]: `,
  )
  const packageName = androidPackage || bundleId

  const appleTeamId = await question('Apple Team ID (optional, press Enter to skip): ')

  const scheme = await question(`URL scheme [${slug}]: `)
  const urlScheme = scheme || slug

  const easProjectId = await question(
    'EAS Project ID (optional, press Enter to skip): ',
  )

  rl.close()

  console.log('\n📝 Updating configuration files...\n')

  // Update app.json
  const appJsonUpdates = {
    name: projectName,
    slug: slug,
    scheme: urlScheme,
    ios: {
      bundleIdentifier: bundleId,
      supportsTablet: true,
      newArchEnabled: true,
    },
    android: {
      package: packageName,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'android.permission.RECORD_AUDIO',
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.CAMERA',
      ],
      newArchEnabled: true,
    },
  }

  if (appleTeamId) {
    appJsonUpdates.ios.appleTeamId = appleTeamId
  }

  if (easProjectId) {
    appJsonUpdates.extra = {
      ...appJsonUpdates.extra,
      eas: {projectId: easProjectId},
    }
  }

  updateJsonFile('app.json', appJsonUpdates)

  // Update app.config.js
  const appConfigReplacements = {
    'com\\.woutervanderlaan\\.audiotour': bundleId.replace(/\./g, '\\.'),
    AudioTour: projectName,
    audiotour: slug,
  }
  replaceInFile('app.config.js', appConfigReplacements)

  // Update package.json
  updateJsonFile('package.json', {
    name: slug,
    version: '1.0.0',
  })

  // Update README.md
  const readmeReplacements = {
    AudioTour: projectName,
    'An AI-powered React Native app that generates dynamic audio tours based on museum objects photographed by users.*':
      `${projectName} - A React Native application built with Expo.`,
  }
  replaceInFile('README.md', readmeReplacements)

  // Update CLAUDE.md
  const claudeMdReplacements = {
    'An AI-powered React Native app that generates dynamic audio tours based on museum objects photographed by users.*':
      `${projectName} - A React Native application built with Expo.`,
  }
  replaceInFile('CLAUDE.md', claudeMdReplacements)

  console.log('\n✨ Template initialization complete!\n')
  console.log('Next steps:')
  console.log('1. Run: npm install')
  console.log('2. Run: npm run prepare (to set up Husky hooks)')
  console.log('3. Update your app icons in assets/images/')
  console.log('4. Configure environment variables (copy .env.example to .env)')
  console.log('5. Update the README.md with your project details')
  console.log('6. Start building: npm start\n')
  console.log('📚 See TEMPLATE-README.md for detailed setup instructions.\n')
}

main().catch(error => {
  console.error('❌ Error:', error.message)
  process.exit(1)
})

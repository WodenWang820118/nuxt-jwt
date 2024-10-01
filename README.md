# Eaglys

## Table of Contents

- [Requirements](#requirements)
- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture and workflow](#architecture-and-workflow)
- [Alternatives](#alternatives)

## Requirements

- Simulated generation of "secretphrase.txt" file
- Secure storage and retrieval of secret phrases
- Authentication process using the secret phrase
- Access control for special pages

## Pre-requisites

- Node.js (version 18.x or higher); The project uses v22.8.0
- pnpm (version 9.10.0)

## Installation

If you haven't had the pnpm installed, you can install it by running the following command:

```bash
npm install -g pnpm
```

Then,

```bash
pnpm install
```

# Usage

```bash
pnpm run start
```

# Architecture and workflow

### Technology Stack

- NuxtJS: A powerful Vue.js framework for building modern web applications
- NuxtUI: A UI library for Nuxt applications
- TypeScript: Adds static typing to enhance code quality and developer experience
- Pinia: State management for Vue applications

### Project Structure

The project follows the Nx monorepo structure for better scalability and maintainability. This approach offers:

1. Consistent development experience across the project
2. Automated dependency management
3. TypeScript support with auto-generated configuration files

### Authentication Flow

1. Login Page: Users click the "Login" button to generate a secret phrase, which is securely stored in a cookie.
2. Home Page: Users can access the "Go to special page" button.
3. Special Page: The application checks the secret phrase in the cookie before granting access.

### Data Storage

To simulate file operations without server-side code, the project uses two cookies:

1. User session cookie
2. Encrypted secret phrase cookie

## Alternatives

1. Using sesson with `@sidebase/nuxt-session` to store the secret phrase.
2. Caching "screatphrase.txt" file in the server-side.
3. Using [localStorage](https://nuxt.com/modules/storage) would be possible but the library is not compatible with Nuxt3 yet.

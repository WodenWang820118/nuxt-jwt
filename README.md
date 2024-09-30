# Eaglys

# Requirements

1. Simulating "screatphrase.txt" file generation and use it to unlock certain features.
2. Simulating file saving and loading for the "screatphrase.txt" file.
3. Simlating the authentication process for the "screatphrase.txt" file.

# Installation

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

## Architecture

The Nx monorepo is used to manage the project for the following reasons:

1. A powerful tool for managing multiple projects in a single repository. It's for flexibility and scalability.
2. A consistent development experience for all developers. It's for maintainability and productivity.
3. Automated dependency management when updating or adding new dependencies. It's for reliability and security.

## Workflow

Since the project requires avoiding using server-side code, the project is built with two cookies. One for the user's cookie and the other for the secret phrase. The secret phrase is encrypted and stored in the cookie. The user's session is stored in the cookie as well.

1. Once entered the Login page, clicking the "Login" button will generate a secret phrase and store it in the cookie. Then, users will be redirected to the Home page.
2. On the Home page, users will see another button called "Go to special page". Clicking this button will redirect users to the Special page while checking the secret phrase in the cookie. If the secret phrase is correct, users will be able to see the content of the Special page. Otherwise, users will be redirected to the Login page.

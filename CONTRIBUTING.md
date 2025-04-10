# Contributing to the EdTech Platform

Thank you for your interest in contributing to our EdTech platform! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 22 or higher
- PostgreSQL
- Git

### Setting Up for Development

1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/edtech-platform.git
   ```
3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/uchkunrakhimow/edtech-platform.git
   ```
4. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```
5. Create a `.env` file based on `.env.example` and configure it for your local environment
6. Set up the database:
   ```bash
   npm run prisma:generate
   npm run prisma:migration
   npm run prisma:seed
   ```

## Development Workflow

1. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   or

   ```bash
   git checkout -b fix/your-bug-fix
   ```

2. Make your changes following the coding standards

3. Run tests to ensure your changes don't break existing functionality:

   ```bash
   npm run test
   ```

4. Commit your changes using conventional commit messages:

   ```bash
   git commit -m "feat: add new user dashboard"
   ```

   or

   ```bash
   git commit -m "fix: resolve user authentication issue"
   ```

5. Push your branch to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a pull request against the main repository

## Pull Request Process

1. Update the README.md or documentation with details of changes if necessary
2. Make sure your code follows the existing style guidelines
3. The PR should work in all modern browsers and platforms
4. A maintainer will review your PR and may request changes

## Coding Standards

### General Guidelines

- Follow TypeScript best practices
- Use meaningful variable and function names
- Write self-documenting code
- Add comments for complex logic

### Backend

- Follow the module architecture pattern
- Use Zod for input validation
- Handle errors appropriately
- Document all API endpoints with OpenAPI/Swagger

### Frontend

- Follow the component structure
- Use React hooks properly
- Implement responsive designs
- Use TypeScript interfaces for props and state

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or correcting tests
- `chore:` - Changes to the build process or auxiliary tools

## License

By contributing, you agree that your contributions will be licensed under the project's license.

## Questions?

If you have any questions about contributing, please open an issue or contact the project maintainers.

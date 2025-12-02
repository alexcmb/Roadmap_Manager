# Contributing to Roadmap Manager

Thank you for considering contributing to Roadmap Manager! We appreciate your time and effort.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected
- Include screenshots if applicable
- Include your environment details (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- List any alternative solutions you've considered

### Pull Requests

1. Fork the repository and create your branch from `main`
2. Make your changes following our coding standards
3. Test your changes thoroughly
4. Update documentation as needed
5. Ensure all tests pass
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Roadmap_Manager.git
cd Roadmap_Manager

# Install dependencies
npm install

# Run tests
npm test

# Start local server
npm run serve
```

## Coding Standards

### JavaScript

- Use ES6+ features
- Follow the ESLint configuration
- Use meaningful variable and function names
- Comment complex logic
- Keep functions small and focused

### HTML/CSS

- Follow semantic HTML practices
- Use Tailwind CSS classes consistently
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test across different browsers

### Commits

- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issues and pull requests when applicable
- Keep commits focused on a single concern

Example:

```
Add multilingual support for Spanish

- Add Spanish translations to i18n dictionary
- Update language selector with ES option
- Update documentation

Fixes #123
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test manually in different browsers
- Test keyboard navigation and accessibility

Run tests with:

```bash
npm test                # Run all tests
npm run test:ui         # Run tests with UI
npm run test:headed     # Run tests in headed mode
```

## Code Review Process

1. Maintainers review all pull requests
2. At least one approval is required
3. All CI checks must pass
4. Changes may be requested for:
    - Code quality improvements
    - Additional tests
    - Documentation updates
    - Security concerns

## Release Process

Releases are managed by maintainers and follow semantic versioning:

- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features, backwards compatible
- **Patch** (0.0.x): Bug fixes, backwards compatible

## Getting Help

- Check the [README](README.md) for basic information
- Search existing issues and discussions
- Create a new issue with your question
- Tag your issue appropriately

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes for significant contributions
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

Thank you for contributing to Roadmap Manager! 🎉

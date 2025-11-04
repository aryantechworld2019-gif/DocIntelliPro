# Contributing to DocIntelliPro

Thank you for considering contributing to DocIntelliPro! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Maintain professional communication

## How to Contribute

### Reporting Bugs

1. Check if the bug is already reported in [Issues](https://github.com/yourusername/DocIntelliPro/issues)
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Search existing feature requests
2. Open a new issue with:
   - Feature description
   - Use case
   - Proposed implementation (optional)
   - Benefits to users

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Write/update tests
5. Update documentation
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/DocIntelliPro.git
cd DocIntelliPro

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your Gemini API key

# Start development
npm run dev
```

### Coding Standards

- Use TypeScript for type safety
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Write self-documenting code

### Commit Messages

Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

Examples:
- `feat(gemini): add deep analysis mode`
- `fix(dashboard): correct stats calculation`
- `docs(readme): update installation steps`

### Testing

```bash
# Run tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check
```

## Project Structure

```
DocIntelliPro/
├── electron/          # Electron main process
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── services/      # Business logic
│   ├── db/            # Database schema
│   ├── store/         # State management
│   └── types/         # TypeScript types
├── public/            # Static assets
└── docs/              # Documentation
```

## Questions?

Feel free to ask questions by:
- Opening an issue
- Joining our Discord
- Emailing the maintainers

Thank you for contributing! 🎉

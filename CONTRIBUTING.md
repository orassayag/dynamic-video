# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/dynamic-video/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Error messages or screenshots (if applicable)
   - Your environment details (OS, Node version, browser)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript (ES6+)** with modern syntax
- **ESLint** for code quality
- **Express** best practices for the server
- **React** best practices for the client

Before submitting:
```bash
# Server
cd server
npm install
npm run dev-test

# Client
cd client
npm install
npm run lint
npm run build
```

### Coding Standards

1. **Server-side (Express)**
   - Use static classes for controllers and models
   - Include JSDoc comments for all public methods
   - Use custom error handling with proper status codes
   - Follow RESTful API conventions
   - Use Joi for request validation

2. **Client-side (React/Next.js)**
   - Use functional components with hooks
   - Follow Material-UI theming patterns
   - Keep components modular and reusable
   - Use proper PropTypes validation
   - Maintain consistent styling with SCSS modules

3. **General**
   - Write clear, descriptive variable and function names
   - Keep functions focused and single-purpose
   - Handle errors gracefully with appropriate messaging
   - Use environment variables for configuration
   - Never commit sensitive data (API keys, credentials)

### Project Structure

When adding new features:

**Server (`/server/src/`):**
- Controllers in `controllers/`
- Models in `models/`
- Routes in `routes/`
- Validations in `validations/`
- Middleware in `middlewares/`
- Utilities in `utils/`

**Client (`/client/src/`):**
- Components in `components/common/` or `components/pages/`
- Pages in `pages/`
- Utilities in `utils/`
- Configuration in `config/`

### Testing

- Test server endpoints using the Swagger UI at `http://localhost:8080/api-docs`
- Test client functionality by running the development server
- Verify both server and client work together correctly
- Test error handling scenarios

### Security Considerations

- Never hardcode API keys or credentials
- Always validate and sanitize user input
- Use CORS properly to restrict origins in production
- Follow OWASP security guidelines
- Report security vulnerabilities privately to the maintainer

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏

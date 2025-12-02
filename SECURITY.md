# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 2.2.x   | :white_check_mark: |
| < 2.2   | :x:                |

## Reporting a Vulnerability

We take the security of Roadmap Manager seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Publicly Disclose

Please do not create a public GitHub issue for security vulnerabilities.

### 2. Report Privately

Report security vulnerabilities through one of these methods:

- **GitHub Security Advisories**: Use the [Security Advisory](https://github.com/alexcmb/Roadmap_Manager/security/advisories/new) feature (preferred)
- **Email**: Contact the maintainers directly through GitHub

### 3. Include Details

When reporting, please include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information (if you want to be credited)

## Security Measures

### Current Security Features

1. **Client-Side Only**: No server-side components reduces attack surface
2. **LocalStorage**: Data stored locally in user's browser
3. **No External API Calls**: Except for CDN resources (Tailwind, Font Awesome, Confetti)
4. **Content Security**: No user-generated content sent to external servers
5. **XSS Prevention**: Proper content escaping and sanitization

### Automated Security

- **CodeQL Analysis**: Runs on every push and pull request
- **Dependency Scanning**: Regular Trivy scans for vulnerabilities
- **Scheduled Scans**: Weekly automated security scans

## Security Best Practices for Users

### When Using Roadmap Manager

1. **Use HTTPS**: If hosting, always serve over HTTPS
2. **Browser Updates**: Keep your browser up to date
3. **Data Backup**: Export your data regularly (when feature is available)
4. **Clear Data**: Use browser tools to clear localStorage if needed

### When Hosting

1. **Set Security Headers**: Configure proper HTTP security headers

    ```
    Content-Security-Policy: default-src 'self' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com
    X-Content-Type-Options: nosniff
    X-Frame-Options: DENY
    X-XSS-Protection: 1; mode=block
    Referrer-Policy: strict-origin-when-cross-origin
    ```

2. **Enable HTTPS**: Use TLS/SSL certificates
3. **Regular Updates**: Keep your hosting environment updated
4. **Access Control**: If needed, implement proper authentication

## Known Limitations

### LocalStorage

- Data stored in localStorage is not encrypted
- Users sharing the same browser profile can access the data
- LocalStorage is limited to ~5-10MB depending on browser
- Data can be cleared by user or browser

### CDN Dependencies

The application loads resources from these CDNs:

- Tailwind CSS (`cdn.tailwindcss.com`)
- Font Awesome (`cdnjs.cloudflare.com`)
- Canvas Confetti (`cdn.jsdelivr.net`)

**Mitigation**: Consider self-hosting these dependencies for production use.

## Disclosure Timeline

When a vulnerability is reported:

1. **Acknowledgment**: Within 48 hours
2. **Initial Assessment**: Within 1 week
3. **Fix Development**: Depends on severity (1-30 days)
4. **Release**: Security patches released ASAP
5. **Public Disclosure**: After fix is released and users have time to update (typically 1-2 weeks)

## Security Updates

Security updates are released as:

- **Critical**: Immediate patch release
- **High**: Within 7 days
- **Medium**: Next minor release
- **Low**: Next regular release

## Contact

For security concerns, please use GitHub's security features or contact the maintainers directly.

## Hall of Fame

We acknowledge security researchers who help us keep Roadmap Manager secure:

<!-- Contributors who report valid security issues will be listed here -->

Thank you for helping keep Roadmap Manager and our users safe! 🛡️

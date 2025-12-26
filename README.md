# Roadmap Manager

[![CI](https://github.com/alexcmb/Roadmap_Manager/actions/workflows/ci.yml/badge.svg)](https://github.com/alexcmb/Roadmap_Manager/actions/workflows/ci.yml)
[![CodeQL](https://github.com/alexcmb/Roadmap_Manager/actions/workflows/codeql.yml/badge.svg)](https://github.com/alexcmb/Roadmap_Manager/actions/workflows/codeql.yml)
[![Deploy](https://github.com/alexcmb/Roadmap_Manager/actions/workflows/deploy.yml/badge.svg)](https://github.com/alexcmb/Roadmap_Manager/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple, elegant, and multilingual roadmap manager built with vanilla HTML, CSS, and JavaScript. Perfect for managing project phases, tracking tasks, and visualizing progress.

## Features

- **Multilingual Support**: French, English, and Spanish
- **Visual Progress Tracking**: Real-time progress bars and percentage indicators
- **Customizable Themes**: 5 color themes for different phases
- **Task Management**: Create, edit, and track tasks within phases
- **Date Tracking**: Set target dates with countdown indicators
- **Auto-save**: Automatically saves your work to localStorage
- **Export/Import**: Backup and restore your roadmap data as JSON
- **Celebration Effects**: Confetti animation on 100% completion
- **Responsive Design**: Works on desktop and mobile devices
- **No Dependencies**: Pure vanilla JavaScript, no frameworks required

## Quick Start

### Option 1: Direct Usage

Simply open `index.html` in your web browser. That's it!

### Option 2: Local Development Server

```bash
# Clone the repository
git clone https://github.com/alexcmb/Roadmap_Manager.git
cd Roadmap_Manager

# Install dependencies
npm install

# Start the development server
npm run serve
```

The application will be available at `http://localhost:8080`

## Installation

### For Developers

```bash
# Install dependencies
npm install

# Run linters
npm run lint

# Run tests
npm test

# Build for production
npm run build
```

### For End Users

1. Download the latest release from the [Releases page](https://github.com/alexcmb/Roadmap_Manager/releases)
2. Extract the ZIP file
3. Open `index.html` in your web browser
4. Start planning your roadmap!

## Usage

### Creating a Phase

1. Click the "Add a new Phase" button at the bottom
2. Edit the phase title by clicking on it
3. Choose a color theme using the color dots
4. Set a target date
5. Select a status from the dropdown

### Managing Tasks

1. Click the checkbox to mark tasks as complete
2. Click on task text to edit it
3. Click the "+" button to add new tasks
4. Hover over a task and click the "×" to delete it

### Language Selection

Use the language selector in the header to switch between:

- 🇫🇷 French
- 🇬🇧 English
- 🇪🇸 Spanish

### Data Management

- **Auto-save**: Your data is automatically saved to browser localStorage
- **Export**: Click "Export" in the footer to download your roadmap as a JSON file
- **Import**: Click "Import" in the footer to restore your roadmap from a JSON backup file
- **Reset**: Click "Reset" in the footer to clear all data and start fresh

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Tailwind CSS via CDN
- **JavaScript**: Vanilla ES6+
- **Icons**: Font Awesome
- **Effects**: Canvas Confetti

## Testing

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug
```

## Security

- **CodeQL Analysis**: Automated security scanning
- **Dependency Scanning**: Regular vulnerability checks with Trivy
- **No External Data**: All data stored locally in browser
- **No Backend**: Pure client-side application

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- Tailwind CSS for the beautiful utility-first CSS framework
- Font Awesome for the comprehensive icon library
- Canvas Confetti for the celebration effects
- The open-source community for inspiration and support

## Contact

- **Issues**: [GitHub Issues](https://github.com/alexcmb/Roadmap_Manager/issues)
- **Discussions**: [GitHub Discussions](https://github.com/alexcmb/Roadmap_Manager/discussions)

## Roadmap

- [x] Export/Import functionality (JSON) ✅
- [ ] Print-friendly view
- [ ] Dark mode
- [ ] More languages
- [ ] Gantt chart view
- [ ] Team collaboration features
- [ ] Mobile app (PWA)

---

Made with ❤️ by the Roadmap Manager team

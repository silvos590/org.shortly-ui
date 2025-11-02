# Shortly UI

A modern URL shortener web application built with React and Vite.

## Features

- Shorten long URLs into manageable short codes
- Look up original URLs using short codes
- Copy shortened URLs to clipboard
- Modern, responsive UI design
- Real-time validation and error handling

## Tech Stack

- React 18
- Vite
- Axios for API calls
- TailwindCSS for styling

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/org.shortly-ui.git
cd org.shortly-ui
```

2. Install dependencies
```bash
npm install
```

3. Configure the API endpoint
Create a .env file in the root directory:
```bash
VITE_API_URL=http://localhost:8080
```
or set baseURL in client.js

4. Start the development server
```bash
npm run dev
```

The application will be available at http://localhost:5173

## API Integration
The application expects a backend service with the following endpoints:

- `POST /shorten` - Create a new short URL
- `GET /{shortCode}` - Retrieve original URL by short code

You can find backend code [here](https://github.com/silvos590/org.shortly-api).

## Development
* npm run dev - Start development server
* npm run build - Build for production
* npm run preview - Preview production build locally

## Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

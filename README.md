# 🎬 MovieLand

A responsive React application for searching movies, series, and episodes using the [OMDb API](https://www.omdbapi.com/). Discover films, view detailed information, and manage a personal favorites list — all in one place.

🔗 **Live Demo:** [https://Priyanshu147.github.io/movie](https://Priyanshu147.github.io/movie)

---

## ✨ Features

- **Movie Search** — Search for any movie, TV series, or episode by title using the OMDb API
- **Type Filtering** — Filter results by type: All, Movie, Series, or Episode
- **Detailed View** — Click any card to open a modal with full details: plot, rating, genres, director, cast, language, country, and more
- **Favorites** — Add or remove titles from a personal favorites list with one click
- **Persistent Favorites** — Favorites are saved to `localStorage` and persist across browser sessions
- **Toast Notifications** — Instant feedback when adding or removing a favorite
- **Skeleton Loading** — Animated skeleton cards shown while fetching results
- **Scroll to Top** — Floating button appears when scrolling down to jump back to the top
- **Animated Starfield Background** — Multi-layer CSS star animation for a cinematic feel
- **Keyboard Accessible** — Search on Enter key; modal closes with Escape key; cards navigable via keyboard

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://reactjs.org/) | UI library |
| [Create React App](https://create-react-app.dev/) | Project scaffolding & build tooling |
| [OMDb API](https://www.omdbapi.com/) | Movie data source |
| [gh-pages](https://github.com/tschaub/gh-pages) | GitHub Pages deployment |
| CSS3 | Styling, animations, responsive layout |

---

## 📁 Project Structure

```
movie/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
└── src/
    ├── App.js           # Root component — state management, search logic, layout
    ├── App.css          # Global styles and animations
    ├── MovieCard.jsx    # Movie card with poster, title, type, year, and favorite button
    ├── MovieModal.jsx   # Full-details modal (rating, plot, cast, director, etc.)
    ├── Loader.jsx       # Skeleton loading animation (8 placeholder cards)
    ├── Toast.jsx        # Toast notification for favorites add/remove
    ├── search.svg       # Search icon asset
    └── index.js         # React entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Priyanshu147/movie.git
   cd movie
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser. The app will reload automatically on file changes.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm start` | Runs the app in development mode at `http://localhost:3000` |
| `npm test` | Launches the test runner in interactive watch mode |
| `npm run build` | Builds the app for production into the `build/` folder |
| `npm run deploy` | Builds the app and deploys it to GitHub Pages |
| `npm run eject` | Ejects from Create React App (irreversible) |

---

## 🌐 Deployment

This project is configured for deployment to **GitHub Pages**.

```bash
npm run deploy
```

This runs `npm run build` first (via the `predeploy` script) and then publishes the `build/` folder to the `gh-pages` branch of the repository.

Live URL: [https://Priyanshu147.github.io/movie](https://Priyanshu147.github.io/movie)

---

## 🎥 API

Movie data is sourced from the **[OMDb API](https://www.omdbapi.com/)**.

- **Search endpoint:** `https://www.omdbapi.com/?s={title}&type={type}&apikey={key}`
- **Details endpoint:** `https://www.omdbapi.com/?i={imdbID}&plot=full&apikey={key}`

The API returns data for movies, series, and episodes including title, year, poster, IMDb rating, genre, plot, cast, director, language, and country.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

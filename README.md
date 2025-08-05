# Pinpoint - Curated Restaurant Discovery Platform

A modern web application that helps users discover carefully curated restaurants and cafes, bypassing conventional user rating systems in favor of expert recommendations.

## 🚀 Features

### Core Functionality
- **Interactive Map**: Explore curated places with real-time filtering
- **Expert Curation**: All destinations handpicked by food writers and local editors
- **Favorites System**: Save and manage your favorite places with localStorage persistence
- **Dark Mode**: Complete theme system with system/light/dark options
- **Location Services**: Current location detection with permission management

### Interactive Elements
- **Real-time Search**: Search places with autocomplete suggestions
- **Map Filtering**: Toggle between restaurants and cafes
- **Share Functionality**: Copy addresses or search in Google Maps
- **Advanced Favorites**: Multi-tag filtering and time-based ordering

## 🛠️ Technical Stack

- **React 18** with Vite for fast development
- **Material-UI** for consistent, accessible design
- **React Router** for seamless navigation
- **React Leaflet** for interactive mapping
- **Context API** for global state management
- **localStorage** for data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── maps/           # Map-related components
│   │   ├── Maps.jsx
│   │   ├── SearchBar.jsx
│   │   ├── MapFilter.jsx
│   │   ├── CustomMarker.jsx
│   │   ├── PlacePopup.jsx
│   │   ├── CurrentLocationButton.jsx
│   │   └── SearchSuggestions.jsx
│   ├── pages/          # Main page components
│   │   ├── MainPage.jsx
│   │   ├── Favorites.jsx
│   │   ├── Settings.jsx
│   │   └── About.jsx
│   ├── Header.jsx      # Navigation component
│   ├── ShareButton.jsx # Share functionality
│   └── ThemeToggle.jsx # Theme controls
├── context/
│   └── ThemeContext.jsx # Global theme management
├── data/
│   └── curatedPlaces.js # Curated place data
└── App.jsx             # Main application component
```

## 🎨 Design Principles

- **Glassmorphism**: Modern translucent UI elements
- **Responsive Design**: Works seamlessly across devices
- **Accessibility**: WCAG AA compliant with proper contrast and keyboard navigation
- **Progressive Enhancement**: Core functionality without JavaScript

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd p48
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/p48`

## 📱 Pages

- **Home**: Landing page with app introduction
- **Maps**: Interactive map with search and filtering
- **Favorites**: Saved places with advanced filtering
- **Settings**: Theme preferences and app settings
- **About**: Information about Pinpoint's mission

## 🔧 Key Components

### 15+ Meaningfully Used Components
- Navigation and routing components
- Interactive map elements
- Data management and persistence
- Theme and accessibility features
- User interaction elements

### Notable Technical Implementations
- **localStorage Integration**: Persistent favorites with timestamps
- **React Context**: Global theme state management
- **Material-UI**: Consistent, accessible design system
- **React Router**: Seamless single-page navigation
- **Real-time Filtering**: Dynamic map marker updates

## 🎯 Accessibility Features

- ✅ No skipped heading levels
- ✅ Appropriate alt text on all images
- ✅ Sufficient color contrast (WCAG AA standards)
- ✅ All inputs appropriately labeled
- ✅ All forms completable via keyboard
- ✅ Proper ARIA labels and roles

## 📄 License

This project is part of CS571 coursework at UW-Madison.

---

**Built with ❤️ using React, Material-UI, and modern web technologies**
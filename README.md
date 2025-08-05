# Pinpoint - Curated Restaurant & Cafe Discovery

Pinpoint is a web application that helps users discover curated restaurants and cafes through an interactive map interface. Unlike traditional map applications that rely on user ratings, Pinpoint features carefully selected destinations chosen by food experts and local editors.

## Features

### Current Implementation
- **Interactive Map**: Built with React Leaflet for smooth map navigation
- **Curated Places**: 8 mockup restaurants and cafes around Madison, WI with custom markers
- **Custom Popups**: Rich popup cards showing:
  - Place name and description
  - High-quality photos
  - Type tags (Restaurant/Cafe)
  - Feature tags (e.g., "Fine Dining", "Coffee", "Study Spot")
- **Heart Functionality**: 
  - Click the heart button to favorite/unfavorite places
  - Favorites are saved to localStorage
  - Visual feedback with filled/outlined heart icons
- **Search Functionality**: Real-time search with OpenStreetMap integration
- **Responsive Design**: Works on desktop and mobile devices

### Technical Stack
- **Frontend**: React 18 with Vite
- **UI Framework**: Material-UI (MUI)
- **Mapping**: React Leaflet with OpenStreetMap tiles
- **Icons**: Material-UI Icons
- **Styling**: CSS with Material-UI's sx prop

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the displayed URL

## Project Structure

```
src/
├── components/
│   ├── maps/
│   │   ├── Maps.jsx          # Main map component
│   │   ├── SearchBar.jsx      # Search input component
│   │   ├── SearchSuggestions.jsx # Search results dropdown
│   │   ├── CustomMarker.jsx   # Custom map markers
│   │   └── PlacePopup.jsx     # Rich popup cards
│   └── ...
├── data/
│   └── curatedPlaces.js       # Mockup place data
└── ...
```

## Mockup Data

The application includes 8 curated places around Madison, WI:
- **Restaurants**: L'etoile, Graze, Tornado Room Steak House, Cento
- **Cafes**: Barriques Coffee, Colectivo Coffee, Indie Coffee, Steep & Brew

Each place includes coordinates, photos, descriptions, and relevant tags.

## Future Enhancements

- User authentication and personalized recommendations
- Advanced filtering by cuisine type, price range, etc.
- Integration with real restaurant APIs
- Social features and user reviews
- Mobile app development

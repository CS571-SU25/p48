import React, { useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import SearchSuggestions from './SearchSuggestions';
import CustomMarker from './CustomMarker';
import CurrentLocationButton from './CurrentLocationButton';
import MapFilter from './MapFilter';
import { curatedPlaces } from '../../data/curatedPlaces';
import { useTheme } from '../../context/ThemeContext';

function ChangeView({ center, zoom, shouldUpdate }) {
  const map = useMap();
  
  React.useEffect(() => {
    if (shouldUpdate) {
      map.setView(center, zoom);
    }
  }, [center, zoom, shouldUpdate, map]);
  
  return null;
}

function Maps() {
  const { themeMode } = useTheme();
  const [position, setPosition] = useState([43.075, -89.385]);
  const [markerInfo, setMarkerInfo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [shouldUpdateMap, setShouldUpdateMap] = useState(true);
  const debounceTimeout = useRef(null);

  const fetchSuggestions = useCallback((query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`)
      .then(response => response.json())
      .then(data => setSuggestions(data || []))
      .catch(error => console.error("Error fetching suggestions:", error));
  }, []);

  const handleInputChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(newSearchTerm);
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    const { lat, lon, display_name } = suggestion;
    const newPosition = [parseFloat(lat), parseFloat(lon)];

    setPosition(newPosition);
    setMarkerInfo({ position: newPosition, name: display_name });
    setSearchTerm(display_name);
    setSuggestions([]);
    setShouldUpdateMap(true);
  };

  const handleFormSubmit = () => {
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  const handleLocationFound = (coordinates) => {
    setPosition(coordinates);
    setMarkerInfo({ position: coordinates, name: 'Your Location' });
    setShouldUpdateMap(true);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
    setShouldUpdateMap(false); // Don't update map position when filters change
  };

  // Filter places based on selected filters
  const filteredPlaces = selectedFilters.length === 0 
    ? curatedPlaces 
    : curatedPlaces.filter(place => selectedFilters.includes(place.type));

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Box sx={{ position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)', width: { xs: 'calc(100% - 32px)', md: '95%' }, maxWidth: 1200, zIndex: 1000, pointerEvents: 'none' }}>
        <Box sx={{ pointerEvents: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchBar
              value={searchTerm}
              onInputChange={handleInputChange}
              onFormSubmit={handleFormSubmit}
            />
            <MapFilter
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </Box>
          <SearchSuggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </Box>
      </Box>

      <MapContainer center={position} zoom={16} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <ChangeView center={position} zoom={16} shouldUpdate={shouldUpdateMap} />
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
          url={
            themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        
        {/* Curated places markers */}
        {filteredPlaces.map((place) => (
          <CustomMarker 
            key={place.id} 
            place={place} 
          />
        ))}
        
        {/* Search result marker */}
        {markerInfo && (
          <Marker position={markerInfo.position}>
            <Popup>{markerInfo.name}</Popup>
          </Marker>
        )}
      </MapContainer>

      <CurrentLocationButton onLocationFound={handleLocationFound} />
    </Box>
  );
}

export default React.memo(Maps);
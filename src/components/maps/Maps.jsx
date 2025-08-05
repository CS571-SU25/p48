import React, { useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import SearchSuggestions from './SearchSuggestions';
import CustomMarker from './CustomMarker';
import { curatedPlaces } from '../../data/curatedPlaces';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Maps() {
  const [position, setPosition] = useState([43.075, -89.385]);
  const [markerInfo, setMarkerInfo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
  };

  const handleFormSubmit = () => {
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Box sx={{ position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)', width: { xs: 'calc(100% - 32px)', md: '95%' }, maxWidth: 1200, zIndex: 1000, pointerEvents: 'none' }}>
        <Box sx={{ pointerEvents: 'auto' }}>
          <SearchBar
            value={searchTerm}
            onInputChange={handleInputChange}
            onFormSubmit={handleFormSubmit}
          />
          <SearchSuggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </Box>
      </Box>

      <MapContainer center={position} zoom={16} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <ChangeView center={position} zoom={16} />
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Curated places markers */}
        {curatedPlaces.map((place) => (
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
    </Box>
  );
}

export default React.memo(Maps);
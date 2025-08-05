import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';
import FlatwareIcon from '@mui/icons-material/Flatware';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import PlacePopup from './PlacePopup';

const createCustomIcon = (type) => {
  const iconElement = document.createElement('div');

  const root = createRoot(iconElement);
  if (type === 'Restaurant') {
    root.render(
      <FlatwareIcon sx={{ fontSize: 36, color: '#1976d2' }} />
    );
  } else {
    root.render(
      <LocalCafeIcon sx={{ fontSize: 36, color: '#4caf50' }} />
    );
  }

  return L.divIcon({
    html: iconElement,
    className: 'custom-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

const CustomMarker = ({ place }) => {
  const icon = createCustomIcon(place.type);

  return (
    <Marker
      position={place.coordinates}
      icon={icon}
    >
      <Popup>
        <PlacePopup place={place} />
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
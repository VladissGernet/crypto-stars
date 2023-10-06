const createMarker = (markerCoords, icon, layer) => {
  const {lat, lng} = markerCoords;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: icon
    },
  );
  marker
    .addTo(layer);
};

export {createMarker};

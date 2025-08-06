import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { Map, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const MapBox = () => {
  // Baca parameter city dari URL
  const { search } = useLocation();
  const city = new URLSearchParams(search).get("city");
  console.log("City from URL:", city);

  // Mapbox token
  const TOKEN =
    "pk.eyJ1Ijoibm9sYW5ncmFwaHkiLCJhIjoiY21jYTdpbjNvMDBobDJtb2dwdWpveGE4YSJ9.bIOmIILeMml2GL-Qirzb-Q";
  mapboxgl.accessToken = TOKEN;

  // View state untuk Map
  const [viewState, setViewState] = useState({
    longitude: 110.49273,
    latitude: -7.33194,
    zoom: 6,
  });
  const [geojson, setGeojson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi fetch data dari backend
  const getRawData = async (city) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/prediction/request/${city}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching current data:", error);
      return null;
    }
  };

  // useEffect untuk fetch dan generate GeoJSON
  useEffect(() => {
    if (!city) return;
    setIsLoading(true);

    getRawData(city)
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          // Buat FeatureCollection
          const heatmapData = {
            type: "FeatureCollection",
            features: data.map((item) => ({
              type: "Feature",
              geometry: item.geometry,
              properties: {
                city: item.city,
                aqi: item.healthStatus.AQI,
                status: item.healthStatus.status,
                // Skala intensity berdasarkan range AQI 1-5
                intensity: item.healthStatus.AQI / 5,
                ...item.healthStatus.property,
              },
            })),
          };
          console.log(
            "Heatmap intensities:",
            heatmapData.features.map((f) => f.properties.intensity)
          );

          setGeojson(heatmapData);

          // Center map pada koor pertama dengan zoom 10
          const [lng, lat] = heatmapData.features[0].geometry.coordinates;
          setViewState((v) => ({
            ...v,
            longitude: lng,
            latitude: lat,
            zoom: 10,
          }));
        } else {
          console.warn("No valid data:", data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [city]);

  // Konfigurasi layer heatmap
  const heatmapLayer = {
    id: "heatmap",
    type: "heatmap",
    source: "air-quality",
    maxzoom: 15,
    paint: {
      "heatmap-weight": ["get", "intensity"],
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 5],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(0,255,0,0)",
        0.2,
        "rgba(0,255,0,0.5)",
        0.4,
        "rgba(255,255,0,0.7)",
        0.6,
        "rgba(255,165,0,0.8)",
        0.8,
        "rgba(255,0,0,0.9)",
        1,
        "rgba(139,0,0,1)",
      ],
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 60],
      "heatmap-opacity": 0.9,
    },
  };

  // Konfigurasi layer circle
  const circleLayer = {
    id: "circles",
    type: "circle",
    source: "air-quality",
    minzoom: 12,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "aqi"],
        1,
        5,
        5,
        15,
        5,
        25,
      ],
      "circle-color": [
        "case",
        ["<", ["get", "aqi"], 2],
        "#00e400",
        ["<", ["get", "aqi"], 3],
        "#ffff00",
        ["<", ["get", "aqi"], 4],
        "#ff7e00",
        ["<", ["get", "aqi"], 5],
        "#ff0000",
        "#8f3f97",
      ],
      "circle-opacity": 0.8,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  };

  // Tampilkan loading spinner saat fetch
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden relative">
      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        attributionControl={false}
        reuseMaps={true}>
        {geojson && (
          <Source id="air-quality" type="geojson" data={geojson}>
            <Layer {...heatmapLayer} />
            <Layer {...circleLayer} />
          </Source>
        )}
      </Map>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs z-10">
        <div>
          <strong>Air Quality Index</strong>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>1 Good
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>2
          Moderate
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-orange-400 rounded-full mr-1"></span>3
          Unhealthy Sensitive
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>4
          Unhealthy
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-purple-600 rounded-full mr-1"></span>5
          Very Unhealthy
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 z-10">
        <button
          onClick={() =>
            setViewState((v) => ({ ...v, zoom: Math.min(v.zoom + 1, 20) }))
          }
          className="block mb-1 px-2 py-1 bg-blue-500 text-white rounded text-sm">
          Zoom In
        </button>
        <button
          onClick={() =>
            setViewState((v) => ({ ...v, zoom: Math.max(v.zoom - 1, 0) }))
          }
          className="block px-2 py-1 bg-blue-500 text-white rounded text-sm">
          Zoom Out
        </button>
      </div>
    </div>
  );
};

export default MapBox;

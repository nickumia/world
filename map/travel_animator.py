#!/usr/bin/env python3
"""
Travel Animation Generator

This script creates an animated video showing travel between cities on a map.
It takes a list of cities and generates a smooth animation of the travel route.

Requirements:
- folium (for map generation)
- geopy (for geocoding cities)
- matplotlib (for animation)
- imageio (for video creation)
- selenium (for map screenshots)
- pillow (for image processing)

Usage:
    python travel_animator.py --cities "Orlando,FL" "Tallahassee,FL" "Mobile,AL" --output travel_video.mp4
"""

import argparse
import json
import os
import time
from typing import List, Tuple, Dict, Any, Optional
import logging
from datetime import datetime, timedelta
from enum import Enum
import json
from typing import Optional, Dict, Tuple
from dataclasses import dataclass

# Default values for animation
DEFAULT_STEPS_PER_SEGMENT = 30  # Number of frames per travel segment
DEFAULT_FPS = 30  # Frames per second for output video
DESTINATION_PAUSE_FRAMES = 5  # Number of frames to pause at each destination
# Normal zoom level for maps
INITIAL_ZOOM_LEVEL = 8  # Initial zoom level for maps
DESTINATION_ZOOM_LEVEL = 8    # Close zoom level for destination exploration
# Wide zoom level for overview
# INITIAL_ZOOM_LEVEL = 5  # Initial zoom level for maps
# DESTINATION_ZOOM_LEVEL = 5    # Close zoom level for destination exploration


# Display configuration
MAP_WIDTH = 1920
MAP_HEIGHT = 1080
MAP_ZOOM_LEVEL = 5  # Zoom level to show all of North America
MAP_CENTER = (39.8283, -98.5795)  # Geographic center of the contiguous US

# Chrome driver configuration
CHROME_WINDOW_WIDTH = 1920
CHROME_WINDOW_HEIGHT = 1080
CHROME_OPTIONS = [
    "--headless",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    f"--window-size={MAP_WIDTH},{MAP_HEIGHT}",
    "--force-device-scale-factor=2"  # High DPI scaling
]

# Animation Configuration Constants

DEFAULT_STEPS_PER_SEGMENT = 10  # Default animation frames per travel segment
DEPARTURE_ZOOM_OUT_FRAMES = 8  # Number of frames for smooth zoom-out when leaving destination

try:
    import folium
    import geopy
    from geopy.geocoders import Nominatim
    import matplotlib.pyplot as plt
    import matplotlib.animation as animation
    import numpy as np
    import imageio
    from PIL import Image
    import requests
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
except ImportError as e:
    print(f"Missing required package: {e}")
    print("Please install required packages:")
    print("pip install folium geopy matplotlib imageio pillow requests selenium")
    exit(1)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class TravelMode(Enum):
    """Enumeration for different travel modes."""
    DRIVING = "driving"
    FLYING = "flying"
    WALKING = "walking"
    CYCLING = "cycling"
    TRAIN = "train"
    BOAT = "boat"

class TravelSegment:
    """Represents a travel segment between two cities."""
    def __init__(self, start_city: str, end_city: str, mode: TravelMode = TravelMode.DRIVING):
        self.start_city = start_city
        self.end_city = end_city
        self.mode = mode
        self.start_coords = None
        self.end_coords = None

@dataclass
class WeatherData:
    temperature: float  # in Celsius
    weather_code: int  # WMO weather code
    time: str  # ISO format time string

class TravelAnimator:
    def __init__(self, output_dir: str = "output"):
        """Initialize the Travel Animator."""
        self.output_dir = output_dir
        self.geolocator = Nominatim(user_agent="travel_animator")
        self.coordinates_cache = {}
        self.weather_cache = {}  # Cache for weather data
        self.use_gpu = True
        self.current_temp = None  # Track current temperature for animation

        # Create output directory
        os.makedirs(output_dir, exist_ok=True)

        # Setup Chrome driver options from global config
        self.chrome_options = Options()
        for option in CHROME_OPTIONS:
            self.chrome_options.add_argument(option)

        # Initialize driver (will be created when needed)
        self.driver = None

    def _ensure_driver(self):
        """Ensure Chrome driver is initialized."""
        if self.driver is None:
            from selenium import webdriver
            self.driver = webdriver.Chrome(options=self.chrome_options)
            self.driver.set_window_size(CHROME_WINDOW_WIDTH, CHROME_WINDOW_HEIGHT)

    def cleanup(self):
        """Clean up resources."""
        if self.driver:
            self.driver.quit()
            self.driver = None

    def geocode_city(self, city: str) -> Tuple[float, float]:
        """Get coordinates for a city using geocoding."""
        if city in self.coordinates_cache:
            return self.coordinates_cache[city]

        try:
            logger.info(f"Geocoding city: {city}")
            location = self.geolocator.geocode(city, timeout=10)
            if location:
                coords = (location.latitude, location.longitude)
                self.coordinates_cache[city] = coords
                logger.info(f"Found coordinates for {city}: {coords}")
                return coords
            else:
                logger.error(f"Could not find coordinates for {city}")
                return None
        except Exception as e:
            logger.error(f"Error geocoding {city}: {e}")
            return None

    def get_all_coordinates(self, cities: List[str]) -> List[Tuple[float, float, str]]:
        """Get coordinates for all cities."""
        coordinates = []
        for city in cities:
            coords = self.geocode_city(city)
            if coords:
                coordinates.append((coords[0], coords[1], city))
            else:
                logger.warning(f"Skipping {city} due to geocoding failure")
        return coordinates

    def get_travel_mode_style(self, mode: TravelMode) -> Dict[str, Any]:
        """Get visual styling for different travel modes."""
        styles = {
            TravelMode.DRIVING: {
                'color': 'blue',
                'weight': 3,
                'opacity': 0.8,
                'icon': 'car',
                'icon_color': 'blue',
                'dash_array': None
            },
            TravelMode.FLYING: {
                'color': 'red',
                'weight': 2,
                'opacity': 0.9,
                'icon': 'plane',
                'icon_color': 'red',
                'dash_array': '10,5'
            },
            TravelMode.WALKING: {
                'color': 'green',
                'weight': 2,
                'opacity': 0.7,
                'icon': 'user',
                'icon_color': 'green',
                'dash_array': '5,5'
            },
            TravelMode.CYCLING: {
                'color': 'orange',
                'weight': 2,
                'opacity': 0.7,
                'icon': 'bicycle',
                'icon_color': 'orange',
                'dash_array': '8,3'
            },
            TravelMode.TRAIN: {
                'color': 'purple',
                'weight': 4,
                'opacity': 0.8,
                'icon': 'train',
                'icon_color': 'purple',
                'dash_array': '15,5'
            },
            TravelMode.BOAT: {
                'color': 'darkblue',
                'weight': 3,
                'opacity': 0.8,
                'icon': 'ship',
                'icon_color': 'darkblue',
                'dash_array': '12,8'
            }
        }
        return styles.get(mode, styles[TravelMode.DRIVING])

    def create_dynamic_map(self, center_coords: Tuple[float, float], zoom_level: float = INITIAL_ZOOM_LEVEL,
                          coordinates: Optional[List[Tuple[float, float, str]]] = None,
                          reached_index: int = -1, timestamp_info: Optional[dict] = None) -> folium.Map:
        """Create a map centered on specific coordinates with custom zoom level."""
        m = folium.Map(
            location=[center_coords[0], center_coords[1]],
            zoom_start=zoom_level,
            tiles='OpenStreetMap'
        )

        # Add only markers for destinations reached so far
        if coordinates and reached_index >= 0:
            for i, (lat, lon, city) in enumerate(coordinates):
                if i <= reached_index:  # Only show markers for reached destinations
                    if i == 0:
                        color = 'red'  # Starting point
                        icon = 'play'
                    elif i == reached_index and i == len(coordinates) - 1:
                        color = 'blue'  # Final destination (reached)
                        icon = 'stop'
                    elif i == reached_index:
                        color = 'orange'  # Current destination
                        icon = 'star'
                    else:
                        color = 'green'  # Previously visited
                        icon = 'check'

                    folium.Marker(
                        [lat, lon],
                        popup=f"{city} (Stop {i+1})",
                        tooltip=city,
                        icon=folium.Icon(color=color, icon=icon)
                    ).add_to(m)

        # Add timestamp overlay if provided
        if timestamp_info:
            self._add_timestamp_overlay(m, timestamp_info)

        return m

    def _get_weather_data(self, lat: float, lon: float, date_str: str) -> Optional[WeatherData]:
        """Fetch weather data for a specific location and date."""
        cache_key = f"{lat}_{lon}_{date_str}"

        # Check cache first
        if cache_key in self.weather_cache:
            return self.weather_cache[cache_key]

        try:
            # Parse the date
            date_obj = datetime.strptime(date_str, '%m/%d/%Y')
            start_date = date_obj.strftime('%Y-%m-%d')
            end_date = (date_obj + timedelta(days=1)).strftime('%Y-%m-%d')

            # Use Open-Meteo API for historical weather data
            url = (
                f"https://archive-api.open-meteo.com/v1/archive?"
                f"latitude={lat}&longitude={lon}&"
                f"start_date={start_date}&end_date={end_date}&"
                "hourly=temperature_2m,weathercode&"
                "temperature_unit=celsius&timezone=auto"
            )

            response = requests.get(url, timeout=10)
            response.raise_for_status()
            data = response.json()

            # Get the temperature and weather code for the middle of the day (12 PM)
            if 'hourly' in data and 'temperature_2m' in data['hourly']:
                # Try to get data for 12 PM, fall back to first available
                time_index = min(12, len(data['hourly']['time']) - 1)  # 12 PM or last available

                weather_data = WeatherData(
                    temperature=float(data['hourly']['temperature_2m'][time_index]),
                    weather_code=int(data['hourly']['weathercode'][time_index]),
                    time=data['hourly']['time'][time_index]
                )

                # Cache the result
                self.weather_cache[cache_key] = weather_data
                return weather_data

        except Exception as e:
            logger.warning(f"Could not fetch weather data: {e}")

        return None

    def _celsius_to_fahrenheit(self, celsius: float) -> float:
        """Convert Celsius to Fahrenheit."""
        return (celsius * 9/5) + 32

    def _get_weather_icon(self, weather_code: int) -> str:
        """Get weather icon based on WMO weather code."""
        # Map WMO weather codes to emojis
        weather_icons = {
            0: '☀️',   # Clear sky
            1: '🌤️',   # Mainly clear
            2: '⛅',   # Partly cloudy
            3: '☁️',   # Overcast
            45: '🌫️',  # Fog
            48: '🌫️',  # Depositing rime fog
            51: '🌧️',  # Light drizzle
            53: '🌧️',  # Moderate drizzle
            55: '🌧️',  # Dense drizzle
            56: '🌧️',  # Light freezing drizzle
            57: '🌧️',  # Dense freezing drizzle
            61: '🌧️',  # Slight rain
            63: '🌧️',  # Moderate rain
            65: '🌧️',  # Heavy rain
            66: '🌨️',  # Light freezing rain
            67: '🌨️',  # Heavy freezing rain
            71: '❄️',  # Slight snow fall
            73: '❄️',  # Moderate snow fall
            75: '❄️',  # Heavy snow fall
            77: '❄️',  # Snow grains
            80: '🌧️',  # Slight rain showers
            81: '🌧️',  # Moderate rain showers
            82: '🌧️',  # Violent rain showers
            85: '🌨️',  # Slight snow showers
            86: '🌨️',  # Heavy snow showers
            95: '⛈️',  # Thunderstorm
            96: '⛈️',  # Thunderstorm with slight hail
            99: '⛈️',  # Thunderstorm with heavy hail
        }
        return weather_icons.get(weather_code, '🌡️')

    def _create_thermometer_html(self, temperature: float) -> str:
        """Create HTML/CSS for the thermometer visualization.

        Args:
            temperature: Current temperature to display
        """
        if temperature is None:
            return ""

        # Calculate temperature range (-20°C to 40°C)
        temp_min = -20
        temp_max = 40

        # Clamp temperature to range
        clamped_temp = max(temp_min, min(temp_max, temperature))

        # Calculate percentage (0-100%)
        percentage = ((clamped_temp - temp_min) / (temp_max - temp_min)) * 100

        # Determine color based on temperature
        if temperature < 0:
            color = '#6495ED'  # Cold blue
        elif temperature < 10:
            color = '#87CEEB'  # Sky blue
        elif temperature < 20:
            color = '#98FB98'  # Light green
        elif temperature < 30:
            color = '#FFD700'  # Gold
        else:
            color = '#FF6347'  # Tomato red

        return f"""
        <div style="
            position: relative;
            display: inline-block;
            width: 30px;
            height: 100px;
            background: #eee;
            border-radius: 15px;
            border: 2px solid #666;
            overflow: hidden;
            vertical-align: middle;
            margin-left: 10px;
        ">
            <div style="
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: {percentage}%;
                background: {color};
                transition: height 0.5s ease-in-out, background 0.5s ease-in-out;
            "></div>
            <div style="
                position: absolute;
                bottom: {percentage}%;
                left: 0;
                width: 100%;
                text-align: center;
                font-weight: bold;
                font-size: 12px;
                color: #333;
                text-shadow: 0 0 2px white;
            ">
                {int(round(temperature))}°
            </div>
        </div>
        """

    def _add_timestamp_overlay(self, map_obj: folium.Map, timestamp_info: dict):
        """Add timestamp overlay to the map with weather information.

        Args:
            map_obj: The folium map object
            timestamp_info: Dictionary containing timestamp information including:
                - date: Date string in MM/DD/YYYY format
                - location: Current location name
                - travel_mode: Current travel mode
                - coords: Tuple of (lat, lon) for weather lookup
                - current_temp: Current temperature (for animation)
                - target_temp: Target temperature (for animation)
        """
        # Format date as YYYY/MM/DD
        date_str = timestamp_info.get('date', '')
        if date_str:
            try:
                # Parse the date from MM/DD/YYYY format
                date_obj = datetime.strptime(date_str, '%m/%d/%Y')
                # Format as YYYY MMM DD (e.g., 2024 Jul 15)
                formatted_date = date_obj.strftime('%Y %b %d')
            except (ValueError, TypeError):
                # If parsing fails, use the original string
                formatted_date = date_str
        else:
            formatted_date = 'N/A'

        # Get location and travel mode, defaulting to empty strings
        location_str = timestamp_info.get('location', '')
        travel_mode = timestamp_info.get('travel_mode', '')

        # Track the last valid location
        if not hasattr(self, '_last_location'):
            self._last_location = location_str

        # Only update the last location if we're at a destination or have a valid location
        if timestamp_info.get('is_destination', False) or location_str:
            self._last_location = location_str

        # Use the last known location if current is empty
        display_location = self._last_location

        # Get weather data if coordinates are available
        current_temp = timestamp_info.get('current_temp')
        target_temp = timestamp_info.get('target_temp')

        # Create timestamp HTML with weather information
        timestamp_html = ""

        if 'coords' in timestamp_info and date_str:
            lat, lon = timestamp_info['coords']
            weather_data = self._get_weather_data(lat, lon, date_str)

            if weather_data:
                weather_icon = self._get_weather_icon(weather_data.weather_code)

                # Update current temperature if not set or if we're at a destination
                if current_temp is None or timestamp_info.get('is_destination', False):
                    current_temp = weather_data.temperature
                    self.current_temp = current_temp

                # Use the current temperature for display (which is already interpolated if needed)
                display_temp = current_temp

                # Create thermometer with the current temperature
                thermometer = self._create_thermometer_html(display_temp)

                # Add the main timestamp box with thermometer on the left
                timestamp_html += f"""
                <div style="
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    display: flex;
                    align-items: flex-end;
                    background-color: rgba(0, 0, 0, 0);
                    border: none;
                    z-index: 1000;
                ">
                    <!-- Thermometer on the left -->
                    <div style="
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        height: 100%;
                        margin-right: 10px;
                        padding: 0;
                        background-color: rgba(0, 0, 0, 0);
                        border: none;
                    ">
                        <div style="color: black; font-size: 12px; text-align: center; margin-top: 5px;">HOT</div>
                        {thermometer}
                        <div style="color: black; font-size: 12px; text-align: center; margin-top: 5px;">COLD</div>
                    </div>"""

            timestamp_html += f"""<!-- Timestamp box -->
                <div style="
                    background-color: rgba(0, 0, 0, 0.8);
                    color: #fff;
                    padding: 10px 15px;
                    border-radius: 5px;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    border-left: 4px solid #4CAF50;
                    max-width: 300px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                ">
                    <div style="color: #4CAF50; font-weight: bold; margin-bottom: 3px;"><b>DATE: {formatted_date}</b></div>
                    <div style="margin-bottom: 3px;"><b>LOC: {display_location}</b></div>
                    <div style="margin-bottom: 3px; font-size: 14px;">
                        <span style="color: white;">{int(round(display_temp))}°C</span>
                        <span style="color: #ccc; margin: 0 5px;">/</span>
                        <span style="color: #FFD700;">{int(round(self._celsius_to_fahrenheit(display_temp)))}°F</span>
                    </div>
                    <div style="color: #FFD700; font-size: 12px;">MODE: {travel_mode.upper()}</div>
                </div>
            </div>
            """

        # Add the timestamp overlay to the map
        map_obj.get_root().html.add_child(folium.Element(timestamp_html))

    def calculate_total_frames(self, coordinates: List[Tuple[float, float, str]],
                             steps_per_segment: int = DEFAULT_STEPS_PER_SEGMENT) -> int:
        """Calculate the total number of frames that will be generated for the animation."""
        if len(coordinates) < 2:
            return 1  # Just initial frame

        total_frames = 1  # Initial frame

        # Calculate frames for each segment
        num_segments = len(coordinates) - 1
        for i in range(num_segments):
            # Travel frames for this segment (excluding first point to avoid duplication)
            travel_frames = steps_per_segment  # path_points[1:] gives us steps_per_segment frames
            total_frames += travel_frames

            # Pause frames at destination
            total_frames += DESTINATION_PAUSE_FRAMES

        return total_frames

    def estimate_video_duration(self, coordinates: List[Tuple[float, float, str]],
                              steps_per_segment: int = DEFAULT_STEPS_PER_SEGMENT, fps: int = DEFAULT_FPS) -> float:
        """Estimate the total video duration in seconds."""
        total_frames = self.calculate_total_frames(coordinates, steps_per_segment)
        return total_frames / fps

    def create_base_map(self, coordinates: List[Tuple[float, float, str]]) -> folium.Map:
        """Create a base map with all cities marked."""
        if not coordinates:
            raise ValueError("No valid coordinates provided")

        # Calculate map center
        # lats = [coord[0] for coord in coordinates]
        # lons = [coord[1] for coord in coordinates]
        # center_lat = sum(lats) / len(lats)
        # center_lon = sum(lons) / len(lons)
        # Use global map settings
        self.usa_center = MAP_CENTER
        self.usa_zoom = MAP_ZOOM_LEVEL

        # Create map
        m = folium.Map(
            location=MAP_CENTER,
            zoom_start=MAP_ZOOM_LEVEL,
            tiles='OpenStreetMap'
        )

        # Add markers for all cities
        for i, (lat, lon, city) in enumerate(coordinates):
            color = 'red' if i == 0 else 'blue' if i == len(coordinates) - 1 else 'green'
            folium.Marker(
                [lat, lon],
                popup=f"{city} (Stop {i+1})",
                tooltip=city,
                icon=folium.Icon(color=color, icon='info-sign')
            ).add_to(m)

        return m

    def calculate_zoom_level(self, current_pos: Tuple[float, float], next_pos: Optional[Tuple[float, float]] = None,
                           mode: TravelMode = TravelMode.DRIVING) -> int:
        """Calculate appropriate zoom level based on travel mode and distance with smooth scaling."""
        return INITIAL_ZOOM_LEVEL

    def interpolate_path(self, start: Tuple[float, float], end: Tuple[float, float],
                        steps: int = DEFAULT_STEPS_PER_SEGMENT, mode: TravelMode = TravelMode.DRIVING) -> List[Tuple[float, float]]:
        """Create interpolated points between two coordinates based on travel mode."""
        try:
            if mode == TravelMode.FLYING:
                # For flying, create a curved path (great circle approximation)
                return self._create_curved_path(start, end, steps)
            else:
                # For ground transportation, use straight line interpolation
                return self._create_straight_path(start, end, steps)
        except Exception as e:
            logger.warning(f"Error in path interpolation from {start} to {end}: {e}")
            # Fallback to straight line path
            return self._create_straight_path(start, end, steps)

    def interpolate_map_view(self, start_center: Tuple[float, float], end_center: Tuple[float, float],
                           start_zoom: float, end_zoom: float, steps: int) -> List[Tuple[Tuple[float, float], float]]:
        """Create smooth transitions between map views with eased zoom curves."""
        views = []

        for i in range(steps + 1):
            f = i / steps

            # Apply easing function for smoother transitions
            # Use ease-in-out curve for more natural movement
            eased_f = self._ease_in_out(f)

            # Interpolate center coordinates with easing
            center_lat = start_center[0] + eased_f * (end_center[0] - start_center[0])
            center_lon = start_center[1] + eased_f * (end_center[1] - start_center[1])

            zoom = INITIAL_ZOOM_LEVEL

            views.append(((center_lat, center_lon), zoom))

        return views

    def _ease_in_out(self, t: float) -> float:
        """Smooth ease-in-out curve for natural movement."""
        import math
        return 0.5 * (1 - math.cos(math.pi * t))

    def _create_straight_path(self, start: Tuple[float, float], end: Tuple[float, float], steps: int) -> List[Tuple[float, float]]:
        """Create straight line path between two points."""
        if steps <= 0:
            return [start, end]

        lat_step = (end[0] - start[0]) / steps
        lon_step = (end[1] - start[1]) / steps

        path = []
        for i in range(steps + 1):
            lat = start[0] + (lat_step * i)
            lon = start[1] + (lon_step * i)
            path.append((lat, lon))

        return path

    def _create_curved_path(self, start: Tuple[float, float], end: Tuple[float, float], steps: int) -> List[Tuple[float, float]]:
        """Create curved path for flying routes (great circle approximation)."""
        import math

        if steps <= 0:
            return [start, end]

        # Check if points are too close (use straight line)
        if abs(start[0] - end[0]) < 0.001 and abs(start[1] - end[1]) < 0.001:
            return self._create_straight_path(start, end, steps)

        try:
            lat1, lon1 = math.radians(start[0]), math.radians(start[1])
            lat2, lon2 = math.radians(end[0]), math.radians(end[1])

            # Calculate angular distance
            cos_d = math.sin(lat1) * math.sin(lat2) + math.cos(lat1) * math.cos(lat2) * math.cos(lon2 - lon1)

            # Clamp to valid range to avoid math domain errors
            cos_d = max(-1.0, min(1.0, cos_d))
            d = math.acos(cos_d)

            # If distance is very small or zero, use straight line
            if d < 1e-6:
                return self._create_straight_path(start, end, steps)

            path = []
            sin_d = math.sin(d)

            for i in range(steps + 1):
                f = i / steps

                # Spherical interpolation
                a = math.sin((1 - f) * d) / sin_d
                b = math.sin(f * d) / sin_d

                x = a * math.cos(lat1) * math.cos(lon1) + b * math.cos(lat2) * math.cos(lon2)
                y = a * math.cos(lat1) * math.sin(lon1) + b * math.cos(lat2) * math.sin(lon2)
                z = a * math.sin(lat1) + b * math.sin(lat2)

                lat = math.atan2(z, math.sqrt(x*x + y*y))
                lon = math.atan2(y, x)

                path.append((math.degrees(lat), math.degrees(lon)))

            return path

        except Exception as e:
            logger.warning(f"Error in curved path calculation: {e}, falling back to straight line")
            return self._create_straight_path(start, end, steps)

    def _interpolate_temperature(self, start_temp: float, end_temp: float, progress: float) -> float:
        """Interpolate temperature between two values based on progress (0-1)."""
        return start_temp + (end_temp - start_temp) * progress

    def _get_temperature_for_location(self, lat: float, lon: float, date_str: str) -> Optional[float]:
        """Get temperature for a specific location and date."""
        weather_data = self._get_weather_data(lat, lon, date_str)
        return weather_data.temperature if weather_data else None

    def create_animated_frames(self, coordinates: List[Tuple[float, float, str]],
                              travel_modes: Optional[List[TravelMode]] = None,
                              steps_per_segment: int = DEFAULT_STEPS_PER_SEGMENT,
                              dates: Optional[List[dict]] = None) -> List[str]:
        """Create individual map frames for animation with dynamic zoom and movement.

        Args:
            coordinates: List of (lat, lon, city_name) tuples
            travel_modes: List of travel modes for each segment
            steps_per_segment: Number of frames per travel segment
            dates: List of date information for each location

        Returns:
            List of file paths to the generated frame images
        """
        frames = []
        self.current_temp = None  # Reset current temperature at start

        # Calculate and log total frames for progress tracking
        total_expected_frames = self.calculate_total_frames(coordinates, steps_per_segment)
        logger.info(f"Creating animation with {total_expected_frames} total frames")
        logger.info(f"Estimated video duration: {self.estimate_video_duration(coordinates, steps_per_segment):.1f} seconds")

        # Default to driving mode if no modes specified
        if travel_modes is None:
            travel_modes = [TravelMode.DRIVING] * (len(coordinates) - 1)
        elif len(travel_modes) != len(coordinates) - 1:
            logger.warning(f"Travel modes length ({len(travel_modes)}) doesn't match segments ({len(coordinates) - 1}). Using driving mode for missing segments.")
            travel_modes.extend([TravelMode.DRIVING] * (len(coordinates) - 1 - len(travel_modes)))

        # Create base map
        base_map = self.create_base_map(coordinates)

        # Save initial frame
        initial_frame = os.path.join(self.output_dir, "frame_000.html")
        base_map.save(initial_frame)
        frames.append(initial_frame)

        frame_count = 1

        # Create frames for each segment with dynamic zoom and movement
        for i in range(len(coordinates) - 1):
            start_coord = (coordinates[i][0], coordinates[i][1])
            end_coord = (coordinates[i+1][0], coordinates[i+1][1])
            current_mode = travel_modes[i]

            # Calculate zoom levels for this segment with smoother transitions
            start_zoom = self.calculate_zoom_level(start_coord, end_coord, current_mode)
            # Determine end zoom based on next segment or default to close view
            if i < len(coordinates) - 2:  # Not the last segment
                next_coord = (coordinates[i+2][0], coordinates[i+2][1])
                next_mode = travel_modes[i+1] if i+1 < len(travel_modes) else TravelMode.DRIVING
                end_zoom = self.calculate_zoom_level(end_coord, next_coord, next_mode)
            else:
                end_zoom = DESTINATION_ZOOM_LEVEL  # Close zoom for final destination
            mode_style = self.get_travel_mode_style(current_mode)

            # Get interpolated path based on travel mode
            path_points = self.interpolate_path(start_coord, end_coord, steps_per_segment, current_mode)

            # Get smooth map view transitions
            map_views = self.interpolate_map_view(start_coord, end_coord, start_zoom, end_zoom, steps_per_segment)

            for j, point in enumerate(path_points[1:]):  # Skip first point as it's the same as previous end
                # Get dynamic map view for this frame
                current_center, current_zoom = map_views[j+1]

                # Create timestamp info for this frame with temperature interpolation
                timestamp_info = None
                if dates and i < len(dates):
                    current_date = dates[i]
                    current_coords = (coordinates[i][0], coordinates[i][1])
                    next_coords = (coordinates[i+1][0], coordinates[i+1][1]) if i+1 < len(coordinates) else None

                    # Get temperatures for current and next location
                    current_temp = self._get_temperature_for_location(
                        current_coords[0], current_coords[1],
                        current_date.get('start_date', '')
                    )

                    # If we have a next location, get its temperature for interpolation
                    target_temp = None
                    interpolated_temp = current_temp

                    if next_coords and i+1 < len(dates):
                        next_date = dates[i+1]
                        target_temp = self._get_temperature_for_location(
                            next_coords[0], next_coords[1],
                            next_date.get('start_date', '')
                        )

                        if target_temp is not None and current_temp is not None:
                            # Calculate progress for temperature interpolation (0 to 1)
                            progress = (j + 1) / len(path_points)
                            # Calculate the interpolated temperature
                            interpolated_temp = self._interpolate_temperature(
                                current_temp,
                                target_temp,
                                progress
                            )

                    timestamp_info = {
                        'date': current_date.get('start_date', ''),
                        'location': f"{coordinates[i][2]} → {coordinates[i+1][2]}" if i+1 < len(coordinates) else coordinates[i][2],
                        'travel_mode': current_mode.value.title(),
                        'coords': current_coords,
                        'current_temp': interpolated_temp,  # Use interpolated temperature
                        'target_temp': target_temp,
                        'is_destination': False
                    }
                else:
                    logger.warning(f"Frame {frame_count}: No timestamp data available (dates={dates is not None}, i={i}, len(dates)={len(dates) if dates else 'N/A'})")

                # Create new map for this frame with dynamic center and zoom
                frame_map = self.create_dynamic_map(current_center, current_zoom, coordinates, reached_index=i, timestamp_info=timestamp_info)

                # Add traveled path so far with appropriate styling
                traveled_segments = []
                for k in range(i):
                    segment_mode = travel_modes[k]
                    segment_style = self.get_travel_mode_style(segment_mode)
                    segment_path = self.interpolate_path(
                        (coordinates[k][0], coordinates[k][1]),
                        (coordinates[k+1][0], coordinates[k+1][1]),
                        steps_per_segment,
                        segment_mode
                    )
                    traveled_segments.append((segment_path, segment_style))

                # Add current segment path up to current point
                current_segment_path = path_points[:j+2]
                traveled_segments.append((current_segment_path, mode_style))

                # Add polylines for each traveled segment with appropriate styling
                for segment_path, segment_style in traveled_segments:
                    if len(segment_path) > 1:
                        folium.PolyLine(
                            segment_path,
                            color=segment_style['color'],
                            weight=segment_style['weight'],
                            opacity=segment_style['opacity'],
                            dash_array=segment_style['dash_array']
                        ).add_to(frame_map)

                # Add current position marker with mode-appropriate icon
                folium.Marker(
                    point,
                    icon=folium.Icon(color=mode_style['icon_color'], icon=mode_style['icon'])
                ).add_to(frame_map)

                # Save frame
                frame_file = os.path.join(self.output_dir, f"frame_{frame_count:03d}.html")
                frame_map.save(frame_file)
                frames.append(frame_file)
                frame_count += 1

            # Add pause frames at destination for cinematic effect
            pause_frames = DESTINATION_PAUSE_FRAMES  # Number of frames to pause at each destination
            destination_coord = end_coord
            destination_zoom = DESTINATION_ZOOM_LEVEL  # Close zoom for destination exploration

            # Get travel path for progressive drawing
            travel_path_points = self.interpolate_path(start_coord, end_coord, steps_per_segment, current_mode)
            mode_style = self.get_travel_mode_style(current_mode)

            for pause_frame in range(pause_frames):
                # Create timestamp info for pause frame at destination
                pause_timestamp_info = None
                if dates and i+1 < len(dates):
                    destination_date = dates[i+1]
                    dest_coords = (coordinates[i+1][0], coordinates[i+1][1])

                    # Get temperature for destination
                    dest_temp = self._get_temperature_for_location(
                        dest_coords[0], dest_coords[1],
                        destination_date.get('start_date', '')
                    )

                    pause_timestamp_info = {
                        'date': destination_date.get('start_date', ''),
                        'location': coordinates[i+1][2],  # Destination city name
                        'travel_mode': 'Exploring',
                        'coords': dest_coords,
                        'current_temp': dest_temp,
                        'is_destination': True  # Flag to update current_temp
                    }

                # Create destination pause frame with close zoom
                pause_map = self.create_dynamic_map(destination_coord, destination_zoom, coordinates, reached_index=i+1, timestamp_info=pause_timestamp_info)

                # Add all traveled paths
                traveled_segments = []
                for k in range(i + 1):  # Include current segment
                    if k < len(coordinates) - 1:
                        segment_mode = travel_modes[k]
                        segment_style = self.get_travel_mode_style(segment_mode)
                        segment_path = self.interpolate_path(
                            (coordinates[k][0], coordinates[k][1]),
                            (coordinates[k+1][0], coordinates[k+1][1]),
                            steps_per_segment,
                            segment_mode
                        )
                        traveled_segments.append((segment_path, segment_style))

                # Add all previous traveled segments
                traveled_segments = []
                for k in range(i + 1):  # Include current segment
                    if k < len(coordinates) - 1:
                        segment_mode = travel_modes[k]
                        segment_style = self.get_travel_mode_style(segment_mode)
                        segment_path = self.interpolate_path(
                            (coordinates[k][0], coordinates[k][1]),
                            (coordinates[k+1][0], coordinates[k+1][1]),
                            steps_per_segment,
                            segment_mode
                        )
                        traveled_segments.append((segment_path, segment_style))

                # Add polylines for all traveled segments
                for segment_path, segment_style in traveled_segments:
                    if len(segment_path) > 1:
                        folium.PolyLine(
                            segment_path,
                            color=segment_style['color'],
                            weight=segment_style['weight'],
                            opacity=segment_style['opacity'],
                            dash_array=segment_style['dash_array']
                        ).add_to(pause_map)

                # Add destination marker with special highlighting
                folium.Marker(
                    destination_coord,
                    icon=folium.Icon(color='red', icon='star', prefix='fa'),
                    popup=f"Exploring: {coordinates[i+1][2]}"
                ).add_to(pause_map)

                # Save pause frame
                pause_frame_file = os.path.join(self.output_dir, f"frame_{frame_count:03d}.html")
                pause_map.save(pause_frame_file)
                frames.append(pause_frame_file)
                frame_count += 1

        # Create outro sequence - zoom out to show all of America
        logger.info("Creating outro sequence...")
        end_center = coordinates[-1][:2]  # End at last coordinate
        end_zoom = self.calculate_zoom_level(coordinates[-1][:2], None,
                                          travel_modes[-1] if travel_modes else TravelMode.DRIVING)

        # Create smooth zoom out to show all of America
        outro_frames = 30  # Number of frames for intro/outro
        for i in range(outro_frames):
            # Ease in interpolation (starts slow, ends fast)
            t = i / (outro_frames - 1)
            t = t ** 2  # Ease in quadratic

            # Interpolate center and zoom
            current_center = (
                end_center[0] + (self.usa_center[0] - end_center[0]) * t,
                end_center[1] + (self.usa_center[1] - end_center[1]) * t
            )
            current_zoom = end_zoom + (self.usa_zoom - end_zoom) * t

            # Create frame with all markers and paths visible
            frame_map = self.create_dynamic_map(
                current_center,
                current_zoom,
                coordinates,
                reached_index=len(coordinates)  # Show all markers during outro
            )

            # Add all travel segments to the map
            if travel_modes:
                for k in range(len(coordinates) - 1):
                    segment_style = self.get_travel_mode_style(travel_modes[k] if k < len(travel_modes) else TravelMode.DRIVING)
                    segment_path = self.interpolate_path(
                        (coordinates[k][0], coordinates[k][1]),
                        (coordinates[k+1][0], coordinates[k+1][1]),
                        steps=10,  # Fewer steps for the line since we're zoomed out
                        mode=travel_modes[k] if k < len(travel_modes) else TravelMode.DRIVING
                    )
                    if len(segment_path) > 1:
                        folium.PolyLine(
                            segment_path,
                            color=segment_style['color'],
                            weight=segment_style['weight'],
                            opacity=segment_style['opacity'],
                            dash_array=segment_style['dash_array']
                        ).add_to(frame_map)

            # Add timestamp info for the final destination
            timestamp_info = None
            if dates and len(dates) > 0:
                final_date = dates[-1]
                timestamp_info = {
                    'date': final_date.get('end_date', final_date.get('start_date', '')),
                    'location': coordinates[-1][2],  # Final city name
                    'travel_mode': 'Journey Complete'
                }
                self._add_timestamp_overlay(frame_map, timestamp_info)

            # Save frame
            frame_file = os.path.join(self.output_dir, f"outro_frame_{i:04d}.html")
            frame_map.save(frame_file)
            frames.append(frame_file)

        return frames

    def create_video_from_images(self, image_files: List[str], output_video: str, fps: int = DEFAULT_FPS):
        """Create video from image files with optional GPU acceleration."""
        if not image_files:
            logger.error("No images provided for video creation")
            return

        try:
            if self.use_gpu:
                self._create_video_gpu_accelerated(image_files, output_video, fps)
            else:
                self._create_video_cpu_fallback(image_files, output_video, fps)
        except Exception as e:
            logger.warning(f"GPU video creation failed: {e}, falling back to CPU")
            self._create_video_cpu_fallback(image_files, output_video, fps)

    def _create_video_gpu_accelerated(self, image_files: List[str], output_video: str, fps: int):
        """Create video using GPU-accelerated FFmpeg encoding."""
        import subprocess
        import tempfile
        import os

        logger.info(f"Creating GPU-accelerated video: {output_video}")

        # Create temporary file list for FFmpeg
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
            for img_file in image_files:
                # Convert to PNG if needed and write to file list
                png_file = img_file.replace('.html', '.png')
                if not os.path.exists(png_file):
                    self._convert_html_to_png(img_file, png_file)
                f.write(f"file '{os.path.abspath(png_file)}'\n")
                f.write(f"duration {1/fps}\n")
            file_list_path = f.name

        try:
            # Try different GPU encoders in order of preference
            gpu_encoders = [
                # NVIDIA GPU (NVENC)
                ['-f', 'concat', '-safe', '0', '-i', file_list_path,
                 '-c:v', 'h264_nvenc', '-preset', 'fast', '-crf', '23',
                 '-pix_fmt', 'yuv420p', '-r', str(fps), output_video],

                # AMD GPU (AMF)
                ['-f', 'concat', '-safe', '0', '-i', file_list_path,
                 '-c:v', 'h264_amf', '-preset', 'fast', '-crf', '23',
                 '-pix_fmt', 'yuv420p', '-r', str(fps), output_video],

                # Intel GPU (QuickSync)
                ['-f', 'concat', '-safe', '0', '-i', file_list_path,
                 '-c:v', 'h264_qsv', '-preset', 'fast', '-crf', '23',
                 '-pix_fmt', 'yuv420p', '-r', str(fps), output_video],
            ]

            success = False
            for encoder_cmd in gpu_encoders:
                try:
                    cmd = ['ffmpeg', '-y'] + encoder_cmd
                    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
                    logger.info(f"GPU encoding successful with {encoder_cmd[6]}")
                    success = True
                    break
                except subprocess.CalledProcessError as e:
                    logger.debug(f"GPU encoder {encoder_cmd[6]} failed: {e}")
                    continue

            if not success:
                raise Exception("All GPU encoders failed")

        finally:
            # Clean up temporary file
            try:
                os.unlink(file_list_path)
            except:
                pass

    def _create_video_cpu_fallback(self, image_files: List[str], output_video: str, fps: int):
        """Fallback to CPU-based video creation using imageio."""
        logger.info(f"Creating video using CPU: {output_video}")

        # Convert HTML files to images first
        png_files = []
        for img_file in image_files:
            png_file = img_file.replace('.html', '.png')
            if not os.path.exists(png_file):
                self._convert_html_to_png(img_file, png_file)
            png_files.append(png_file)

        # Create video using imageio (original method)
        import imageio
        with imageio.get_writer(output_video, fps=fps, codec='libx264', quality=8) as writer:
            for png_file in png_files:
                if os.path.exists(png_file):
                    image = imageio.imread(png_file)
                    writer.append_data(image)

        logger.info(f"Video created successfully: {output_video}")

    def _convert_html_to_png(self, html_file: str, png_file: str):
        """Convert HTML file to PNG using Selenium (existing method)."""
        if os.path.exists(png_file):
            return

        self._ensure_driver()
        try:
            self.driver.get(f"file://{os.path.abspath(html_file)}")
            time.sleep(0.5)  # Brief pause for rendering
            self.driver.save_screenshot(png_file)
        except Exception as e:
            logger.error(f"Error converting {html_file} to PNG: {e}")

    def html_to_image(self, html_file: str, output_image: str, width: int = MAP_WIDTH, height: int = MAP_HEIGHT):
        """Convert HTML map to image using Selenium with high resolution."""
        self._ensure_driver()
        try:
            # Load the HTML file
            self.driver.get(f"file://{os.path.abspath(html_file)}")

            # Wait for map to load
            time.sleep(2)

            # Take screenshot
            self.driver.save_screenshot(output_image)
        except Exception as e:
            logger.error(f"Error converting HTML to image: {e}")

    def create_video_from_frames(self, frames: List[str], output_video: str, fps: int = DEFAULT_FPS):
        """Create video from frame images."""
        images = []

        logger.info("Converting HTML frames to images...")
        for i, frame in enumerate(frames):
            image_file = frame.replace('.html', '.png')
            self.html_to_image(frame, image_file)

            if os.path.exists(image_file):
                images.append(imageio.imread(image_file))
                logger.info(f"Processed frame {i+1}/{len(frames)}")
            else:
                logger.warning(f"Failed to create image for frame {i+1}")

        if images:
            logger.info(f"Creating video with {len(images)} frames...")
            imageio.mimsave(output_video, images, fps=fps)
            logger.info(f"Video saved as {output_video}")
        else:
            logger.error("No images were created, cannot generate video")

    def create_travel_animation(self, cities: List[str], output_video: str = "travel_animation.mp4",
                              steps_per_segment: int = DEFAULT_STEPS_PER_SEGMENT, fps: int = DEFAULT_FPS,
                              travel_modes: Optional[List[TravelMode]] = None, dates: Optional[List[dict]] = None):
        """Main method to create travel animation."""
        logger.info(f"Starting travel animation for {len(cities)} cities")

        # Get coordinates for all cities
        coordinates = self.get_all_coordinates(cities)
        if len(coordinates) < 2:
            raise ValueError("Need at least 2 valid cities to create animation")

        logger.info(f"Successfully geocoded {len(coordinates)} cities")

        # Create animated frames
        logger.info("Creating animation frames...")
        frames = self.create_animated_frames(coordinates, travel_modes, steps_per_segment, dates)

        # Create video
        logger.info("Generating video...")
        self.create_video_from_images(frames, output_video, fps)

        # Cleanup HTML files
        logger.info("Cleaning up temporary files...")
        for frame in frames:
            if os.path.exists(frame):
                os.remove(frame)
            image_file = frame.replace('.html', '.png')
            if os.path.exists(image_file):
                os.remove(image_file)

        logger.info("Travel animation complete!")

def main():
    parser = argparse.ArgumentParser(description='Create animated travel video from city list')
    parser.add_argument('--cities', nargs='+', required=True,
                       help='List of cities to visit (e.g., "Orlando,FL" "Tallahassee,FL")')
    parser.add_argument('--output', default='travel_animation.mp4',
                       help='Output video filename')
    parser.add_argument('--steps', type=int, default=DEFAULT_STEPS_PER_SEGMENT,
                       help='Animation steps between cities')
    parser.add_argument('--fps', type=int, default=DEFAULT_FPS,
                       help='Frames per second for output video')
    parser.add_argument('--output-dir', default='output',
                       help='Directory for temporary files')
    parser.add_argument('--travel-modes', nargs='*',
                       choices=['driving', 'flying', 'walking', 'cycling', 'train', 'boat'],
                       help='Travel modes for each segment (e.g., driving flying driving)')
    parser.add_argument('--use-gpu', action='store_true', default=True,
                        help='Use GPU for rendering')

    args = parser.parse_args()

    # Create animator
    animator = TravelAnimator(output_dir=args.output_dir)

    # Parse travel modes if provided
    travel_modes = None
    if args.travel_modes:
        travel_modes = [TravelMode(mode) for mode in args.travel_modes]
        if len(travel_modes) != len(args.cities) - 1:
            print(f"Warning: {len(travel_modes)} travel modes provided for {len(args.cities) - 1} segments. Missing modes will default to driving.")

    try:
        # Create animation
        animator.use_gpu = args.use_gpu
        animator.create_travel_animation(
            cities=args.cities,
            output_video=args.output,
            steps_per_segment=args.steps,
            fps=args.fps,
            travel_modes=travel_modes
        )
        print(f"Animation created successfully: {args.output}")

    except Exception as e:
        logger.error(f"Error creating animation: {e}")
        return 1

    finally:
        animator.cleanup()

    return 0

if __name__ == "__main__":
    exit(main())

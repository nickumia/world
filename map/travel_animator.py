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
from enum import Enum

# Animation Configuration Constants
DESTINATION_PAUSE_FRAMES = 5  # Number of frames to pause at each destination
DESTINATION_ZOOM_LEVEL = 11    # Close zoom level for destination exploration
INITIAL_ZOOM_LEVEL = 10        # Starting zoom level for first city
DEFAULT_FPS = 30               # Default frames per second for video output
DEFAULT_STEPS_PER_SEGMENT = 2 * DEFAULT_FPS  # Default animation frames per travel segment
DEPARTURE_ZOOM_OUT_FRAMES = 8  # Number of frames for smooth zoom-out when leaving destination
FRAME_ZOOM_INCREMENT = 0.5     # Progressive zoom increment per frame for smooth transitions

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

class TravelAnimator:
    def __init__(self, output_dir: str = "output"):
        """Initialize the Travel Animator."""
        self.output_dir = output_dir
        self.geolocator = Nominatim(user_agent="travel_animator")
        self.coordinates_cache = {}
        
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
        
        # Setup Chrome driver options for headless operation
        self.chrome_options = Options()
        self.chrome_options.add_argument("--headless")
        self.chrome_options.add_argument("--no-sandbox")
        self.chrome_options.add_argument("--disable-dev-shm-usage")
        self.chrome_options.add_argument("--window-size=1920,1080")
    
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

    def create_dynamic_map(self, center_coords: Tuple[float, float], zoom_level: float = 8.0, 
                          coordinates: Optional[List[Tuple[float, float, str]]] = None) -> folium.Map:
        """Create a map centered on specific coordinates with custom zoom level."""
        m = folium.Map(
            location=[center_coords[0], center_coords[1]],
            zoom_start=zoom_level,
            tiles='OpenStreetMap'
        )
        
        # Add all city markers if coordinates provided
        if coordinates:
            for i, (lat, lon, city) in enumerate(coordinates):
                color = 'red' if i == 0 else 'blue' if i == len(coordinates) - 1 else 'green'
                folium.Marker(
                    [lat, lon],
                    popup=f"{city} (Stop {i+1})",
                    tooltip=city,
                    icon=folium.Icon(color=color, icon='info-sign')
                ).add_to(m)
        
        return m

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
        lats = [coord[0] for coord in coordinates]
        lons = [coord[1] for coord in coordinates]
        center_lat = sum(lats) / len(lats)
        center_lon = sum(lons) / len(lons)
        
        # Create map
        m = folium.Map(
            location=[center_lat, center_lon],
            zoom_start=5,
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
        if next_pos is None:
            # Static zoom for single point
            return 10
        
        # Calculate distance between points
        import math
        lat1, lon1 = math.radians(current_pos[0]), math.radians(current_pos[1])
        lat2, lon2 = math.radians(next_pos[0]), math.radians(next_pos[1])
        
        # Haversine formula for distance
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        distance_km = 6371 * c  # Earth's radius in km
        
        # Use logarithmic scaling for smoother zoom transitions
        if mode == TravelMode.FLYING:
            # Flying - more dramatic zoom out for long distances
            if distance_km < 50:
                return 9
            elif distance_km < 200:
                return 8
            elif distance_km < 500:
                return 7
            elif distance_km < 1000:
                return 6
            elif distance_km < 2000:
                return 5
            else:
                return 4  # Continental view
        else:
            # Ground transportation - gradual zoom scaling
            if distance_km < 25:
                return 11  # Very close city view
            elif distance_km < 50:
                return 10  # City view
            elif distance_km < 100:
                return 9   # City region view
            elif distance_km < 200:
                return 8   # Regional view
            elif distance_km < 500:
                return 7   # State view
            elif distance_km < 1000:
                return 6   # Multi-state view
            else:
                return 5   # Wide regional view
    
    def interpolate_path(self, start: Tuple[float, float], end: Tuple[float, float], 
                        steps: int = 20, mode: TravelMode = TravelMode.DRIVING) -> List[Tuple[float, float]]:
        """Create interpolated points between two coordinates based on travel mode."""
        if mode == TravelMode.FLYING:
            # For flying, create a curved path (great circle approximation)
            return self._create_curved_path(start, end, steps)
        else:
            # For ground transportation, use straight line interpolation
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
            
            # Create smoother zoom transitions with different curve for zoom
            zoom_f = self._smooth_zoom_curve(f, start_zoom, end_zoom)
            # Use float zoom for truly smooth transitions (Folium supports fractional zoom)
            zoom = max(1.0, min(18.0, start_zoom + zoom_f * (end_zoom - start_zoom)))
            
            views.append(((center_lat, center_lon), zoom))
        
        return views
    
    def _ease_in_out(self, t: float) -> float:
        """Smooth ease-in-out curve for natural movement."""
        import math
        return 0.5 * (1 - math.cos(math.pi * t))
    
    def _smooth_zoom_curve(self, t: float, start_zoom: float, end_zoom: float) -> float:
        """Create ultra-smooth zoom curve with gentle transitions."""
        import math
        
        zoom_diff = abs(end_zoom - start_zoom)
        
        # Use smoother curves for all zoom differences
        if zoom_diff <= 1:
            # Very gentle easing for minimal zoom changes
            return 0.5 * (1 - math.cos(math.pi * t * 0.8))
        elif zoom_diff <= 3:
            # Gentle S-curve for moderate zoom changes
            return self._ease_in_out(t) * 0.9
        else:
            # Ultra-smooth curve for large zoom changes
            # Use cubic bezier-like curve for very smooth transitions
            t_smooth = t * t * (3.0 - 2.0 * t)  # Smoothstep function
            return self._ease_in_out(t_smooth) * 0.95
    
    def _create_straight_path(self, start: Tuple[float, float], end: Tuple[float, float], steps: int) -> List[Tuple[float, float]]:
        """Create straight line path between two points."""
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
        
        lat1, lon1 = math.radians(start[0]), math.radians(start[1])
        lat2, lon2 = math.radians(end[0]), math.radians(end[1])
        
        path = []
        for i in range(steps + 1):
            f = i / steps
            
            # Great circle interpolation
            a = math.sin((1-f) * math.acos(math.sin(lat1)*math.sin(lat2) + 
                                          math.cos(lat1)*math.cos(lat2)*math.cos(lon2-lon1))) / math.sin(math.acos(math.sin(lat1)*math.sin(lat2) + math.cos(lat1)*math.cos(lat2)*math.cos(lon2-lon1)))
            b = math.sin(f * math.acos(math.sin(lat1)*math.sin(lat2) + 
                                      math.cos(lat1)*math.cos(lat2)*math.cos(lon2-lon1))) / math.sin(math.acos(math.sin(lat1)*math.sin(lat2) + math.cos(lat1)*math.cos(lat2)*math.cos(lon2-lon1)))
            
            if math.acos(math.sin(lat1)*math.sin(lat2) + math.cos(lat1)*math.cos(lat2)*math.cos(lon2-lon1)) == 0:
                # Points are the same or antipodal
                path.append((start[0] + f * (end[0] - start[0]), start[1] + f * (end[1] - start[1])))
            else:
                x = a * math.cos(lat1) * math.cos(lon1) + b * math.cos(lat2) * math.cos(lon2)
                y = a * math.cos(lat1) * math.sin(lon1) + b * math.cos(lat2) * math.sin(lon2)
                z = a * math.sin(lat1) + b * math.sin(lat2)
                
                lat = math.atan2(z, math.sqrt(x*x + y*y))
                lon = math.atan2(y, x)
                
                path.append((math.degrees(lat), math.degrees(lon)))
        
    def create_animated_frames(self, coordinates: List[Tuple[float, float, str]], 
                              travel_modes: Optional[List[TravelMode]] = None, 
                              steps_per_segment: int = DEFAULT_STEPS_PER_SEGMENT) -> List[str]:
        """Create individual map frames for animation with dynamic zoom and movement."""
        frames = []
        
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
                end_zoom = 10  # Close zoom for final destination
            mode_style = self.get_travel_mode_style(current_mode)
            
            # Get interpolated path based on travel mode
            path_points = self.interpolate_path(start_coord, end_coord, steps_per_segment, current_mode)
            
            # Get smooth map view transitions
            map_views = self.interpolate_map_view(start_coord, end_coord, start_zoom, end_zoom, steps_per_segment)
            
            for j, point in enumerate(path_points[1:]):  # Skip first point as it's the same as previous end
                # Get dynamic map view for this frame
                current_center, current_zoom = map_views[j+1]
                
                # Ensure zoom is actually changing by adding small progressive offset
                # This guarantees each frame has a unique zoom value
                frame_zoom_offset = j * FRAME_ZOOM_INCREMENT  # Progressive increment per frame
                adjusted_zoom = current_zoom + (frame_zoom_offset * (1 if end_zoom > start_zoom else -1))
                adjusted_zoom = max(1.0, min(18.0, adjusted_zoom))
                
                # Debug: Log zoom values to ensure they're changing
                if j < 5:  # Log first few frames for debugging
                    logger.info(f"Frame {j}: Base zoom {current_zoom:.2f}, Adjusted zoom {adjusted_zoom:.2f}")
                
                # Create new map for this frame with dynamic center and zoom
                frame_map = self.create_dynamic_map(current_center, adjusted_zoom, coordinates)
                
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
            
            for pause_frame in range(pause_frames):
                # Create destination pause frame with close zoom
                pause_map = self.create_dynamic_map(destination_coord, destination_zoom, coordinates)
                
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
            
            # Add smooth zoom-out transition frames when leaving destination (except for last destination)
            if i < len(coordinates) - 2:  # Not the last segment
                next_start_zoom = self.calculate_zoom_level(end_coord, 
                                                          (coordinates[i+2][0], coordinates[i+2][1]),
                                                          travel_modes[i+1] if i+1 < len(travel_modes) else TravelMode.DRIVING)
                
                # Create smooth zoom-out from destination zoom to next segment's starting zoom
                departure_zoom_views = self.interpolate_map_view(
                    destination_coord, destination_coord,  # Stay centered on destination
                    destination_zoom, next_start_zoom,     # Zoom from close to appropriate level
                    DEPARTURE_ZOOM_OUT_FRAMES
                )
                
                for departure_frame in range(DEPARTURE_ZOOM_OUT_FRAMES):
                    departure_center, departure_zoom = departure_zoom_views[departure_frame]
                    
                    # Create departure zoom-out frame
                    departure_map = self.create_dynamic_map(departure_center, departure_zoom, coordinates)
                    
                    # Add all traveled paths (same as pause frames)
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
                            ).add_to(departure_map)
                    
                    # Add destination marker (fading out as we zoom out)
                    marker_opacity = 1.0 - (departure_frame / DEPARTURE_ZOOM_OUT_FRAMES)  # Fade out
                    if marker_opacity > 0.1:  # Keep visible until almost gone
                        folium.Marker(
                            destination_coord,
                            icon=folium.Icon(color='orange', icon='plane-departure', prefix='fa'),
                            popup=f"Departing: {coordinates[i+1][2]}"
                        ).add_to(departure_map)
                    
                    # Save departure frame
                    departure_frame_file = os.path.join(self.output_dir, f"frame_{frame_count:03d}.html")
                    departure_map.save(departure_frame_file)
                    frames.append(departure_frame_file)
                    frame_count += 1
        
        return frames
    
    def html_to_image(self, html_file: str, output_image: str, width: int = 1920, height: int = 1080):
        """Convert HTML map to image using Selenium."""
        try:
            driver = webdriver.Chrome(options=self.chrome_options)
            driver.set_window_size(width, height)
            
            # Load the HTML file
            driver.get(f"file://{os.path.abspath(html_file)}")
            
            # Wait for map to load
            time.sleep(2)
            
            # Take screenshot
            driver.save_screenshot(output_image)
            driver.quit()
            
        except Exception as e:
            logger.error(f"Error converting HTML to image: {e}")
            if 'driver' in locals():
                driver.quit()
    
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
                              travel_modes: Optional[List[TravelMode]] = None):
        """Main method to create travel animation."""
        logger.info(f"Starting travel animation for {len(cities)} cities")
        
        # Get coordinates for all cities
        coordinates = self.get_all_coordinates(cities)
        if len(coordinates) < 2:
            raise ValueError("Need at least 2 valid cities to create animation")
        
        logger.info(f"Successfully geocoded {len(coordinates)} cities")
        
        # Create animated frames
        logger.info("Creating animation frames...")
        frames = self.create_animated_frames(coordinates, travel_modes, steps_per_segment)
        
        # Create video
        logger.info("Generating video...")
        self.create_video_from_frames(frames, output_video, fps)
        
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
    parser.add_argument('--steps', type=int, default=20, 
                       help='Animation steps between cities')
    parser.add_argument('--fps', type=int, default=DEFAULT_FPS, 
                       help='Frames per second for output video')
    parser.add_argument('--output-dir', default='output', 
                       help='Directory for temporary files')
    parser.add_argument('--travel-modes', nargs='*', 
                       choices=['driving', 'flying', 'walking', 'cycling', 'train', 'boat'],
                       help='Travel modes for each segment (e.g., driving flying driving)')
    
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
    
    return 0

if __name__ == "__main__":
    exit(main())

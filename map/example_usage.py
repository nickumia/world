#!/usr/bin/env python3
"""
Example usage of the Travel Animator

This script demonstrates how to use the travel_animator.py to create
animated videos from your travel itinerary.
"""

from travel_animator import TravelAnimator, TravelMode
import csv
import os

def create_florida_trip_animation():
    """Example: Create animation for Florida trip with driving."""
    cities = [
        "Orlando, FL",
        "Tallahassee, FL", 
        "Panama City Beach, FL"
    ]
    
    # All segments by car
    travel_modes = [TravelMode.DRIVING, TravelMode.DRIVING]
    
    animator = TravelAnimator(output_dir="florida_output")
    animator.create_travel_animation(
        cities=cities,
        output_video="florida_trip.mp4",
        steps_per_segment=15,
        fps=8,
        travel_modes=travel_modes
    )

def create_southeast_tour_animation():
    """Example: Create animation for Southeast US tour with mixed travel modes."""
    cities = [
        "Orlando, FL",
        "Tallahassee, FL",
        "Panama City Beach, FL",
        "Dothan, AL",
        "Montgomery, AL", 
        "Mobile, AL",
        "Baton Rouge, LA",
        "Shreveport, LA",
        "Jackson, MS",
        "Little Rock, AR",
        "Fort Smith, AR"
    ]
    
    # Mixed travel modes: mostly driving with one flight
    travel_modes = [
        TravelMode.DRIVING,   # Orlando to Tallahassee
        TravelMode.DRIVING,   # Tallahassee to Panama City Beach
        TravelMode.DRIVING,   # Panama City Beach to Dothan
        TravelMode.DRIVING,   # Dothan to Montgomery
        TravelMode.DRIVING,   # Montgomery to Mobile
        TravelMode.FLYING,    # Mobile to Baton Rouge (skip drive through MS)
        TravelMode.DRIVING,   # Baton Rouge to Shreveport
        TravelMode.DRIVING,   # Shreveport to Jackson
        TravelMode.DRIVING,   # Jackson to Little Rock
        TravelMode.DRIVING    # Little Rock to Fort Smith
    ]
    
    animator = TravelAnimator(output_dir="southeast_output")
    animator.create_travel_animation(
        cities=cities,
        output_video="southeast_tour.mp4",
        steps_per_segment=25,
        fps=12,
        travel_modes=travel_modes
    )

def load_stops_from_csv(csv_file="stops.csv"):
    """Load cities and travel modes from CSV file."""
    cities = []
    travel_modes = []
    
    if not os.path.exists(csv_file):
        print(f"Warning: {csv_file} not found. Using default data.")
        return None, None
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            rows = list(reader)
            
            # Filter out rows with missing location data
            valid_rows = [row for row in rows if row['Location'].strip() and row['State'].strip()]
            
            # Build cities list
            for row in valid_rows:
                location = row['Location'].strip()
                state = row['State'].strip()
                
                # Skip international locations for now
                if state in ['Vietnam', 'JP']:  # Skip Vietnam and Japan
                    continue
                    
                # Format city name
                if '/' in location:
                    # Take the first city if multiple are listed
                    location = location.split('/')[0]
                
                city_name = f"{location}, {state}"
                cities.append(city_name)
            
            # Build travel modes list (one less than cities since it's between cities)
            for i in range(len(valid_rows) - 1):
                current_row = valid_rows[i]
                next_row = valid_rows[i + 1]
                
                # Skip international segments
                if current_row['State'] in ['Vietnam', 'JP'] or next_row['State'] in ['Vietnam', 'JP']:
                    continue
                
                travel_type = current_row.get('Travel Type', 'Driving').strip().lower()
                
                # Map CSV travel types to TravelMode enum
                if travel_type == 'flying':
                    travel_modes.append(TravelMode.FLYING)
                elif travel_type == 'train':
                    travel_modes.append(TravelMode.TRAIN)
                elif travel_type == 'boat':
                    travel_modes.append(TravelMode.BOAT)
                elif travel_type == 'cycling':
                    travel_modes.append(TravelMode.CYCLING)
                elif travel_type == 'walking':
                    travel_modes.append(TravelMode.WALKING)
                else:  # Default to driving
                    travel_modes.append(TravelMode.DRIVING)
            
            print(f"Loaded {len(cities)} cities and {len(travel_modes)} travel segments from {csv_file}")
            return cities, travel_modes
            
    except Exception as e:
        print(f"Error reading {csv_file}: {e}")
        return None, None

def create_full_usa_tour_animation():
    """Example: Create animation for full USA tour loaded from stops.csv."""
    # Load cities and travel modes from CSV
    cities, travel_modes = load_stops_from_csv()
    
    if cities is None or travel_modes is None:
        print("Failed to load data from CSV. Using fallback data.")
        # Fallback to a simple route if CSV loading fails
        cities = [
            "Fort Lauderdale, FL",
            "Orlando, FL",
            "Tallahassee, FL",
            "Mobile, AL",
            "New Orleans, LA",
            "Houston, TX",
            "Denver, CO",
            "Las Vegas, NV",
            "Los Angeles, CA",
            "San Francisco, CA",
            "Seattle, WA",
            "Chicago, IL",
            "New York, NY",
            "Washington, DC",
            "Atlanta, GA",
            "Jacksonville, FL"
        ]
        travel_modes = [TravelMode.DRIVING] * (len(cities) - 1)
    
    animator = TravelAnimator(output_dir="usa_tour_output")
    animator.create_travel_animation(
        cities=cities,
        output_video="usa_spiritual_tour.mp4",
        steps_per_segment=30,
        fps=15,
        travel_modes=travel_modes
    )

def create_mixed_mode_demo():
    """Example: Demonstrate all travel modes."""
    cities = [
        "New York, NY",
        "Philadelphia, PA",  # Train
        "Washington, DC",    # Driving
        "Miami, FL",         # Flying
        "Key West, FL",      # Boat
        "Naples, FL"         # Cycling
    ]
    
    travel_modes = [
        TravelMode.TRAIN,     # NYC to Philly (Amtrak)
        TravelMode.DRIVING,   # Philly to DC
        TravelMode.FLYING,    # DC to Miami
        TravelMode.BOAT,      # Miami to Key West
        TravelMode.CYCLING    # Key West to Naples
    ]
    
    animator = TravelAnimator(output_dir="mixed_mode_output")
    animator.create_travel_animation(
        cities=cities,
        output_video="mixed_mode_demo.mp4",
        steps_per_segment=20,
        fps=10,
        travel_modes=travel_modes
    )

if __name__ == "__main__":
    print("Travel Animation Examples")
    print("========================")
    print("1. Florida Trip (3 cities) - All driving")
    print("2. Southeast Tour (11 cities) - Mixed modes")
    print("3. Full USA Spiritual Tour (50+ cities) - Strategic flights")
    print("4. Mixed Mode Demo (6 cities) - All travel types")
    
    choice = input("Enter your choice (1-4): ")
    
    if choice == "1":
        print("Creating Florida trip animation (driving only)...")
        create_florida_trip_animation()
    elif choice == "2":
        print("Creating Southeast tour animation (mixed modes)...")
        create_southeast_tour_animation()
    elif choice == "3":
        print("Creating full USA tour animation (strategic flights)...")
        create_full_usa_tour_animation()
    elif choice == "4":
        print("Creating mixed mode demonstration...")
        create_mixed_mode_demo()
    else:
        print("Invalid choice. Please run again and select 1, 2, 3, or 4.")

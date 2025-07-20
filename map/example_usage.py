#!/usr/bin/env python3
"""
Example usage of the Travel Animator

This script demonstrates how to use the travel_animator.py to create
animated videos from your travel itinerary.
"""

from travel_animator import TravelAnimator, TravelMode

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

def create_full_usa_tour_animation():
    """Example: Create animation for full USA tour based on your timeline."""
    # Based on your spiritual_tech.js timeline
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
        "Fort Smith, AR",
        "Tulsa, OK",
        "Oklahoma City, OK",
        "Dallas, TX",
        "Houston, TX",
        "San Antonio, TX",
        "Austin, TX",
        "El Paso, TX",
        "Albuquerque, NM",
        "Santa Fe, NM",
        "Denver, CO",
        "Colorado Springs, CO",
        "Cheyenne, WY",
        "Salt Lake City, UT",
        "Phoenix, AZ",
        "San Diego, CA",
        "Los Angeles, CA",
        "San Francisco, CA",
        "Las Vegas, NV",
        "Portland, OR",
        "Seattle, WA",
        "Boise, ID",
        "Helena, MT",
        "Bismarck, ND",
        "Pierre, SD",
        "Minneapolis, MN",
        "Madison, WI",
        "Chicago, IL",
        "Detroit, MI",
        "Columbus, OH",
        "Pittsburgh, PA",
        "Buffalo, NY",
        "Boston, MA",
        "Hartford, CT",
        "New York, NY",
        "Philadelphia, PA",
        "Washington, DC",
        "Richmond, VA",
        "Raleigh, NC",
        "Columbia, SC",
        "Atlanta, GA",
        "Jacksonville, FL"
    ]
    
    # Mixed travel modes for cross-country journey
    # Mostly driving with strategic flights for long distances
    travel_modes = [
        # Florida to West Coast - mostly driving
        TravelMode.DRIVING,   # Orlando to Tallahassee
        TravelMode.DRIVING,   # Tallahassee to Panama City Beach
        TravelMode.DRIVING,   # Panama City Beach to Dothan
        TravelMode.DRIVING,   # Dothan to Montgomery
        TravelMode.DRIVING,   # Montgomery to Mobile
        TravelMode.DRIVING,   # Mobile to Baton Rouge
        TravelMode.DRIVING,   # Baton Rouge to Shreveport
        TravelMode.DRIVING,   # Shreveport to Jackson
        TravelMode.DRIVING,   # Jackson to Little Rock
        TravelMode.DRIVING,   # Little Rock to Fort Smith
        TravelMode.DRIVING,   # Fort Smith to Tulsa
        TravelMode.DRIVING,   # Tulsa to Oklahoma City
        TravelMode.DRIVING,   # Oklahoma City to Dallas
        TravelMode.DRIVING,   # Dallas to Houston
        TravelMode.DRIVING,   # Houston to San Antonio
        TravelMode.DRIVING,   # San Antonio to Austin
        TravelMode.DRIVING,   # Austin to El Paso
        TravelMode.DRIVING,   # El Paso to Albuquerque
        TravelMode.DRIVING,   # Albuquerque to Santa Fe
        TravelMode.DRIVING,   # Santa Fe to Denver
        TravelMode.DRIVING,   # Denver to Colorado Springs
        TravelMode.DRIVING,   # Colorado Springs to Cheyenne
        TravelMode.DRIVING,   # Cheyenne to Salt Lake City
        TravelMode.DRIVING,   # Salt Lake City to Phoenix
        TravelMode.DRIVING,   # Phoenix to San Diego
        TravelMode.DRIVING,   # San Diego to Los Angeles
        TravelMode.DRIVING,   # Los Angeles to San Francisco
        TravelMode.FLYING,    # San Francisco to Las Vegas (skip desert drive)
        TravelMode.DRIVING,   # Las Vegas to Portland
        TravelMode.DRIVING,   # Portland to Seattle
        TravelMode.FLYING,    # Seattle to Boise (mountain crossing)
        TravelMode.DRIVING,   # Boise to Helena
        TravelMode.DRIVING,   # Helena to Bismarck
        TravelMode.DRIVING,   # Bismarck to Pierre
        TravelMode.DRIVING,   # Pierre to Minneapolis
        TravelMode.DRIVING,   # Minneapolis to Madison
        TravelMode.DRIVING,   # Madison to Chicago
        TravelMode.DRIVING,   # Chicago to Detroit
        TravelMode.DRIVING,   # Detroit to Columbus
        TravelMode.DRIVING,   # Columbus to Pittsburgh
        TravelMode.DRIVING,   # Pittsburgh to Buffalo
        TravelMode.DRIVING,   # Buffalo to Boston
        TravelMode.DRIVING,   # Boston to Hartford
        TravelMode.TRAIN,     # Hartford to New York (scenic train ride)
        TravelMode.TRAIN,     # New York to Philadelphia (Amtrak corridor)
        TravelMode.DRIVING,   # Philadelphia to Washington DC
        TravelMode.DRIVING,   # Washington DC to Richmond
        TravelMode.DRIVING,   # Richmond to Raleigh
        TravelMode.DRIVING,   # Raleigh to Columbia
        TravelMode.DRIVING,   # Columbia to Atlanta
        TravelMode.FLYING     # Atlanta to Jacksonville (final flight home)
    ]
    
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

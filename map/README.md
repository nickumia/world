# Travel Animation Generator

This tool creates animated videos showing travel routes between cities on a map. Perfect for visualizing road trips, travel itineraries, or spiritual journeys across multiple locations.

## Features

- **Geocoding**: Automatically finds coordinates for city names
- **Interactive Maps**: Uses Folium to create beautiful, interactive maps
- **Smooth Animation**: Interpolates between cities for smooth travel visualization
- **Customizable**: Adjustable animation speed, steps, and output format
- **Multiple Formats**: Supports various city name formats (City, State or City, Country)

## Installation

### Prerequisites

You'll need Python 3.7+ and Chrome/Chromium browser installed for screenshot generation.

### Docker Setup

```bash
cd map
docker build -t travel-animator .
```

## Usage

### Command Line Interface

```bash
docker run -ti --rm -v $(pwd)/map:/app travel-animator python example_usage.py
```

#### Options:
- `--cities`: List of cities (required)
- `--output`: Output video filename (default: travel_animation.mp4)
- `--steps`: Animation steps between cities (default: 20)
- `--fps`: Frames per second (default: 10)
- `--output-dir`: Directory for temporary files (default: output)

### Python API

```python
from travel_animator import TravelAnimator

# Create animator instance
animator = TravelAnimator(output_dir="my_output")

# Define your cities
cities = [
    "Orlando, FL",
    "Tallahassee, FL", 
    "Panama City Beach, FL",
    "Mobile, AL"
]

# Create animation
animator.create_travel_animation(
    cities=cities,
    output_video="my_journey.mp4",
    steps_per_segment=25,
    fps=12
)
```

### Example Scripts

Run the example script to see different animation options:

```bash
python example_usage.py
```

This provides three pre-configured examples:
1. **Florida Trip**: Short 3-city animation
2. **Southeast Tour**: Medium 11-city tour
3. **Full USA Spiritual Tour**: Complete 50+ city cross-country journey

## Customization

### Animation Parameters

- **steps_per_segment**: Higher values = smoother animation but larger file size
- **fps**: Higher values = faster playback
- **Map style**: Modify the `create_base_map()` method to change map tiles

### City Format Examples

The geocoder accepts various formats:
- `"Orlando, FL"`
- `"Orlando, Florida"`
- `"Orlando, Florida, USA"`
- `"New York City, NY"`
- `"Los Angeles, California"`

### Output Customization

You can modify the script to:
- Change map colors and markers
- Add custom icons for different city types
- Adjust map zoom levels
- Add text overlays or timestamps

## Troubleshooting

### Common Issues

1. **Geocoding Failures**: Some city names might not be found. Try different formats or add state/country.

2. **Chrome Driver Issues**: Make sure ChromeDriver is installed and accessible:
   ```bash
   which chromedriver
   chromedriver --version
   ```

3. **Memory Issues**: For very long routes, reduce `steps_per_segment` or process in smaller chunks.

4. **Slow Performance**: Reduce image resolution or frame count for faster processing.

### Debug Mode

Add logging to see what's happening:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Examples Based on Your Timeline

The `example_usage.py` includes a complete animation based on your spiritual tech timeline, covering all 50 states plus DC. This creates a comprehensive visualization of your year-long journey across America.

## File Structure

```
map/
├── travel_animator.py      # Main animation script
├── example_usage.py        # Example usage scripts
├── requirements.txt        # Python dependencies
├── README.md              # This file
└── output/                # Generated files (created automatically)
```

## Contributing

Feel free to enhance the script with additional features:
- Different map styles
- Route optimization
- Time-based animations
- Weather data integration
- Photo overlays at each location

## License

This tool is part of your world project and follows the same license terms.

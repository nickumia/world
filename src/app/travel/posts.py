"""
Automatic post generator for travel blog posts.

This module automatically loads all HTML files from its directory and creates
post variables with metadata. The naming convention for posts is:
- <name>.html: The post content
- <name>_meta.py: Optional metadata file (title, posted_time, etc.)
"""
import os
import glob
import importlib.util

# Get the directory of the current file
filepath = os.path.dirname(os.path.realpath(__file__))

# Dictionary to store all posts
posts = {}

def process_html_file(html_file):
    # Skip files that end with _meta.html
    if html_file.endswith('_meta.html'):
        return

    # Get the base filename without extension
    base_name = os.path.splitext(os.path.basename(html_file))[0]

    # Read the HTML content
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Default metadata - use filename as title by default
    metadata = {
        'title': base_name.replace('_', ' ').title(),
        'posted_time': 'Date not specified',
        'body': content
    }

    # Try to load metadata from a corresponding _meta.py file in the same directory
    meta_file = os.path.join(os.path.dirname(html_file), f"{base_name}_meta.py")
    if os.path.exists(meta_file):
        try:
            spec = importlib.util.spec_from_file_location(
                f"{base_name}_meta", meta_file
            )
            meta_module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(meta_module)

            # Update metadata with values from the meta file
            for key, value in vars(meta_module).items():
                if not key.startswith('_'):
                    metadata[key] = value
        except Exception as e:
            print(f"Warning: Could not load metadata from {meta_file}: {e}")

    # Create a post variable with the base_name
    globals()[base_name] = metadata
    posts[base_name] = metadata

# Process files in the current directory
for html_file in glob.glob(os.path.join(filepath, '*.html')):
    process_html_file(html_file)

# Process files in the spiritualtech subdirectory
spiritualtech_dir = os.path.join(filepath, 'spiritualtech')
if os.path.exists(spiritualtech_dir):
    for html_file in glob.glob(os.path.join(spiritualtech_dir, '*.html')):
        process_html_file(html_file)

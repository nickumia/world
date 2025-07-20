# Travel Animator Docker Container
# This container includes all dependencies needed to run the travel animation generator
# including Chrome for headless screenshot generation

FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DISPLAY=:99
ENV CHROME_BIN=/usr/bin/google-chrome
ENV CHROMEDRIVER_PATH=/usr/bin/chromedriver

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    curl \
    xvfb \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install ChromeDriver using Chrome for Testing API
RUN CHROME_VERSION=$(google-chrome --version | cut -d " " -f3) \
    && echo "Chrome version: $CHROME_VERSION" \
    && CHROMEDRIVER_VERSION=$(curl -s "https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_STABLE") \
    && echo "ChromeDriver version: $CHROMEDRIVER_VERSION" \
    && wget -O /tmp/chromedriver.zip "https://storage.googleapis.com/chrome-for-testing-public/${CHROMEDRIVER_VERSION}/linux64/chromedriver-linux64.zip" \
    && unzip /tmp/chromedriver.zip -d /tmp/ \
    && mv /tmp/chromedriver-linux64/chromedriver /usr/bin/chromedriver \
    && chmod +x /usr/bin/chromedriver \
    && rm -rf /tmp/chromedriver.zip /tmp/chromedriver-linux64

# Set working directory
WORKDIR /app

# Copy requirements first for better Docker layer caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY travel_animator.py .
COPY example_usage.py .
COPY README.md .
COPY start.sh .

# Create output directory
RUN mkdir -p /app/output

# Make start script executable
RUN chmod +x /app/start.sh

# Set the entrypoint
ENTRYPOINT ["/app/start.sh"]

# Default command
CMD ["python", "travel_animator.py", "--help"]

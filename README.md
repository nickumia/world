[![codecov](https://codecov.io/gh/nickumia/nlp-web/branch/main/graph/badge.svg?token=AS2C57SSHY)](https://codecov.io/gh/nickumia/nlp-web)
[![Tests](https://github.com/nickumia/nlp-web/actions/workflows/commit.yml/badge.svg)](https://github.com/nickumia/nlp-web/actions/workflows/commit.yml)
[![Deployment](https://github.com/nickumia/nlp-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/nickumia/nlp-web/actions/workflows/deploy.yml)

# nlp-web
Example applications for PLaN Framework

Live Test Site: https://kamutiv.com

Backup Site: https://offline.kamutiv.com/

## Intro

The Processing Language in a Natural way (PLaN) Framwork is an abstraction of how to approach NLP problems
and isolate the various aspects that influence the success of an NLP application.  More info can be found at
https://nlp.kamutiv.com/.

## Installation / Dev Environment

All of the source code can be found within the `/src` folder.
  - The main NLP app is wrapped in a Flask app to be served in a sandboxed, reproducible way with `docker`.
  - The front-end is developed with React to improve server load and UI/UX.
  - Pytests are written to test backend functionality (`/src/tests`).
  - Cypress tests are written to test front-end functionality (`/e2e`).

To build the front-end, run:

  ```
  # sudo apt install nodejs npm
  make install-front  # Install npm dependencies
  make build-front    # Builds and bundles front-end into /src/app/static/js/bundle.js
  ```

There are two images that can be built from the Dockerfile, `nlp-web:latest` and `nlp-web:debug`.  The `latest`
tag denotes the more production-ready version of the web app.  The `debug` tag represents the dev test image
equipped with pytest dependencies.  To build either image, run:

  ```
  make build        # Build 'latest'
  make build-test   # Build 'debug'
  ```

To start the application at http://localhost:8000, run:

  ```
  make up
  ```

To stop and remove the application, run:

  ```
  make clean
  ```

To run tests, run:

  ```
  make test         # Run pytests
  make test-front   # Run cypress tests
  ```


## Static Page Generation

1. Create html file in `src/app/<kumia/nlp/travel>` with normal html content.
1. Create metadata file in `src/app/<kumia/nlp/travel>` with the following format:
```python
# Metadata for the spiritual post
title = "ॐ Spiritual Resources ॐ"
posted_time = "February 14th, 2024"
```

1. Add page to the `static.sh` script.
1. Run `./static.sh` to generate static pages.
1. The static pages will be generated in `static/src/offline`.
1. Copy the static pages to the S3 bucket using `./static_upload.sh`.

## Useful Resources

- [Material UI Colors](https://materialui.co/colors/)
- [Material UI Icons](https://mui.com/components/material-icons/)
- [Material UI Components](https://mui.com/components/)

## AWS Resources

- [Instance Pricing](https://aws.amazon.com/ec2/pricing/on-demand/)
- [Instance Types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html)

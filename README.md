[![codecov](https://codecov.io/gh/nickumia/nlp-web/branch/main/graph/badge.svg?token=AS2C57SSHY)](https://codecov.io/gh/nickumia/nlp-web)
![Tests](https://github.com/nickumia/nlp-web/actions/workflows/commit.yml/badge.svg)

# nlp-web
Example applications for PLaN Framework

## Intro

The Processing Language in a Natural way (PLaN) Framwork is an abstraction of how to approach NLP problems 
and isolate the various aspects that influence the success of an NLP application.  More info can be found at
https://nlp.kamutiv.com/.

## Installation / Dev Environment

All of the source code can be found within the `/src` folder.  The main NLP app is wrapped in a Flask app to
be served in a sandboxed, reproducible way with `docker`.  The front-end is developed with React to improve
server load and UI/UX.

To build the front-end, run:

  ```make build-front```

To build the test image, run:

  ```make build```
  
To start the application, run:

  ```make up```
  
To stop and remove the application, run:

  ```make clean```
  
  
  
## Useful Resources

- [Material UI Colors](https://materialui.co/colors/)
- [Material UI Icons](https://mui.com/components/material-icons/)

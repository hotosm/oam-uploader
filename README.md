# Oam uploader

Oam uploader

## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- [Node and npm](http://nodejs.org/)
- Gulp ( $ npm install -g gulp )

After these basic requirements are met, run the following commands in the website's folder:
```
$ npm install
```

### Getting started

```
$ gulp collecticons
$ gulp serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.
NOTE: To save time collecticons are not compiled by the serve command.

### Other commands
Compile the sass files, javascript, collecticons... Use this instead of ```gulp serve``` if you don't want to watch.
```
$ gulp
```
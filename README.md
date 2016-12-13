<h1 align="center">Uploader Form</h1>

<div align="center">
  <h3>
  <a href="https://docs.openaerialmap.org/uploader/getting-started">Ecosystem</a>
  <span> | </span>
  <a href="https://github.com/hotosm/oam-uploader-api">Uploader API</a>
  <span> | </span>
  <a href="https://github.com/hotosm/oam-uploader-admin">Token Manager</a>
  </h3>
</div>

The Uploader Interface allows users to upload imagery to be processed and catalogged by the [OpenAerialMap Catalog](https://docs.openaerialmap.org/catalog/) through a form. This web application requires the [Uploader API](https://github.com/hotosm/oam-uploader-api) to be running, and requires a token issued by the [Token Manager](https://github.com/hotosm/oam-uploader-admin). Before proceeding, we suggest you read the ecosystem docs.

## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- [Node](http://nodejs.org/) v4 (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))
- Gulp (`$ npm install -g gulp`)

After these basic requirements are met, run the following commands in the website's folder:

```
$ npm install
```

### Getting started

#### Environment variables
You have to set the location of the Uploader API before starting the web application. 
In `app/assets/scripts/config/local.js` set the location of the API and port. For example:

``` 
module.exports = {
  OAMUploaderApi: 'http://localhost:4000'
};
``` 

#### Starting the app

```
$ gulp collecticons
$ gulp serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.
NOTE: To save time collecticons are not compiled by the serve command.

### Other commands

Compile the sass files, javascript, collecticons... Use this instead of `gulp serve` if you don't want to launch the live reloader.

```
$ gulp
```

## License
Oam Uploader is licensed under **BSD 3-Clause License**, see the [LICENSE](LICENSE) file for more details.

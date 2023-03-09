# Podcaster React JS

This is a single-page application (SPA) built with React JS that allows you to play podcasts.

## Installation

To get started, you need to clone the repository and install the dependencies using npm or yarn:

```
git clone https://github.com/martinezcasabuena/podcaster-react-js.git
cd inditex-technical-test
yarn install
```

## Usage

This application has two modes of execution: `development` and `production`. To run the application in `development` mode, use the following command:

```
yarn start
```

This will start the development server and you can access the application in your browser at `http://localhost:8080`.

To build the application for production, use the following command:

```
yarn build
```

This will create a production-ready build in the `dist` directory. To test the production build, you can run a local server using the `serve` package:

```
yarn global add serve
serve -s dist
```

This will start a small server and you can access the application in your browser at `http://localhost:3000`.

## Additional Information

The application uses a CORS proxy to be able to fetch data. The proxy provider is: https://cors-anywhere.herokuapp.com/.

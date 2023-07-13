<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kensonjohnson/carpooly">
    <img src="docs/TearDropDark.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Carpooly App</h3>

  <p align="center">
    <br />
    <!-- <a href="https://github.com/kensonjohnson/carpooly">View Demo</a>
    · -->
    <a href="https://github.com/kensonjohnson/carpooly/issues">Report Bug</a>
    ·
    <a href="https://github.com/kensonjohnson/carpooly/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#about-us">About Us</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

We are a small group of self taught developers

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With:

![html]
![css]
![javascript]
![typescript]
![vite]
![react]
![mongodb]
![express]
![passport]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

&nbsp;

## Installation

&nbsp;

1. You'll need node version 18 or higher.
   Install from [the official website](https://nodejs.org/en/download "NodeJS Download Page").

2. Clone the repo: `git clone https://github.com/kensonjohnson/carpooly.git && cd carpooly`

3. Install dependencies with `npm run install`

4. In the `/apps/api` directory, copy `.env.example` and rename the copy to `.env` and fill in the required details.

5. Start the development server with `npm run dev`

&nbsp;

### Web Cont: The .env File

The .env starts off with the following:

```env
# Dev configurations
PORT=8080

# Database configuration
MONGO_CONNECT_URI="mongodb+srv://<username>:<password>@CLUSTER_NAME.XXXXXXXX.mongodb.net/DB_NAME?retryWrites=true&w=majority"
```

Replace YOUR_PORT with whatever port you want to use.
This line can be deleted.
The default port is 8080.

Replace YOUR_MONGO_URI with your MongoDB URI. This can be a local or Atlas instance.  
If you're using Mongo Atlas, you should add 0.0.0.0/0 to the allowed IP list until development is done.  
REMEMBER TO CHANGE THIS TO YOUR SERVER IP UPON DEPLOYMENT.

### Mobile Instructions

1. TBD

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## About Us

We are a small group of self taught developers expanding our skillsets!

## Contact

Project Link: [Carpooly](https://github.com/kensonjohnson/carpooly)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[html]: https://img.shields.io/badge/HTML-20232A?style=for-the-badge&logo=html5
[css]: https://img.shields.io/badge/CSS-20232A?style=for-the-badge&logo=css3
[javascript]: https://img.shields.io/badge/Javascript-20232A?style=for-the-badge&logo=javascript
[typescript]: https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=typescript
[vite]: https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[mongodb]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb
[express]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=#000000
[passport]: https://img.shields.io/badge/Passport-20232A?style=for-the-badge&logo=passport&logoColor=#34E27A

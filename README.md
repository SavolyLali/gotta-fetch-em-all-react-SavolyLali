<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Gotta Fetch 'Em All</h3>

  <p align="center">
    A React project for fetching and displaying data!
    <br />
    <a href="https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali"><strong>Explore the repo »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->

## About The Project

Welcome to **Gotta fetch() 'Em All**, a captivating Pokémon encounter game built with React, that utilizes the PokéApi
to provide an immersive experience for Pokémon enthusiasts. This project allows users to explore various Pokémon
locations, initiate encounters, and engage in battles to capture new Pokémon.

### Built With

* [![JavaScript][JavaScript-url]][JavaScript.com]
* [![React][React-url]][React.org]
* [![HTML5][HTML5-url]][HTML5.com]
* [![CSS3][CSS3-url]][CSS3.org]

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

#### Docker

Before installing the project, make sure you have Docker installed on your machine.
Docker can be downloaded and installed from the official Docker website. Here are the links to download Docker for
different operating systems:

[Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

[Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

[Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

### Installation

After downloading and installing Docker, follow these steps to install and run the project:

1. Clone the repo
   ```sh
   git clone https://github.com/SavolyLali/gotta-fetch-em-all-react-SavolyLali.git
   ```

2. Navigate to the root directory of the project(Where the Dockerfile is located)


3. Build the Docker container using (Replace <image name> with your desired name):

   ```sh
   docker build -t <image name> .
   ```

4. Run the Docker container using (Replace <image name> with the name you used in the previous step):

   ```sh
    docker run -p 8000:3000 <image name>
    ```
   
5. Open your browser and navigate to [http://localhost:8000](http://localhost:8000)

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

Oliver Pinter - [GitHub Profile](https://github.com/PinterOliver)

Lajos Daniel Savoly - [GitHub Profile](https://github.com/SavolyLali)

Daniel Toth - [GitHub Profile](https://github.com/Daniel-343)

Project
Link: [https://github.com/SavolyLali/gotta-fetch-em-all-react-SavolyLali](https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali.svg?style=for-the-badge

[contributors-url]: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali.svg?style=for-the-badge

[forks-url]: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali/network/members

[stars-shield]: https://img.shields.io/github/stars/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali.svg?style=for-the-badge

[stars-url]: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali/stargazers

[issues-shield]: https://img.shields.io/github/issues/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali.svg?style=for-the-badge

[issues-url]: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-SavolyLali/issues

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://www.linkedin.com/in/lajos-daniel-savoly/

[React-url]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white

[React.org]: https://reactjs.org/

[JavaScript-url]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black

[JavaScript.com]: https://www.javascript.com/

[HTML5-url]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white

[HTML5.com]: https://html.com/

[CSS3-url]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white

[CSS3.org]: https://www.w3.org/Style/CSS/

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<br />
<div align="center">
<h3 align="center">nine lives</h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#main-features">Main features</a></li>
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
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!--[![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Nine lives is a web application built with node.js, Express and React.js that enables users to track their cats' vet visit, symptoms and vaccination information. It also provides information on different breeds. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Main features

* **User  Authentication**: Secure user authentication allows users to sign up and log in to their accounts, ensuring their cats' health data remains confidential.
* **User Profile Management**: Users are able to edit their profile and login information as well as delete their accounts. 
* **Cat Profile Creation**: Users can create individual profiles for each of their cats, including details such as name, breed, age, favourite toy and a profile picture.
* **Vet Visit Tracking**: Record and track vet visits for each cat, including appointment dates, veterinarian information, and notes.
* **Vaccination Tracking**: Keep track of vaccination schedules and records for each cat, ensuring they receive necessary immunizations.
* **Symptom Checker**: Provide symptoms for a cat to receive possible disease diagnoses or recommendations for further action. 
* **Breed-Specific Information**: Access to breed-specific information and resources for users who own accounts, including characteristics, care tips, and common health issues for each breed.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Node.js][Node.js]][node-url]
* [![React][React.js]][React-url]
* [![Express][Express]][express-url]
* [![MongoDB][MongoDB]][mongodb-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* **Node.js**

    Download and install Node.js from the official website: https://nodejs.org/en

* **npm**

    ```sh
    npm install -g npm@latest
    ```

* MongoDB

    Install MongoDB Community Edition from the official website: https://www.mongodb.com/try/download/community


### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/azabarnahaju/nine-lives
   ```
2. Backend setup
    * Navigate to the `server` directory and install backend dependencies
        ```sh
        cd server
        npm install
        ```

    * Set up your MongoDB database locally or on a cloud service

    * Create `.env` file and add your MongoDB connection string:
        ```
        MONGO_URL = "YOUR_MONGODB_CONNECTION_STRING"
        ``` 
    
3. Frontend setup
    * Navigate to the `client` directory and install frontend dependencies
        ```sh
        cd client
        npm install
        ```

4. Start backend server:
    * Navigate to the `server` directory and start the Express server
        ```sh
        cd server
        node server.js
        ```

5. Start frontend server
    * Navigate to the `client` directory and start the React development server
        ```sh
        cd client
        npm run dev
        ```

6. Open your browser and navigate to `http://localhost:5173`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### 1. Sign up/Log in 
* As a new user, navigate to the authentication page and sign up
* If you already have an account, navigate to the authentication page and log in with your credentials

### 2. Create your cat(s)'s profile(s)
* Once you're signed in, navigate to the Cats page where you can create new profile for your cat(s) providing their name, year of birth, their favourite toy, choosing their breed and adding a photo. 

### 3. Adding vet visit and vaccination records 
* Navigate to your cat's profile where you can add a vet visit and/or vaccination records by providing the date and the diagnosis/vaccination type and optionally include additional notes.  

### 4. Check symptoms
* Navigate to your cat's profile and by adding a new symptom record provide symptoms to receive possible diagnoses. You can save them to your cat's profile. 

    `IMPORTANT! THE SYMPTOM CHECKER FUNCTIONALITY DOES NOT REPLACE A VISIT TO THE VET AND ONLY SERVES AS A GUIDANCE. FOR A RELIABLE DIAGNOSIS VISIT YOUR LOCAL VET OFFICE.`

### 5. Learn about different breeds
* Navigate to the `Breeds` page to browse through different breeds and learn about them more. 


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Alexandra Kanik - [Linkedin](https://www.linkedin.com/in/alexandrakanik/) - kanikalexandra@gmail.com

Project Link: [https://github.com/azabarnahaju/nine-lives](https://github.com/azabarnahaju/nine-lives)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[forks-shield]: https://img.shields.io/github/forks/azabarnahaju/nine-lives.svg?style=for-the-badge
[forks-url]: https://github.com/azabarnahaju/nine-lives/network/members
[stars-shield]: https://img.shields.io/github/stars/azabarnahaju/nine-lives.svg?style=for-the-badge
[stars-url]: https://github.com/azabarnahaju/nine-lives/stargazers
[issues-shield]: https://img.shields.io/github/issues/azabarnahaju/nine-lives.svg?style=for-the-badge
[issues-url]: https://github.com/azabarnahaju/nine-lives/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexandrakanik
[product-screenshot]: images/screenshot.png
[Node.js]: https://img.shields.io/badge/Node.js-white?style=for-the-badge&logo=nodedotjs&logoColor=339933
[Node-url]: https://nodejs.org/en
[Express]: https://img.shields.io/badge/Express-0185FF?style=for-the-badge&logo=express&logoColor=black
[express-url]: https://expressjs.com
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[MongoDB]: https://img.shields.io/badge/MongoDB-011e2c?style=for-the-badge&logo=mongodb&logoColor=47A248
[mongodb-url]: https://www.mongodb.com
[Docker]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com 
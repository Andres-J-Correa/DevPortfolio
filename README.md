# Coding Portfolio

Welcome! This web application contains all my projects, currently hosting an Interview Practice App, designed to help users practice interview questions based on their chosen topic: React, .NET, or SQL. The app features a chat bot-like UI, providing an engaging and interactive experience for interview preparation.

## Preview

<div align="center">
<a href="https://andres-j-correa.github.io/DevPortfolio">

<img height="300" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3RvMmJ4czVna2hzbjRkMDdhbXlkdTFpOXFvdzFmMTFxaXBzbXY2ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cQPHTkhRtcmFswwly0/giphy.gif">
</a>
</div>

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [About Me](#about-me)
- [Contact](#contact)
- [License](#license)

## Features

- **Interactive Chat Bot UI**: A user-friendly interface that simulates an interview environment, enhancing the preparation experience.
- **Dynamic Topic Selection**: Users can choose from three main topics: React, .NET, or SQL, catering to their specific needs.
- **AI-Powered Responses**: Leverages Replicate.com API for generating intelligent and context-aware responses using AI language models.
- **In-Memory Database**: Efficiently manages questions and answers during the session, ensuring a smooth user experience.

## Installation

To get started with the project, follow these steps:

### Prerequisites

- Node.js (v18 or higher)
- .NET SDK (v8 or higher)
- Git

### Client Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Andres-J-Correa/DevPortfolio
   ```
2. Navigate to the client directory:
   ```sh
   cd client
   ```
3. Install dependencies:
   ```sh
   yarn install
   ```

### Server Setup

1. Navigate to the server directory:
   ```sh
   cd ../server
   ```
2. Restore .NET dependencies:
   ```sh
   dotnet restore
   ```
3. Go get a [Replicate](https://replicate.com/) Api key.

## Usage

### Running the Client

1. Start the client:
   ```sh
   yarn start
   ```
2. Open your browser and go to `http://localhost:3000`.

### Running the Server

1. Start the server:
   ```sh
   dotnet run
   ```
2. The server will be running on `https://localhost:7091`.

## Technologies Used

- **Client**:

  - React
  - JavaScript

- **Server**:
  - ASP.NET Core Web API
  - In-Memory Database
  - Replicate.com API for AI text generation.

## About Me

I am a Full Stack Software Engineer and Instructor at Sabio School of Software Engineering with extensive experience in building comprehensive modules for React.js, JavaScript, .NET, C#, SQL, and Python. I am adept at integrating AI functionalities into web applications, optimizing database performance, and crafting user-friendly interfaces.

### Notable Projects and Contributions

- **AI-Driven Technical Interview Tool**: Engineered an AI application to conduct technical interviews with real-time feedback, transforming the learning experience for students.
- **Question Quality Assessment Tool**: Integrated sophisticated AI tools to assess and validate student-submitted questions, significantly improving question quality and reducing instructor workload.
- **Social Media Content Generator**: Developed advanced prompts to generate social media content from videos, leading to increased customer engagement.

### Coding Time

[![wakatime](https://wakatime.com/badge/user/b7c5c2d6-968c-47f7-89ed-42fd86301a12.svg)](https://wakatime.com/@b7c5c2d6-968c-47f7-89ed-42fd86301a12)

![WakaTime Stats](https://wakatime.com/share/@Andres_Correa/df175bdb-d67e-4a73-b859-cd60e8ffe030.svg)

## Contact

Feel free to reach out to me for any queries or collaboration opportunities:

- Email: andresj.correas@gmail.com
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/andres-correa-7aa819244/)
- GitHub: [Your GitHub Profile](https://github.com/Andres-J-Correa)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

This project was created using [rjshkhr's cleanfolio](https://github.com/rjshkhr/cleanfolio) as template.

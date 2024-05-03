<p align="center">
  <img src="assets/SFX.png" alt="Logo" width="200" height="200">
</p>

# SmartFOX® Home Systems

## Executive Summary

The SmartFOX® Home Systems project aims to redefine the home living experience by introducing advanced smart home systems that offer unparalleled control and efficiency. This web application provides users with a comprehensive solution for managing and optimizing smart home devices, integrating various aspects of home automation such as climate control, security, lighting, and energy management. SmartFOX endeavors to enhance comfort, security, and energy efficiency for its users through a user-friendly interface that allows for easy setup, monitoring, and control of smart devices from anywhere, at any time.

## Business Case

In today's rapidly evolving world, there is a growing demand for smart home technology as homeowners seek to enhance their living experience, improve home security, and reduce energy consumption. The SmartFOX project addresses these needs by providing a centralized platform for managing all aspects of home automation. By simplifying device control, offering personalized insights, and addressing common pain points such as complex device management and security concerns, SmartFOX delivers tangible benefits to users, including increased convenience, improved safety, and cost savings on energy bills.

## Goals

The SmartFOX project is committed to delivering a seamless and intuitive smart home experience. Our key goals include:

1. **Enhance User Experience**: Achieve a user satisfaction rating of 90% within the first year by offering an intuitive interface and personalized features.
2. **Market Penetration**: Gain a 5% market share in the smart home industry within two years by leveraging cutting-edge technology and superior user experience.
3. **Security and Privacy**: Ensure 99.99% data security and privacy compliance to establish trust and reliability among users.
4. **Integration and Compatibility**: Achieve compatibility with 95% of existing smart home devices within 18 months, making SmartFOX the go-to platform for smart home management.
5. **Energy Efficiency**: Help users achieve an average of 20% reduction in energy consumption through intelligent insights and automation features within the first year of use.

## Key Features

SmartFOX will distinguish itself in the smart home market with the following features:

- **Comprehensive Device Management**: Easily add, configure, and control a wide range of smart home devices from a single dashboard.
- **Intelligent Climate Control**: Optimize heating and cooling settings for comfort and energy efficiency using advanced algorithms.
- **Enhanced Security Features**: Integrated security systems provide real-time alerts and remote monitoring capabilities through surveillance cameras and motion sensors.
- **Efficient Lighting and Energy Management**: Control lighting settings and monitor energy usage, receiving recommendations for reducing consumption.
- **Personalized User Experience**: Learn from user preferences and routines to offer customized control settings and device recommendations.
- **Robust Integration and Compatibility**: Support a broad spectrum of devices and standards to ensure seamless integration with existing smart home ecosystems.

## User Stories

### Welcome Page

As a user, I want to see the homepage with the SmartFOX logo to feel welcomed.

### Login-Sign Up Forms

As a user, I want to use login and sign-up forms on the right sidebar for easy access.

### Subscriber Login

As a subscriber user, I want intuitive username/email and password fields for easy login.

### Forgot Password Link

As a user, I want a "Forgot Password" feature to recover my account easily.

### Successful Login

As a user, I want the login button to securely authenticate and redirect me to my dashboard.

### Join smartFOX System Link

As a new user bought smartFOX system, I want to easily sign up to join SmartFOX Home App.

### Personal Information Form

As a user, I want to provide my personal information during registration to create my account.

### Home Information Form

As a user, I want to enter information about my home to tailor the smartFOX system to my living space.

### Login Information Form

As a user, I want to set up my login credentials to securely access the smartFOX system.

### Security Question and Answer Fields

As a user, I want to set a security question and answer during registration to enhance the security of my account.

### Terms of Use and Email Notifications Agreement

As a user, I want to review and agree to the Terms of Use and opt-in for email notifications during registration to stay informed about smartFOX updates and services.

### Dashboard Overview and Profile Management

As a user, I want to access an overview of my dashboard and manage my profile easily.

### Navigation Bar Links and Buttons

As a user, I want to navigate through the smartFOX app easily using the navigation bar.

### Home Management Control Panel

As a user, I want a control panel on my dashboard to manage my smart home devices and settings.

### Device Addition Button Functionality

As a user, I want to easily add new devices to my smart home system through the Dashboard.

### Climate Control UI and Backend Integration

As a user, I want to control the climate within my home through the smartFOX dashboard for a comfortable living environment.

### Security and Surveillance System Integration

As a user, I want to integrate security and surveillance systems into my smartFOX dashboard to ensure the safety of my home.

### Lighting and Modules Control Options

As a user, I want to control lighting and modules within my home through the smartFOX dashboard for enhanced ambiance and energy efficiency.

### Integration of Additional Features

As a user, I want to utilize additional smart home features like geofencing, blinds, and groups through the smartFOX dashboard to enhance my living experience.

### Multilingual Support Integration

As a global user, I want to access the smartFOX dashboard in my preferred language for a personalized experience.

### Footer Area Links for Policies and Support

As a user, I want to easily access privacy policies, terms of use, and support options from the smartFOX dashboard footer for transparency and assistance.

### Access Rights Management for Homeowners, Residents, and Guests

As a homeowner, I want to manage access rights for residents and guests in my smartFOX home to ensure security and privacy.

### User Permissions for Home System Management

As a homeowner, I want to set up user permissions for managing home systems in the smartFOX dashboard to control access and functionality.

## Technical Requirements

1. **Full Stack Development:**

   - Utilizes JavaScript-based technologies for both server-side (Node.js) and client-side (React.js) development.

2. **Database Management:**

   - Implements a reliable database system (MySQL or MongoDB) for secure storage of user data and system information.

3. **API Development:**

   - Develops RESTful APIs using Express.js to facilitate communication between the client application and server for device control and data exchange.

4. **Security:**

   - Implements JWT-based authentication and role-based access control.

5. **Frontend Development:**

   - Utilizes React.js framework for building a responsive and user-friendly interface for the SmartFOX® Home web application.

6. **Real-time Communication:**

   - Integrates WebSockets or similar technologies for real-time communication between the server and client, enabling instant updates and notifications.

7. **Device Integration and Control:**

   - Establishes protocols and interfaces for integrating with various smart home devices and platforms, ensuring compatibility and seamless control.

8. **Scalability and Performance:**

   - Designs the system architecture to be scalable and able to handle a large number of concurrent users and devices, optimizing performance and responsiveness.

9. **Deployment and Hosting:**

   - Deploys the SmartFOX® System on a reliable and scalable hosting platform (e.g., AWS, Azure) with proper configuration for security and performance.

10. **Documentation and Testing:**
    - Provides comprehensive documentation for developers and users, including API documentation, user guides, and troubleshooting resources. Conducts thorough testing (unit tests, integration tests, etc.) to ensure the reliability and functionality of the system.

## Setup and Deployment

The SmartFOX® Home Systems project aims to revolutionize the way individuals interact with their home environments through advanced smart home systems. This web application provides a comprehensive solution for managing and optimizing smart home devices, offering users unparalleled control and efficiency in their daily lives. Below, you'll find detailed instructions on how to set up and utilize the application locally , along with instructions for connecting to a local MySQL database using Docker.

### Prerequisites

- Node.js and npm installed.
- MySQL database setup.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/josephfox-ch/School-Management-System-REST-API.git

```

2. Install dependencies:

Ensure you have Node.js installed on your machine. Then, navigate to the project directory in your terminal and run the following command to install the dependencies:

```bash

npm install

```

### Server Configuration:

After cloning the repository and installing dependencies, navigate to the server directory and configure the `.env` file specific to the server environment.

### Client Configuration:

Similarly, after cloning the repository and installing dependencies, navigate to the client directory and configure the `.env` file specific to the client environment.

**Configure `.env` files based on `env.example.json` provided. You need three `.env` files**

## Running Locally

To run the application locally, you'll need to follow these steps:

1. Set Up Database with Docker Compose:
   If you want to connect the application to a local MySQL database, you can use Docker Compose to set it up easily. First, ensure you have Docker installed on your machine. Then, create a `docker-compose.yaml` file with the following content:

```bash
version: '3.9'

services:
  mysql-db:
    container_name: mysql-smartfox-dev
    image: mysql
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_PASSWORD=${DB_PASS}
      - MYSQL_USER=${DB_USER}
      - MYSQL_DATABASE=foxdrive
    volumes:
      - ./mysqlDB:/var/lib/mysql
    restart: always

  phpmyadmin-db:
    image: phpmyadmin/phpmyadmin
    container_name: pma-smartfox-dev
    depends_on:
      - mysql-db
    environment:
      - PMA_HOST=mysql-db
    ports:
      - "8080:80"
    restart: always



```

This Docker Compose configuration sets up a MySQL container and a phpMyAdmin container for managing the database.

2. Start the Database Containers:

Run the following command in the directory where the `docker-compose.yaml` file is located:

```bash
docker-compose up -d
```

This command will start the MySQL and phpMyAdmin containers in detached mode, allowing them to run in the background.

3. Start the Server:

After setting up the database, start the application by running the following command:

```bash
npm start

```

This command will start the application and establish a connection to the database. 

```javascript
const PORT = process.env.EXPRESS_PORT || 3000;

connectDB().then(async ()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port.`);
  });
}).catch((error)=>{
  console.log('Database Connection Error ' + error.message);
  process.exit(1);
})
```

4. Start the client:

After setting up the database, start the application by running the following command:

```bash
npm run dev

```

To build application locally :

```bash
npm run build

```

4. Access the Application
   
   Once both the server and client are running, you can access the SmartFOX® Home Systems application by navigating to [Localhost](http://localhost:5173) in your web browser.

   With these configurations and steps, you'll have the SmartFOX® Home Systems application up and running locally, ready for development and testing.

**Notes:**

- Make sure you have your database credentials properly configured in the .env file.
- Ensure that the MySQL service is running on port 3306, and phpMyAdmin is accessible on port 8080 as configured in the `docker-compose.yaml` file.

After making these changes, you should be able to run the application locally with a local MySQL database using Docker Compose using the npm start command.


## Conclusion

The SmartFOX application is poised to set a new standard in smart home management by focusing on user experience, security, and energy efficiency. With our commitment to innovation and strategic goals, SmartFOX is positioned to achieve significant impact and growth in the evolving landscape of home automation.

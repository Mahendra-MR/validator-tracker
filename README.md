Ethereum Validator Tracker

Description:
        Ethereum Validator Tracker is a React-based web application that provides detailed statistics on Ethereum validators using the beaconcha.in API. The app features a responsive design, interactive sidebar, and a Top Validators component listing the top ten validators based on balance.


Table of Contents:
        Installation
        Usage
        Features
        API Reference
        Contributing

    Installation
        To set up the project locally, follow these steps:

           Clone the repository:
              git clone https://github.com/Mahendra-MR/validator-tracker.git

           Navigate to the project directory:
              cd validator-tracker

           Install the dependencies:
              npm install

    Usage   
        To start the project, run:
             npm start
           
        Open your browser and navigate to http://localhost:3000 to see the app in action.

    Features
        Detailed Validator Statistics: View detailed information on Ethereum validators, including validator index, balance, and performance metrics.
        Top Validators: A component that lists the top ten validators based on balance.
        Responsive Design: The app is optimized for various screen sizes and devices.
        Interactive Sidebar: An easy-to-navigate sidebar for quick access to different sections.

    API Reference
        Beaconcha.in API Integration
        The app uses the beaconcha.in API to fetch Ethereum validator data.

        Endpoint: https://beaconcha.in/api/v1/validator/{validator_index}  //for validator-tracker  
        Endpoint: 'https://beaconcha.in/api/v1/validator/leaderboard'      //for Top-validator

    Contributing
        Contributions are welcome! Please open an issue or submit a pull request with any changes.
 
        Fork the repository.
        Create a new branch: git checkout -b feature/your-feature-name
        Make your changes and commit them: git commit -m 'Add new feature'
        Push to the branch: git push origin feature/your-feature-name
        Open a pull request.    

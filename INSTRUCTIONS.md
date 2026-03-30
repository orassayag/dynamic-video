# Instructions

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download the project:
   ```bash
   git clone https://github.com/orassayag/dynamic-video.git
   cd dynamic-video
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Configuration

### Server Configuration

1. Open `server/config/env.json`
2. Configure the following settings:
   ```json
   {
     "server": {
       "port": "8080",
       "env": "local"
     }
   }
   ```

3. (Optional) Update API credentials in `server/src/config/constants.config.js`:
   - Update `DATA.BASE_URL` if using a different API endpoint
   - Update `DATA.AUTH` with your Idomoo API credentials

### Client Configuration

1. Open `client/src/config/constants.config.js`
2. Configure the server API URL:
   ```javascript
   SERVER: {
     BASE_URL: 'http://localhost:8080/api',
   }
   ```

3. Update the storyboard ID in `client/src/components/pages/Storyboard/Storyboard.jsx` if needed:
   ```javascript
   const storyboardId = 31193; // Your storyboard ID
   ```

## Running the Application

### Start the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The server will start on `http://localhost:8080`
4. Access Swagger API documentation at `http://localhost:8080/api-docs`

### Start the Client

1. Navigate to the client directory (in a new terminal):
   ```bash
   cd client
   ```

2. Start the development client:
   ```bash
   npm run dev
   ```

3. The client will start on `http://localhost:3000`
4. Your browser should automatically open to the application

## Using the Application

### Generating a Video

1. The application loads the storyboard template automatically
2. Fill in all required fields:
   - First name and last name
   - Email address
   - Any additional text fields from the storyboard template
3. Customize video settings:
   - **Background Image**: Upload a custom background
   - **Color**: Select a color using the color picker
   - **Format**: Choose video format (HLS, MP4, or GIF)
   - **Resolution**: Select resolution (1280x1280, 1920x1080, or 2560x1440)
   - **Quality**: Choose quality level (Best, Better, or Good)
4. Click the "Generate" button
5. Wait for the video to be generated (progress bar will show status)
6. Once complete, the video will play automatically

### API Endpoints

The server exposes the following endpoints:

#### GET `/api/storyboards/:id`
Fetches a storyboard template by ID.

**Parameters:**
- `id` (path parameter): Storyboard ID

**Response:**
```json
[
  {
    "key": "field_key",
    "label": "Field Label",
    "value": "",
    "isData": true
  }
]
```

#### POST `/api/storyboards`
Generates a video from storyboard data.

**Request Body:**
```json
[
  {
    "key": "field_key",
    "value": "field_value",
    "isData": true
  }
]
```

**Response:**
```json
{
  "checkStatusURL": "https://...",
  "videoURL": "https://..."
}
```

## Development

### Server Development

```bash
cd server
npm run dev        # Start development server with nodemon
npm run test       # Run tests
npm run dev-test   # Run tests in development mode
```

### Client Development

```bash
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Check for linting errors
```

## File Structure

### Server Structure

```
server/
├── src/
│   ├── bin/              # Server startup
│   ├── config/           # Configuration constants
│   ├── controllers/      # Route controllers
│   ├── custom/           # Custom classes (errors, events)
│   ├── helpers/          # Express helpers
│   ├── middlewares/      # Express middleware
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── services/         # Services (logging, swagger)
│   ├── utils/            # Utility functions
│   └── validations/      # Request validation schemas
├── config/               # Environment configuration
└── app.js                # Express app setup
```

### Client Structure

```
client/
├── src/
│   ├── components/
│   │   ├── common/       # Reusable components
│   │   └── pages/        # Page-specific components
│   ├── config/           # Configuration constants
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Next.js pages
│   └── utils/            # Utility functions
└── public/               # Static assets
```

## Troubleshooting

### Server Issues

- **Port already in use**: Change the port in `server/config/env.json`
- **API authentication errors**: Verify credentials in `server/src/config/constants.config.js`
- **CORS errors**: Check CORS configuration in `server/src/app.js`

### Client Issues

- **Cannot connect to server**: Ensure server is running and URL is correct in client config
- **Build errors**: Delete `node_modules` and `.next`, then reinstall dependencies
- **Styling issues**: Clear browser cache and rebuild the client

### Common Issues

- **Fields validation errors**: Ensure all required fields are filled before generating
- **Video generation timeout**: Check network connection and API status
- **Slow video generation**: Large resolutions and best quality take longer to process

## Notes

- The application requires an internet connection to access the Idomoo API
- Video generation may take several minutes depending on settings
- Keep your API credentials secure and never commit them to version control
- For production deployment, update CORS settings and use environment variables

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

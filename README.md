# SBAB - Kodtest

## Getting Started

### Create an .env file

Create a new file and name it .env in sbab-kodtest, the same place as this README.md file.

Copy this into the file:

```bash
API_URL=https://api.sl.se/api2/LineData.json
API_KEY=USE_YOUR_OWN_KEY_HERE
API_LIVE=true
```

Replace the USE_YOUR_OWN_KEY_HERE with a key from https://developer.trafiklab.se/

You can also set API_LIVE to false, then it will use downloaded files and you don't need a key.

### Install the packages

```bash
npm install
```

### Run the development server:

```bash
npm run dev
```

### View the site

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

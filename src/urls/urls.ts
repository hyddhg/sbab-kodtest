// API Documentation:
// https://www.trafiklab.se/api/trafiklab-apis/sl/stops-and-lines-2/

const baseURL = process.env.API_URL;

const Urls = {
  stops: {
    get: `${baseURL}?model=StopPoint&DefaultTransportModeCode=BUS&key=${process.env.API_KEY}`,
  },
  lineStops: {
    get: `${baseURL}?model=JourneyPatternPointOnLine&DefaultTransportModeCode=BUS&key=${process.env.API_KEY}`,
  },
};

export default Urls;

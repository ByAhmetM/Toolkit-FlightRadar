export const options = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/flights/list-in-boundary",
  params: {
    bl_lat: "34.596201",
    bl_lng: "25.826312",
    tr_lat: "43.693244",
    tr_lng: "44.822849",
    limit: "300",
  },
  headers: {
    "X-RapidAPI-Key": "df04d70410msh904fd0a2269d085p1e8076jsn31eb30dc63c8",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

export const options2 = {
  headers: {
    "X-RapidAPI-Key": "df04d70410msh904fd0a2269d085p1e8076jsn31eb30dc63c8",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

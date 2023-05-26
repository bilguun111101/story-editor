import axios from "axios";

const fetcher = async (url: string) => {
  // const options = {
  //   method: "GET",
  //   url,
  //   params: {
  //     q: "<REQUIRED>",
  //     type: "multi",
  //     offset: "0",
  //     limit: "10",
  //     numberOfTopResults: "5",
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "11e2df8f24mshb3910dea1fc6637p1fb135jsnfabf3efc268a",
  //     "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  //   },
  // };
  // const options = {
  //   method: "GET",
  //   url: "https://deezerdevs-deezer.p.rapidapi.com/infos",
  //   headers: {
  //     "X-RapidAPI-Key": "11e2df8f24mshb3910dea1fc6637p1fb135jsnfabf3efc268a",
  //     "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  //   },
  // };
  const options = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/playlist/%7Bid%7D",
    headers: {
      "X-RapidAPI-Key": "11e2df8f24mshb3910dea1fc6637p1fb135jsnfabf3efc268a",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data;
};

export default fetcher;

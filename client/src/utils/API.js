import axios from "axios";

export default {
    getPerformances: function() {
        return axios.get("http://localhost:3001/api/performances");
    },
    postPerformance: function(performanceData) {
        console.log(performanceData);
        return axios.post("http://localhost:3001/api/performances", performanceData);
    },
    postArtist: function(artists) {
        return axios.post("http://localhost:3001/api/artists", artists);
    }
}


// saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }

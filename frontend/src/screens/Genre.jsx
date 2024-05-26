import React, { useState, useEffect } from "react";
import Stories from "../components/Stories";
import axios from "axios";

const Genre = () => {
  const [completedStories, setCompletedStories] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchCompletedStories();
  }, []);

  const fetchCompletedStories = async () => {
    try {
      const { data } = await axios.get(`/api/story?`);
      console.log(data.storys);
      setCompletedStories(data.storys);
      setFilteredCompleted(data.storys); // Initially set filtered stories to all completed stories

      // Extract unique genres from the data
      const uniqueGenres = [
        ...new Set(data.storys.flatMap((story) => story.genre)),
      ];
      setGenres(uniqueGenres);
    } catch (error) {
      console.error("Error fetching completed stories:", error);
    }
  };

  const handleFilterByGenre = (genre) => {
    if (genre === selectedGenre) {
      setSelectedGenre(null); // Deselect the current genre
      setFilteredCompleted(completedStories); // Reset to show all stories
    } else if (genre === null) {
      setFilteredCompleted(completedStories); // Reset to show all stories
      setSelectedGenre(null); // Deselect the current genre
    } else {
      const filtered = completedStories.filter((story) =>
        story.genre.includes(genre)
      );
      setFilteredCompleted(filtered);
      setSelectedGenre(genre);
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <ul className="image-gallery">
        <div>
          <h2>Genre of Stories</h2>
          {genres.map((genre) => (
            <button
              key={genre}
              className="btn btn-light"
              style={{ marginRight: "10px", marginBottom: "10px" }}
              onClick={() => handleFilterByGenre(genre)}
            >
              {genre}
            </button>
          ))}

          <button
            className="btn btn-light"
            style={{ marginLeft: "10px", marginBottom: "10px" }}
            onClick={() => handleFilterByGenre(null)}
          >
            Default
          </button>
          <hr />
          <div className="cards">
            {filteredCompleted.map((story) => (
              <Stories key={story._id} story={story} />
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Genre;

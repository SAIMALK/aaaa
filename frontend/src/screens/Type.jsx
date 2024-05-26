import React, { useState, useEffect } from "react";
import Stories from "../components/Stories";
import axios from "axios";

const Type = () => {
  const [completedStories, setCompletedStories] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState([]);

  useEffect(() => {
    fetchCompletedStories();
  }, []);

  const fetchCompletedStories = async () => {
    try {
      const { data } = await axios.get(`/api/story?`);
      setCompletedStories(data.storys);
      setFilteredCompleted(data.storys); // Initially set filtered stories to all completed stories
    } catch (error) {
      console.error("Error fetching completed stories:", error);
    }
  };

  const handleFilterOngoing = () => {
    const filtered = completedStories.filter((story) => story.type === "Novel");
    setFilteredCompleted(filtered);
  };
  const handleFilterCompleted = () => {
    const filtered = completedStories.filter((story) => story.type === "Story");
    setFilteredCompleted(filtered);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <ul className="image-gallery">
        <div>
          <h2>Type of Stories</h2>
          <button
            className="btn btn-light"
            style={{ marginRight: "10px", marginBottom: "10px" }}
            onClick={handleFilterOngoing}
          >
            Filter Novel
          </button>
          <button
            className="btn btn-light"
            style={{ marginLeft: "90px", marginBottom: "10px" }}
            onClick={handleFilterCompleted}
          >
            Filter Stories
          </button>
          <button
            className="btn btn-light"
            style={{ marginLeft: "90px", marginBottom: "10px" }}
            onClick={(e) => setFilteredCompleted(completedStories)}
          >
            Filter Show All
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

export default Type;

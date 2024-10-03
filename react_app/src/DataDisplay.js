import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CosmosClient } from '@azure/cosmos';

const endpoint = '';
const key = '';
const databaseName = 'YouTubeDB';
const containerName = 'CommentsCollection';

const MAX_COMMENTS_LIMIT = 5; // Adjust the limit as needed

function DataDisplay() {
  const location = useLocation();
  const videoId = location.pathname.split('/').pop(); // Get video ID from URL
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const client = new CosmosClient({ endpoint, key });
        const container = client.database(databaseName).container(containerName);
        const { resources: items } = await container.items
          .query(`SELECT TOP ${MAX_COMMENTS_LIMIT} * FROM c WHERE c.VideoID = '${videoId}' ORDER BY c.Timestamp DESC`)
          .fetchAll();
        setData(items);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [videoId]);

  return (
    <div>
      {isLoading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <ul>
          {data.map((comment) => (
            <li key={comment.id}>
              <p>Username: {comment.Username}</p>
              <p>Video ID: {comment.VideoID}</p>
              <p>Comment: {comment.Comment}</p>
              <p>Like Count: {comment.LikeCount}</p>
              {/* Display other properties as needed */}
            </li>
          ))}
        </ul>
      )}
      {data.length === 0 && !isLoading && <p>No comments found.</p>}
    </div>
  );
}

export default DataDisplay;

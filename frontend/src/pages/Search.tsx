import { useState } from 'react';
import axios from 'axios';
import config from '../../config.json';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Search = () => {
  const rootURL = config.serverRootURL;
  const navigate = useNavigate();
  const { username } = useParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading indicator
  const handleSearch = async () => {
    setLoading(true); // Set loading to true when search starts
    try {
      const response = await axios.post(`${rootURL}/search`, { question: query });
      // Assuming the response data structure includes a "message" key
      const message = response.data.message; // Directly extracting the message from the response data
      setResults(message); // Set results to the extracted message
      console.log('search result:', response.data);
    } catch (error) {
      console.error("Error performing search:", error);
      setResults('Failed to fetch results'); // Handle error case
    } finally {
      setLoading(false); // Set loading to false when search completes
    }
  };
  
  return (
    <div className='w-screen h-screen flex flex-col bg-gray-50'>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-blue-500 text-black">
        <button onClick={() => navigate("/"+username+"/feed")} className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Back to Feed</button>
        <input 
          type="text" 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder="Search here..." 
          className="p-2 rounded-lg w-1/2"
        />
        <button onClick={handleSearch} className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Search</button>
      </div>
      
      {/* Search Results */}
      <div className='flex-1 flex flex-col items-center justify-around p-6'>
        <div className='text-center mt-6'>
          <h3 className='text-3xl font-bold mb-4 text-blue-400'>Search Results</h3>
          {loading ? (
            <div>Loading...</div> // Display a simple loading text; you can replace this with a spinner or other indicator
          ) : (
            <textarea 
              value={results}
              readOnly
              className="w-full h-full p-2 text-sm font-mono border rounded-lg overflow-auto" // Set height to full to use maximum available space
              style={{ whiteSpace: 'pre-wrap' }} // Keeps whitespace formatting from JSON.stringify
            />
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Search;

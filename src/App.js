import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Desktop from './pages/Desktop/Desktop';
import fetchData, { userApi, ridesApi } from './Api';
import getUsableRides from './Filter';

function App() {
  const [rides, setRides] = useState([]);
  const [usableRides, setUsableRides] = useState({
    nearest:[],
    upcoming:[],
    past:[]
  });
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState({
    state:"",
    city:""
  });
  const [category, setCategory] = useState('nearest');

  const getData = useCallback(async () => {
    try {
      let ridesData = await fetchData(ridesApi);
      let userData = await fetchData(userApi);
      setRides(ridesData);
      setUser(userData);
    } catch (err) {
      setError(err);
    }
  }, [])

  useEffect(() => {
    const path = window.location.pathname.replace('/','');
    const categories = ['nearest', 'upcoming', 'past'];
    if(categories.includes(path)){
      setCategory(path);
    }

    setLoading(true);
    getData().then(() => setLoading(false))
  }, [getData])

  useEffect(() => {
    setUsableRides({
      nearest:getUsableRides({ rides, user, filter, category:'nearest' }),
      upcoming:getUsableRides({ rides, user, filter, category:'upcoming' }),
      past:getUsableRides({ rides, user, filter, category:'past' })
    });
  }, [filter, rides, user])

  return (
    <div className="App">
      { error && <div className="error"> {error.statusCode + " " +error.message } </div> }
      { !error && (loading ? 
        <div className="loading">Loading ... </div> : 
        <Desktop data={{user, rides:usableRides }} filter={filter} setFilter={setFilter} category={category} setCategory={setCategory}/>
      )}
    </div>
  );
}

export default App;

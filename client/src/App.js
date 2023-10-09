import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("/countries")
    .then(res => res.json())
    .then(data => {
        setData(data.countries);
        setFilteredData(data.countries);
      }
    );
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    
    setSearchTerm(term);
  
    setFilteredData(data.filter((country) =>
      country.toLowerCase().includes(term)
    ));
  }

  return (
    <div className="app-container">
      <div className="background-map"></div>
      <Container maxWidth="md" className="content-container">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ fontWeight: 'bold' }}
          >
            Country Search
          </Typography>
          <TextField
            label="Search for a country"
            fullWidth
            margin="normal"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Grid container spacing={2}>
            {filteredData.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  No countries found
                </Typography>
              </Grid>
            ) : (
              filteredData.map((country, i) => (
                <Grid item xs={6} key={i}>
                  <Typography variant="body1">{country}</Typography>
                </Grid>
              ))
            )}
          </Grid>
      </Container>
    </div>
  );
}

export default App
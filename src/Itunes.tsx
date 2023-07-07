import React from 'react';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import axios from 'axios';
import styled from 'styled-components';

// Define your styled components here
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const List = styled.ul`
  padding: 0;
  margin: 20px 0;
`;

const Itunes = () => {
  const [list, setList] = React.useState(['A', 'B', 'C', 'D', 'E']);
  const [albumList, setAlbumList] = React.useState([]);
  const [term, setTerm] = React.useState('');

  const searchAppleMusic = async () => {
    if(term !== '') {
      try {
        const response = await axios.get(`https://itunes.apple.com/search?term=${term}`);
        let collections = response.data.results.map((result: any) => result.collectionName);
        collections = [...new Set(collections)].sort();

        const newList = collections.slice(0, 5);
        setAlbumList(newList);
      } catch (error) {
        console.error(error);
      }
    } else {
      setAlbumList([]);
      setList(['A', 'B', 'C', 'D', 'E']);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (albumList.length > 0) {
        setList(list => [...list.slice(1), albumList[0]]);
        setAlbumList(albumList => albumList.slice(1));
      } else {
        setList(list => [...list.slice(1), list[0]]);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [albumList]);

  React.useEffect(() => {
    searchAppleMusic();
  }, [term]);

  return (
    <Container>
      <TextField 
        label="Search Apple Music"
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <List>
        {list.map((item, index) => (
          <ListItem sx={{ justifyContent: 'center', minWidth: '300px' }} key={index}>{item}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Itunes;
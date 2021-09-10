import React from 'react';
import './App.css';
import PostContainer from './components/PostContainer';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <UserProfile />
      <PostContainer />
    </div>
  );
}

export default App;

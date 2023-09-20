import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from "react"
import { Homepage } from './common/pages/homepage';
import { LoginPage } from './common/pages/login';
import { RegisterPage } from './common/pages/register';
import { Header } from './common/components/header';
import { CreatePostPage } from './common/pages/createPost';
import { SinglePostPage } from './common/pages/postPage';


function App() {
  return (<main>
    <Header />
    <Routes>
      <Route path='/' element = {<Homepage />} />
      <Route path='/login' element = {<LoginPage />} />
      <Route path='/register' element = {<RegisterPage />} />
      <Route path = "/create" element = {<CreatePostPage />} />
      <Route path = "/post/:postId" element = {<SinglePostPage />} />
    </Routes>

  </main>)
}

export default App;

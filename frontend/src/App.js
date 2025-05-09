import React from 'react';
import { useSelector } from "react-redux";
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Header from './components/header/header';
import Regester from './components/forms/register';
import Login from './components/forms/login';
import Home from './pages/home/home';
import EventDetails from './pages/eventDetails/eventDetails';
import Congrats from './pages/congrats/congrats';
import AdminPage from './pages/admin/admin';
import CreateEventForm from './components/forms/createEventForm';
import { ToastContainer } from 'react-toastify';
import EditEvent from './components/forms/editEventForm';
import NotFound from './pages/notFound/notFound';

function App() {
  const {user} = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/events" element={<h1>Events</h1>} />
        <Route path="/events/:id" element={<EventDetails />} />
        
        <Route path="/login" element={ !user ? <Login/> : <Navigate to="/"/> } />
        <Route path="/register" element={<Regester />} />

        <Route path="/congrats" element={<Congrats />} />

        <Route path='/admin'>
          <Route index element={user?.isAdmin ? <AdminPage /> : <Navigate to="/"/> } />
          <Route path='create-event' element={ user?.isAdmin ? <CreateEventForm /> : <Navigate to="/"/>} />
          <Route path='edit-event/:id' element={ user?.isAdmin ?  <EditEvent /> : <Navigate to="/"/>} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Registration from "./authentication/Registration";
import NotFound from "./notes/NotFound";
import NoteList from "./notes/NoteList";
import CreateNote from "./notes/CreateNote";
import EditNote from "./notes/EditNote";
import ViewNote from "./notes/ViewNote";
import Footer from "./common/Footer";
import PrivateRoute from "./PrivateRoute"; // Импортируем PrivateRoute

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleUserLogin = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const isAuthenticated = loggedIn;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/registration" element={<Registration handleUserLogin={handleUserLogin} />} />
          <Route
  path="/login"
  element={<Login handleUserLogin={handleUserLogin} setLoggedIn={setLoggedIn} />}
/>
          {/* Пример использования PrivateRoute внутри Route */}
          <Route
            path="/home"
            element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/notes"
            element={<PrivateRoute element={<NoteList users={users} currentUser={currentUser} />} isAuthenticated={isAuthenticated} />}
          />
         <Route
            path="/createnote"
            element={<PrivateRoute element={<CreateNote currentUser={currentUser} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/notes/edit/:id"
            element={<PrivateRoute element={<EditNote currentUser={currentUser} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/notes/view/:id"
            element={<PrivateRoute element={<ViewNote currentUser={currentUser} />} isAuthenticated={isAuthenticated} />}
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
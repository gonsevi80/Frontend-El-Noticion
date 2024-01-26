import React from "react";
import { Routes, Route } from "react-router-dom";

import News from "./pages/News";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsDetail from "./components/NewsDetail";
import NewNews from "./pages/NewNews";
import ProfilePage from "./pages/ProfilePage";
import FormUserEdit from "./components/FormUserEdit";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import ChangeRecoverPassword from "./components/ChangeRecoverPassword";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/news/detail/:newsId" element={<NewsDetail />} />
        <Route path="/news/new-news" element={<NewNews />} />
        <Route
          path="/users/password/recover"
          element={<RecoverPasswordPage />}
        />
        <Route path="/users/password" element={<ChangeRecoverPassword />} />
        <Route path="/users/profile" element={<ProfilePage />}>
          <Route path="/users/profile/modify" element={<FormUserEdit />} />
        </Route>
        <Route path="*" element={<News />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

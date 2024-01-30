import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginCard from "./card/LoginCard";
import RegisterCard from "./card/RegisterCard";
import News from "./pages/News";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewsDetail from "./components/NewsDetail";
import NewsEdit from "./pages/NewsEditPage";
import NewNews from "./pages/NewNews";
import ProfilePage from "./pages/ProfilePage";
import FormUserEdit from "./components/FormUserEdit";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import ChangeRecoverPassword from "./components/ChangeRecoverPassword";

function App() {
  const [isLoginCardVisible, setLoginCardVisibility] = useState(false);
  const [isRegisterCardVisible, setRegisterCardVisibility] = useState(false);

  const handleToggleLoginCard = () => {
    setLoginCardVisibility(!isLoginCardVisible);
    setRegisterCardVisibility(false);
  };

  const handleToggleRegisterCard = () => {
    setRegisterCardVisibility(!isRegisterCardVisible);
    setLoginCardVisibility(false);
  };

  return (
    <>
      <Header
        onToggleLoginCard={handleToggleLoginCard}
        onToggleRegisterCard={handleToggleRegisterCard}
      />
      {isLoginCardVisible && (
        <LoginCard
          onClose={() => setLoginCardVisibility(false)}
          onSwitchToRegister={() => setRegisterCardVisibility(true)}
        />
      )}
      {isRegisterCardVisible && (
        <RegisterCard onClose={() => setRegisterCardVisibility(false)} />
      )}

      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/news/:newsId" element={<NewsDetail />} />
        <Route path="/news/:newsId/edit" element={<NewsEdit />} />
        <Route path="/news/new-news" element={<NewNews />} />
        <Route
          path="/users/password/recover"
          element={<RecoverPasswordPage />}
        />
        <Route path="/users/password" element={<ChangeRecoverPassword />} />
        <Route path="/users/profile" element={<ProfilePage />} />
        <Route path="/users/profile/modify" element={<FormUserEdit />} />
        <Route path="*" element={<News />} />
      </Routes>
    </>
  );
}

export default App;

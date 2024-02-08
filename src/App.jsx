import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginCard from "./card/LoginCard";
import RegisterCard from "./card/RegisterCard";
import News from "./pages/News";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewsDetail from "./components/NewsDetail";
import NewsEditPage from "./pages/NewsEditPage";
import NewNews from "./pages/NewNews";
import ProfilePage from "./pages/ProfilePage";
import FormUserEdit from "./components/FormUserEdit";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import ChangeRecoverPassword from "./components/ChangeRecoverPassword";
import UserActivation from "./components/UserActivation";

function App() {
  const [isLoginCardVisible, setLoginCardVisibility] = useState(false);
  const [isRegisterCardVisible, setRegisterCardVisibility] = useState(false);

  // Estas funciones manejan la visibilidad de las tarjetas de Login y Registro
  const handleToggleLoginCard = () => {
    setLoginCardVisibility(!isLoginCardVisible);
    setRegisterCardVisibility(false);
  };

  const handleToggleRegisterCard = () => {
    setRegisterCardVisibility(!isRegisterCardVisible);
    setLoginCardVisibility(false);
  };

  return (
    <SearchProvider>
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
        <Route
          path="/users/validate/:registrationCode"
          element={<UserActivation />}
        />
        <Route path="/" element={<News />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/news/:newsId" element={<NewsDetail />} />
        <Route path="/news/update/:newsId" element={<NewsEditPage />} />
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
      <Footer />
    </SearchProvider>
  );
}

export default App;

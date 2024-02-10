import RecoverForm from "../components/RecoverForm.jsx";

const RecoverPasswordPage = () => {
  return (
    <div>
<<<<<<< HEAD
      <h3 className="Titulo">Recuperar contraseña</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario: </label>
          <input
            className="recuadro"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email: </label>
          <input
            className="recuadro"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="contenedor-bot-ini">
          <button type="submit" className="boton">
            Enviar
          </button>
        </div>
        {error && <p>{error}</p>}
      </form>
=======
      <RecoverForm />
>>>>>>> main
    </div>
  );
};

export default RecoverPasswordPage;

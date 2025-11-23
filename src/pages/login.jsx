import { useState } from 'react';
import './Login.css'; // 1. Importa o CSS que acabamos de criar

function Login() {
  // 2. Esta é a lógica do React que substitui seu 'login.js'
  // Ela controla se o painel está ativo (mostrando registro) ou não.
  const [isActive, setIsActive] = useState(false);

  return (
    // 3. Este é o seu HTML traduzido para JSX
    // Note que a classe "active" é aplicada dinamicamente
    <div className={isActive ? "container active" : "container"} id="container">

      <div className="form-box register">
        <form action="#">
          <h1>REGISTRAR</h1>
          {/* Tags como <br> e <input> precisam ser "auto-fechadas" com /> */}
          <br /><br />
          <div className="input-box">
            <input type="text" placeholder="Usuário" required />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <i className='bx bxs-envelope'></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Senha" required />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <button type="submit" className="btn">Registrar</button>
          <br />
          <p>ou registre-se usando</p>
          <div className="social-icons">
            <a href="#"><i className='bx bxl-google'></i></a>
            <a href="#"><i className='bx bxl-facebook'></i></a>
            <a href="#"><i className='bx bxl-github'></i></a>
            <a href="#"><i className='bx bxl-linkedin'></i></a>
          </div>
        </form>
      </div>

      <div className="form-box login">
        <form action="#">
          <h1>ENTRAR</h1>
          <div className="input-box">
            <input type="text" placeholder="Usuário" required />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Senha" required />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="forgot-link">
            <a href="#">Esqueceu a senha?</a>
          </div>
          <button type="submit" className="btn">Entrar</button>
          <br /><br />
          <p>ou entre usando</p>
          <div className="social-icons">
            <a href="#"><i className='bx bxl-google'></i></a>
            <a href="#"><i className='bx bxl-facebook'></i></a>
            <a href="#"><i className='bx bxl-github'></i></a>
            <a href="#"><i className='bx bxl-linkedin'></i></a>
          </div>
        </form>
      </div>

      <div className="toggle-box">

        <div className="toggle-panel toggle-left">
          <h1>Olá, seja bem-vindo!</h1>
          <p>Não possui uma conta?</p>
          {/* 4. O 'onClick' do React chama a função para mudar o estado */}
          <button type="button" className="btn" id="register-btn" onClick={() => setIsActive(true)}>
            Registrar
          </button>
        </div>

        <div className="toggle-panel toggle-right">
          <h1>Bem-vindo de volta!</h1>
          <p>Já possui uma conta?</p>
          {/* 5. Este onClick muda o estado de volta para 'false' */}
          <button type="button" className="btn" id="login-btn" onClick={() => setIsActive(false)}>
            Login
          </button>
        </div>

      </div>
    </div>
  );
}

// 6. Exporta o componente para que outros arquivos possam usá-lo
export default Login;

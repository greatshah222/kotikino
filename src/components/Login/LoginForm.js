import { useMyContextFunctions } from "../../contexts/ContextFunctions";
import { useState } from "react";
import { checkStyle } from "../../scripts/utils";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { getImageByKey } from "../../scripts/getImageByKey";

// Renders contentRatings of chosen item
const LoginForm = (props) => {

  // Bring stateholders from context
  const { authProcess } = useMyContextFunctions();

  const [loginMessage, setLoginMessage] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [hovering, setHovering] = useState("");

  const { t } = useTranslation();

  const history = useHistory();

  // Handle the click of "Next" button
  const handleClick = async (e) => {

    e.preventDefault();

    try {
      // Do the signUp/login process
      const authResponse = await authProcess(formEmail, formPassword);

      if (authResponse.data.status === "error") {
        setLoginMessage(authResponse.data.message);
      } else {
        history.push(`${props.routes.home}`)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="loginViewBackground"
      style={{ backgroundImage: `url(${getImageByKey("signUpBackground")})` }}
    >
      <div className="loginViewContainer">
        <div className="loginFormContainer" style={props.styles?.loginFormContainer}>

          <div className="loginFormTitle">
            {t("Login")}
          </div>

          <div className="loginMessage">{loginMessage}</div>

          <form id="form_id" onSubmit={(e) => handleClick(e)}>

            <label>
              {t("Email")}:
            </label>
            <input className="loginFormInput" type="text" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />

            <label>
              {t("Password")}:
            </label>
            <input className="loginFormInput" type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} />

            <button
              className="loginFormBTN"
              type="submit"
              value="login"
              onMouseEnter={() => setHovering("login")}
              onMouseLeave={() => setHovering("")}
              style={checkStyle(props.styles, hovering, "loginFormBTN", "login")}
            >
              {t("Login")}
            </button>

            <div className="loginRow">{`${t("New user in site?")} `} <Link to={`${props.routes.signUp}`}>{t("SignUp now")}</Link></div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;


import classes from "./Login.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { UserContext } from "../UserContext/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  let navigate = useNavigate();
  let { RefreshUser } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    signIn({
      username,
      password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    })
      .then((result) => {
        console.log(result);
        RefreshUser();
        navigate("/");
      })
      .catch((err) => {
        setLoginError(true);
        console.log(err);
        // Something is Wrong
      });
  };
  return (
    <div className="content">
      <div className={classes.loginDialog}>
        <div className={classes.heading}>
          <div className={classes.cardImg}>
            <img className={classes.img} src="/images/four.svg" />
          </div>
          <div class={classes.title}>Family Recipe App</div>
          <div class={classes.subtitle}>
            Use the same login as Family List App
          </div>
        </div>
        <div className={classes.loginForm}>
          <div className={classes.loginRow}>
            <label>
              Username:{" "}
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                size="small"
              />
            </label>
          </div>
          <div className={classes.loginRow}>
            <label>
              Password:{" "}
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                type="password"
              />
            </label>
          </div>
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="recipeLinkButton"
          >
            Login
          </Button>
          {loginError ? <h1>Invalid Login, please try again</h1> : <></>}
        </div>
      </div>
    </div>
  );
}

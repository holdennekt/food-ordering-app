import { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import config from "../../config.json";
import MyToasts from "../NotificationToasts";

function AdminLogin() {
  const usernameRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({});

  const [failureText, setFailureText] = useState("");
  const [showFailureToast, setShowFailureToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const headers = { authorization: `Bearer ${token}` };
      fetch(config.API_BASEURL + "/admin/verifyJwt", {
        headers,
        method: "POST",
      })
        .then((res) => {
          if (res.status === 500) throw new Error("Internal server error");
          return res.json();
        })
        .then(({ token }) => {
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/admin/orders");
        })
        .catch((err) => {
          usernameRef.current.focus();
        });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username)
      setErr((prevErr) => ({
        ...prevErr,
        login: "Login field cannot be empty!",
      }));
    if (!password)
      setErr((prevErr) => ({
        ...prevErr,
        password: "Password field cannot be empty!",
      }));
    if (username && password) {
      setErr({});
      fetch(config.API_BASEURL + "/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => {
          if (res.status === 500) throw new Error("Internal server error");
          return res.json();
        })
        .then(({ token }) => {
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/admin/orders");
        })
        .catch((err) => {
          setFailureText(err.message);
          setShowFailureToast(true);
        });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="login">Login:</Form.Label>
            <Form.Control
              id="login"
              className="form-control"
              type="text"
              autoComplete="username"
              placeholder="login"
              ref={usernameRef}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            {err.login && (
              <Form.Text className="text-danger">{err.login}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control
              id="password"
              className="form-control"
              type="password"
              autoComplete="current-password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {err.password && (
              <Form.Text className="text-danger">{err.password}</Form.Text>
            )}
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Sign in
          </Button>
        </Form>
      </Card>
      <MyToasts
        props={{
          succesText: "",
          showSuccessToast: false,
          setShowSuccessToast: () => {},
          failureText,
          showFailureToast,
          setShowFailureToast,
        }}
      />
    </Container>
  );
}

export default AdminLogin;

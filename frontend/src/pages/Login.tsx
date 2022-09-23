import axios from 'axios';
import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import apiUrls from '../constants/apiUrls';
import axiosConfig from '../constants/axiosConfig';
import AuthCredentials from '../interfaces/authCredentials';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

const client = axios.create(axiosConfig);

function Login() {
  const { setUser } = useAuth();

  const navigate = useNavigate();


  const [error, setError] = useState<string>('')
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: '',
  });


  async function loginUser() {
    try {
      let response = await client.post(`${apiUrls.LOGIN}`, credentials)
      setUser(response.data.user)
      navigate(routes.ROOT, { replace: true })

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        setError(`${err.request.status} ${err.request.statusText}`);
      }
    }
  }

  async function logoutUser() {
    try {
      let response = await client.post(`${apiUrls.LOGOUT}`)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`${err.request.status} ${err.request.statusText}`);
      }
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { id, value }
    } = event

    setCredentials(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginUser();
  }

  const renderAlert = error ? (
    <Alert variant='danger'>
      {error}
    </Alert>
  ) : error

  return (
    <div className='sm-container'>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit} method="POST">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {renderAlert}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <br />
      <Button variant="primary" type="submit" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  )
}

export default Login
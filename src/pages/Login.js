import React from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../redux/actions/services-request';
import {
  Container,
  Form,
  Input,
  Button,
  Title,
} from '../components/styledComponents';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const isSuccess = await dispatch(loginRequest({ email, password }));
    if (isSuccess) {
      navigate('/contacts');
    }
  };

  return (
    <Container>
      <Link to={`/register`} target="blanck">
        Sing Up
      </Link>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;

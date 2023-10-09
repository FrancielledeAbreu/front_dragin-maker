import React from 'react';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../redux/actions/services-request';
import {
  Container,
  Form,
  Input,
  Button,
  Title,
} from '../components/styledComponents';

const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cep = e.target.cep.value;
    const cpf = e.target.cpf.value;
    const phone = e.target.phone.value;
    const street_number = e.target.street_number.value;
    const complement = e.target.complement.value;
    dispatch(
      registerRequest({
        name,
        email,
        password,
        cep,
        cpf,
        phone,
        street_number,
        complement,
      })
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input type="text" name="name" placeholder="Name" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="text" name="cep" placeholder="cep" required />
        <Input type="text" name="cpf" placeholder="cpf" required />
        <Input type="text" name="phone" placeholder="phone" required />
        <Input type="text" name="street_number" placeholder="street_number" required />
        <Input type="text" name="complement" placeholder="complement"  />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default Register;

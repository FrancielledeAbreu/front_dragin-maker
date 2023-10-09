// src/components/AddContact.js
import React, { useState } from 'react';
import api from '../services';
import {
  Container,
  Form,
  Input,
  Button,
  Title,
} from '../components/styledComponents';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const AddContact = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [addressId, setAddressId] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const navigate = useNavigate();

  const handleAddressSearch = async () => {
    try {
      const response = await api.get(
        `api/v1/addresses/search?uf=${uf}&city=${city}&street=${street}`
      );
      setAddresses(response.data);
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        email,
        name,
        street_number: streetNumber,
        address_id: addressId,
        cpf,
        phone,
        complement,
      };

      const isSuccess = await api.post('api/v1/contacts/', data);
      if (isSuccess) {
        navigate('/contacts');
        alert('Contato adicionado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar contato:', error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>Adicionar Contato</Title>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            required
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            required
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone"
            required
          />

          <Input
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            placeholder="street number"
            required
          />

          <Input
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            placeholder="setComplement"
          />

          <Button onClick={() => setShowAddressFields(!showAddressFields)}>
            {showAddressFields
              ? 'Esconder Campos de Endereço'
              : 'Buscar Endereço'}
          </Button>

          {showAddressFields && (
            <>
              <Input
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                placeholder="UF"
                required
              />
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Cidade"
                required
              />
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Rua"
                required
              />
              <Button type="button" onClick={handleAddressSearch}>
                Pesquisar Endereço
              </Button>

              {addresses.length > 0 && (
                <select
                  onChange={(e) => {
                    const selectedAddress = addresses.find(
                      (address) => address.id === Number(e.target.value)
                    );

                    if (selectedAddress) {
                      setAddressId(selectedAddress.id);

                      console.log(selectedAddress);
                    }
                  }}
                >
                  <option value="">Selecione um endereço</option>
                  {addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.street}, {address.city}, {address.uf}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}

          <Button type="submit">Adicionar</Button>
        </Form>
      </Container>
    </>
  );
};

export default AddContact;

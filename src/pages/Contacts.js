import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  contactsRequest,
  contactDetailsRequest,
  deleteContactRequest,
} from '../redux/actions/services-request';
import Header from '../components/Header';
import {
  ContactItem,
  ContactLink,
  ContactList,
  ContactsContainer,
  ContactsTitle,
  DeleteButton,
  SearchButton,
  SearchButtonClean,
  SearchContainer,
  SearchInput,
} from '../components/styledComponents';
import { searchContacts } from '../services';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.serviceReducer.contacts);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [allContacts, setContacts] = useState(contacts);

  const handleSearch = async () => {
    try {
      const response = await searchContacts(name, cpf);
      setContacts(response.data);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    }
  };

  const handleSearchClean = async () => {
    setContacts(contacts);
  };

  useEffect(() => {
    dispatch(contactsRequest());
  }, [dispatch]);

  const handleViewContact = (id) => {
    dispatch(contactDetailsRequest(id));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContactRequest(id));
  };

  return (
    <>
      {' '}
      <Header />
      <ContactsContainer>
        <ContactsTitle>Contatos</ContactsTitle>
        <SearchContainer>
          <SearchInput
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <SearchInput
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Buscar</SearchButton>
          <SearchButtonClean onClick={handleSearchClean}>
            Limpar
          </SearchButtonClean>
        </SearchContainer>
        <ContactList>
          {allContacts &&
            allContacts.map((contact) => (
              <ContactItem key={contact.id}>
                {contact.name}
                <ContactLink
                  to={`/contacts/${contact.id}`}
                  onClick={() => handleViewContact(contact.id)}
                >
                  Details
                </ContactLink>
                <DeleteButton onClick={() => handleDeleteContact(contact.id)}>
                  Excluir
                </DeleteButton>
              </ContactItem>
            ))}
        </ContactList>
        <SearchButtonClean>
          <ContactLink style={{color:'#ffff'}} to={`/add-contact`}>New</ContactLink>
        </SearchButtonClean>
      </ContactsContainer>
    </>
  );
};

export default Contacts;

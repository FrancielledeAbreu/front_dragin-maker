import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactDetailsRequest } from '../redux/actions/services-request';
import Header from '../components/Header';
import {
  ContactDetailsContainer,
  ContactLink,
  DetailRow,
  DetailsWrapper,
  TitleTwo,
} from '../components/styledComponents';

const ContactDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const contactDetails = useSelector(
    (state) => state.serviceReducer.contactDetails
  );

  useEffect(() => {
    dispatch(contactDetailsRequest(id));
  }, [dispatch, id]);

  return (
    <ContactDetailsContainer>
      <Header />
      <TitleTwo>Detalhes do Contato</TitleTwo>
      {contactDetails && (
        <DetailsWrapper>
          <DetailRow>
            <strong>Nome:</strong> {contactDetails.name}
          </DetailRow>
          <DetailRow>
            <strong>Email:</strong> {contactDetails.email}
          </DetailRow>
          <DetailRow>
            <strong>Cpf:</strong> {contactDetails.cpf}
          </DetailRow>
          <DetailRow>
            <strong>Phone:</strong> {contactDetails.phone}
          </DetailRow>
        </DetailsWrapper>
      )}
      <ContactLink to={'/contacts'}>Back</ContactLink>
    </ContactDetailsContainer>
  );
};

export default ContactDetails;

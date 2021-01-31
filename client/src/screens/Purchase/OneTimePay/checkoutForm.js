import React, { useEffect, useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { navigate } from 'gatsby';

import axios from '../../../services/axios';
import ApiContext from '../../../utils/apiContext';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';

import LoadingOverlay from '../../../components/Common/loadingOverlay';

//valid format for setting an email and username
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required'),
  username: Yup.string()
    .min(3, 'Name must be at least 3 Characters')
    .max(50, 'Name Too Long')
    .required('Name Required')
});

const CardWrapper = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;

  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
    max-width: 28rem;
  }
`;

const Card = styled.div`
  background-color: ${colors.white};
  padding: 2rem 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
  padding-top: 0.5rem;
`;

const InputWrapper = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const Input = styled.input`
  ${fieldStyles}
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-weight: 500;
  width: 100%;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:active {
    background-color: ${colors.indigo600};
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-bottom: 0.5em;
  margin-top: -0.2rem;
`;

const CheckoutForm = () => {
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [clientSecret, setSecret] = useState();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getPaymentIntent();
  }, []);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  const getPaymentIntent = async () => {
    let result = await axios.get('/stripe/payment-intent').catch((err) => {
      fetchFailure(err);
    });
    console.log(result);
    console.log();
    setSecret(result.data.client_secret);
  };

  const handleSubmit = async (values) => {
    fetchInit();

    let receipt_email = values.email;
    let name = values.name;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name
        }
      },
      receipt_email
    });

    if (result.error) {
      fetchFailure(result.error);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log(result);
        navigate('/confirmpayment');
      } else {
        let error = {
          type: 'Stripe Confirm Failed',
          message: 'Stripe payment confirmation failed, please contact support'
        };
        fetchFailure(error);
      }
    }
  };

  return (
    <CardWrapper>
      {isLoading && <LoadingOverlay />}
      <Card>
        <h2>Purchasing Item</h2>
        <Formik
          validationSchema={ValidSchema}
          initialValues={{ email: '', username: '' }}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Label htmlFor="email">Email:</Label>
              <InputWrapper>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </InputWrapper>
              {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
              <Label htmlFor="username">Name:</Label>
              <InputWrapper>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </InputWrapper>
              {errors.username && touched.username && <ErrorText>{errors.username}</ErrorText>}
              <CardElement />
              <ButtonWrapper>
                <Button disabled={!stripe || !elements || !clientSecret} type="submit">
                  Submit
                </Button>
              </ButtonWrapper>
            </form>
          )}
        </Formik>
      </Card>
    </CardWrapper>
  );
};

export default CheckoutForm;

import React, { useEffect, useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { navigate } from 'gatsby';

import axios from '../../../services/axios';
import ApiContext from '../../../utils/apiContext';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';

import Button from '../../../components/Common/buttons/SecondaryButton';
import Card from '../../../components/Common/Card';
import Label from '../../../components/Common/forms/FieldLabel';
import Input from '../../../components/Common/forms/TextInput';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';
import ErrorText from '../../../components/Common/errorText';
import LoadingOverlay from '../../../components/Common/loadingOverlay';

//valid format for setting an email and username
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required'),
  username: Yup.string()
    .min(3, 'Name must be at least 3 Characters')
    .max(50, 'Name Too Long')
    .required('Name Required')
});

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.coolGray50};
  min-height: 100vh;
`;

const ElementWrapper = styled.div`
  margin-top: 3rem;
`;

const StyledCard = styled(Card)`
  width: 34rem;
  height: max-content;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
  margin-top: 1rem;
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
        //api request to endpoint
        let data = {
          receipt_email,
          amount: result.paymentIntent.amount
        };

        await axios.post('/stripe/one-time-pay', data).catch((err) => {
          fetchFailure(err);
        });

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
    <Wrapper>
      {isLoading && <LoadingOverlay />}
      <StyledCard>
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
              <ElementWrapper>
                <CardElement />
                <ButtonWrapper>
                  <Button disabled={!stripe || !elements || !clientSecret} type="submit">
                    Submit
                  </Button>
                </ButtonWrapper>
              </ElementWrapper>
            </form>
          )}
        </Formik>
      </StyledCard>
    </Wrapper>
  );
};

export default CheckoutForm;

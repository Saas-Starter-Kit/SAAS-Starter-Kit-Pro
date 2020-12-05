import React, { useState, useContext } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/router';
import styled from 'styled-components';
import AuthContext from '../../utils/authContext';
import LoadingOverlay from '../../components/loadingOverlay';
import { colors, breakpoints, fieldStyles } from '../../styles/theme';

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Card = styled.div`
  background-color: ${colors.white};
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.medium}) {
    width: 75%;
  }
`;

const Paragraph = styled.p`
  font-weight: 700;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
`;

const Form = styled.form`
  padding-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
`;

const Input = styled.input`
  ${fieldStyles}
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const Settings = () => {
  const { firebase, authState } = useContext(AuthContext);
  let userEmail = authState.user ? authState.user.email : 'Guest@guest.com';
  let displayName = authState.user ? authState.user.username : 'Guest';

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState(userEmail);
  const [username, setUsername] = useState(displayName);
  const [resMessage, setResMessage] = useState('');

  const curUser = firebase.auth().currentUser;
  const id = authState.user ? authState.user.id.user : null;
  const isEmail = authState.user ? authState.user.provider === 'password' : null;

  // const router = useRouter();

  const updateUsername = (event) => {
    event.preventDefault();
    setLoading(true);

    curUser
      .updateProfile({
        displayName: username
      })
      .then(() => {
        // Update successful.
        let data = { id, username };
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/put/username`, data);
        // setTimeout(() => router.push('/login'), 500);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        setResMessage('An error occured please try again later');
        setLoading(false);
      });
  };

  const updateEmail = (event) => {
    event.preventDefault();
    setLoading(true);

    let data = { id, email };

    curUser
      .updateEmail(email)
      .then(() => {
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/put/email`, data);
        // setTimeout(() => router.push('/login'), 500);
      })
      .catch(function (error) {
        console.log(error);
        setResMessage('An error occured please try again later');
        setLoading(false);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <React.Fragment>
      <Title>Settings</Title>
      <Card>
        <Paragraph>{resMessage}</Paragraph>
        {!isEmail && (
          <Paragraph>
            Email, password and username change is only available for email signups. If you signed
            up with third party providers such as Google or Facebook please follow their respective
            process for changing emails, usernames and passwords.
          </Paragraph>
        )}
        {isLoading && <LoadingOverlay />}
        <SectionTitle>Update Username</SectionTitle>
        <Form>
          <Label htmlFor='title'>Username:</Label>
          <Input
            onChange={handleUsernameChange}
            value={username}
            type='text'
            disabled={isEmail ? false : true}
          />
          <Button onClick={updateUsername} disabled={isEmail ? false : true}>
            Save
          </Button>
        </Form>
        <SectionTitle>Update Email</SectionTitle>
        <Form>
          <Label htmlFor='title'>Email:</Label>
          <Input
            type='email'
            onChange={handleEmailChange}
            value={email}
            type='text'
            disabled={isEmail ? false : true}
          />
          <Button onClick={updateEmail} disabled={isEmail ? false : true}>
            Save
          </Button>
        </Form>
        <SectionTitle>Update Password</SectionTitle>
        <p>Please Reset Password on Login Page</p>
        <Button
          onClick={() => {
            // router.push('/login');
          }}
        >
          Go to Login
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Settings;

import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';

import { colors } from '../../../styles/theme';

import Button from '../../../components/Common/buttons/AltButton1';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextInput from '../../../components/Common/forms/TextInput';

const InputWrapper = styled.div`
  padding-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  padding-top: 1.5rem;
  text-align: left;
`;

const mlServerUrl = 'http://127.0.0.1:5000/machine-learning';

const MachineLearning = () => {
  const [prediction, setPrediction] = useState();

  //send form data as inputs to ml algorithm
  const mlAnalysis = async (event) => {
    event.preventDefault();

    let headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    //set values for ml algorithm
    let data = qs.stringify({
      value1: event.target.bedrooms.value,
      value2: event.target.bathrooms.value,
      value3: event.target.sqlive.value,
      value4: event.target.sqlot.value,
      value5: event.target.floors.value,
      value6: event.target.water.value,
      value7: event.target.views.value,
      value8: event.target.condition.value,
      value9: event.target.grade.value,
      value10: event.target.sqabove.value,
      value11: event.target.basement.value,
      value12: event.target.built.value,
      value13: event.target.renovate.value
    });

    let result = await axios.post(mlServerUrl, data, headers).catch((err) => console.log(err));

    setPrediction(result.data.prediction[0]);
  };

  return (
    <Card>
      <h2>Fill out the form below to get a ML house price prediction</h2>
      <h3>Your Predicted house price is: {prediction}</h3>
      <form onSubmit={mlAnalysis}>
        <InputWrapper>
          <FieldLabel>Bedrooms</FieldLabel>
          <TextInput name="bedrooms" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Bathrooms</FieldLabel>
          <TextInput name="bathrooms" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Square Foot Living, number around 2000</FieldLabel>
          <TextInput name="sqlive" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Square Foot Lot, number around 15,000</FieldLabel>
          <TextInput name="sqlot" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Number of floors</FieldLabel>
          <TextInput name="floors" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Water front, 0 or 1</FieldLabel>
          <TextInput name="water" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Number of views, 0 to 4</FieldLabel>
          <TextInput name="views" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Condition, number from 1 to 5</FieldLabel>
          <TextInput name="condition" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Grade, number from 1 to 13</FieldLabel>
          <TextInput name="grade" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Square foot above, number around 1800</FieldLabel>
          <TextInput name="sqabove" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Square foot basement, number around 300</FieldLabel>
          <TextInput name="basement" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Year built, year around 1970</FieldLabel>
          <TextInput name="built" type="number" />
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>Year renovated, year around 1980</FieldLabel>
          <TextInput name="renovate" type="number" />
        </InputWrapper>
        <ButtonWrapper>
          <Button type="submit">Predict</Button>
        </ButtonWrapper>
      </form>
    </Card>
  );
};

export default MachineLearning;

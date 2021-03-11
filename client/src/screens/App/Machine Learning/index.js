import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';

import Button from '../../../components/Common/buttons/SecondaryButton';
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
          <FieldLabel>
            Bedrooms
            <TextInput name="bedrooms" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Bathrooms
            <TextInput name="bathrooms" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Square Foot Living, number around 2000
            <TextInput name="sqlive" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Square Foot Lot, number around 15,000
            <TextInput name="sqlot" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Number of floors
            <TextInput name="floors" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Water front, 0 or 1
            <TextInput name="water" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Number of views, 0 to 4
            <TextInput name="views" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Condition, number from 1 to 5
            <TextInput name="condition" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Grade, number from 1 to 13
            <TextInput name="grade" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Square foot above, number around 1800
            <TextInput name="sqabove" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Square foot basement, number around 300
            <TextInput name="basement" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Year built, year around 1970
            <TextInput name="built" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Year renovated, year around 1980
            <TextInput name="renovate" type="number" />
          </FieldLabel>
        </InputWrapper>
        <ButtonWrapper>
          <Button type="submit">Predict</Button>
        </ButtonWrapper>
      </form>
    </Card>
  );
};

export default MachineLearning;

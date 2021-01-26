import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

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
    <div>
      <div>Fill out the form below to get a ML house price prediction</div>
      <div>Your Predicted house price is</div>
      <div>{prediction}</div>
      <form onSubmit={mlAnalysis}>
        <div>Bedrooms</div>
        <input name="bedrooms" type="number" />
        <div>Bathrooms</div>
        <input name="bathrooms" type="number" />
        <div>Square Foot Living, number around 2000</div>
        <input name="sqlive" type="number" />
        <div>Square Foot Lot, number around 15,000</div>
        <input name="sqlot" type="number" />
        <div>Number of floors</div>
        <input name="floors" type="number" />
        <div>Water front, 0 or 1</div>
        <input name="water" type="number" />
        <div>Number of views, 0 to 4</div>
        <input name="views" type="number" />
        <div>Condition, number from 1 to 5</div>
        <input name="condition" type="number" />
        <div>Grade, number from 1 to 13</div>
        <input name="grade" type="number" />
        <div>Square foot above, number around 1800</div>
        <input name="sqabove" type="number" />
        <div>Square foot basement, number around 300</div>
        <input name="basement" type="number" />
        <div>Year built, year around 1970</div>
        <input name="built" type="number" />
        <div>Year renovated, year around 1980</div>
        <input name="renovate" type="number" />
        <div>
          <button type="submit">Predict</button>
        </div>
      </form>
    </div>
  );
};

export default MachineLearning;

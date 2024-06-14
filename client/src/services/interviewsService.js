import axios from "axios";
import toastr from "toastr";

const url = `${process.env.REACT_APP_API_HOST_PREFIX}`;
const baseConfig = {
  headers: { "content-type": "application/json" },
  crossDomain: true,
};

export const getInterviewGrading = async (predictionId) => {
  const timeOut = 3000;
  let count = 0,
    interval = 1000,
    maxCount = Math.floor(timeOut / interval),
    intervalId;
  const config = {
    method: "GET",
    url: `${url}/InterviewGrading/${predictionId}`,
    ...baseConfig,
  };

  const pollingCallback = async (resolve, reject) => {
    count++;
    let deferredResponse;
    try {
      if (count % 3 === 0) {
        toastr.info("Still working on this for you...");
      }
      deferredResponse = await axios(config);
      clearInterval(intervalId);
      resolve(deferredResponse);
    } catch (err) {
      if (count >= maxCount) {
        clearInterval(intervalId);
        reject(err);
      } else if (err.response.status !== 404) {
        clearInterval(intervalId);
        reject(err);
      }
    }
  };

  return new Promise((resolve, reject) => {
    intervalId = setInterval(pollingCallback, interval, resolve, reject);
  });
};

export const requestInterviewGrading = async (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: `${url}/InterviewGrading/create`,
    ...baseConfig,
  };

  try {
    const res = axios(config);

    if (!res) {
      throw new Error("No response from requestInterviewGrading");
    }

    return res;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getInterviewQuestions = async (topic) => {
  const config = {
    method: "GET",
    url: `${url}/InterviewQuestions/${topic}`,
    ...baseConfig,
  };

  try {
    const res = axios(config);

    if (!res) {
      throw new Error("No response from requestInterviewGrading");
    }

    return res;
  } catch (error) {
    Promise.reject(error);
  }
};

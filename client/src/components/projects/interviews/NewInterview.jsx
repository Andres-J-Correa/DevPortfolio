import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  getInterviewQuestions,
  requestInterviewGrading,
  getInterviewGrading,
} from "../../../services/interviewsService";
import toastr from "toastr";
import "./interviews.css";

const NewInterview = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gradingResults, setGradingResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [topic, setTopic] = useState(null);

  const { state } = useLocation();

  const shouldInterviewFinish = useMemo(
    () =>
      gradingResults.length > 0 && questions.length === 0 && !!!currentQuestion,
    [questions, currentQuestion, gradingResults]
  );

  const chatboxRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const finishInterview = useCallback(() => {
    setLoading(true);

    let finalGrade = gradingResults.reduce((acc, curr) => acc + curr.grade, 0);

    finalGrade = finalGrade / gradingResults.length;

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: `Your final grade is: ${finalGrade}`,
        },
      ]);

      setLoading(false);
      setInterviewFinished(true);
    }, 1000);
  }, [gradingResults]);

  const sendNextQuestion = () => {
    if (!!questions.length) {
      const nextQuestion = questions.pop();

      setLoading(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: `Next question: ${nextQuestion.question}`,
          },
        ]);

        setCurrentQuestion(nextQuestion);
        setLoading(false);
      }, 1000);
    } else {
      setCurrentQuestion(null);
    }
  };

  const gradeAnswer = async (answer) => {
    try {
      setLoading(true);

      const payload = {
        question: currentQuestion.question,
        answer,
      };

      const requestResponse = await requestInterviewGrading(payload);
      if (!!!requestResponse?.data) {
        throw new Error("Error sending grading request");
      }

      const gradingResponse = await getInterviewGrading(requestResponse.data);
      if (!!!gradingResponse?.data?.gradingResult) {
        throw new Error("Error getting grading results");
      }

      setGradingResults((prev) => [
        ...prev,
        gradingResponse.data.gradingResult,
      ]);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: `${gradingResponse.data.gradingResult.feedback}`,
        },
      ]);

      setLoading(false);

      sendNextQuestion();
    } catch (err) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: `I had difficulties analyzing your response, please re-send it.`,
        },
      ]);
      toastr.error(`Error sending answer. ${err.message}`);
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      var value = e.target.value;
      e.target.value = value.substring(0, start) + "\n" + value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    }

    if (
      (e.key === "Enter" && !!!e.shiftKey) ||
      e.currentTarget?.dataset?.send === "1"
    ) {
      e.preventDefault();
      const message = input.trim();

      let messageWithoutExtraLines = message
        .replace(/(\r\n|\n|\r)+/gm, "")
        .trim();
      if (messageWithoutExtraLines.length > 0) {
        setMessages([...messages, { sender: "user", text: message }]);

        gradeAnswer(message);

        setInput("");
      }
    }
  };

  const sendInitialMessages = useCallback(
    (firstQuestion) => {
      setLoading(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: `Welcome to the ${topic.text} interview. During this session, I will ask you five technical questions. Please respond to each question to the best of your ability. At the end of the interview, I will provide you with your final grade. Let's get started with the first question:`,
          },
        ]);
      }, 1000);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: `${firstQuestion.question}`,
          },
        ]);

        setCurrentQuestion(firstQuestion);
        setLoading(false);
      }, 2000);
    },
    [topic]
  );

  const fetchInterviewQuestions = useCallback(async () => {
    try {
      if (!!topic?.id) {
        const res = await getInterviewQuestions(topic.id);
        const interviewQuestions = res.data;
        const firstQuestion = interviewQuestions.pop();

        sendInitialMessages(firstQuestion);

        setQuestions(interviewQuestions);
      }
    } catch (err) {
      toastr.error(`Error fetching interview questions: ${err.message}`);
    }
  }, [topic, sendInitialMessages]);

  useEffect(() => {
    fetchInterviewQuestions();
  }, [fetchInterviewQuestions]);

  useEffect(() => {
    setTopic({ ...state });
  }, [state]);

  useEffect(() => {
    if (shouldInterviewFinish) {
      finishInterview();
    }
  }, [finishInterview, shouldInterviewFinish]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="new-interview__root">
      <h1 className="new-interview__header">{topic?.text} Interview</h1>
      <div className="new-interview__chatbox-container">
        {" "}
        <div className="new-interview__chatbox" ref={chatboxRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`new-interview__message new-interview__message--${message.sender}`}
            >
              <div
                className={`new-interview__message-box new-interview__message-box--${message.sender}`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="react-interview__message react-interview__message--ai">
              <div className="react-interview__loader">
                <div className="react-interview__loader-dots">
                  <div className="react-interview__loader-dot"></div>
                  <div className="react-interview__loader-dot"></div>
                  <div className="react-interview__loader-dot"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="new-interview__input">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleSend}
            rows="3"
            placeholder="Type your answer..."
            disabled={loading || interviewFinished}
            autoCorrect="on"
          />
          <button
            onClick={handleSend}
            data-send="1"
            disabled={loading || interviewFinished}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewInterview;

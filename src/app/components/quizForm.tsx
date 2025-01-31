"use client";

import React from "react";

import { Quiz, Questions } from "@/app/types";
import ProgressBar from "@/app/components/progressBar";

interface QuizFormProps {
  quiz: Quiz;
}

type QuizState = {
  isErrored: boolean;
  isQuestionAnswered: boolean;
  isQuizComplete: boolean;
  isSelectedOptionCorrect: boolean;
  questions: Questions;
  questionsIndex: number;
  score: number;
  selectedOptionValue: string | undefined;
};

function createInitialState(questions: Questions) {
  if (questions.length === 0) throw Error("Questions array is empty.");

  return {
    isErrored: false,
    isQuestionAnswered: false,
    isQuizComplete: false,
    isSelectedOptionCorrect: false,
    questions,
    questionsIndex: 0,
    score: 0,
    selectedOptionValue: undefined,
  };
}

function reducer(
  state: QuizState,
  action: {
    type: string;
    selectedOptionValue?: string;
  },
) {
  switch (action.type) {
    case "answered_question":
      return {
        ...state,
        isErrored: false,
        isQuestionAnswered: true,
        isSelectedOptionCorrect:
          state.questions[state.questionsIndex].answer ===
          state.selectedOptionValue,
        score:
          state.questions[state.questionsIndex].answer ===
          state.selectedOptionValue
            ? state.score + 1
            : state.score,
      };
    case "incremented_question":
      return {
        ...state,
        isErrored: false,
        isQuestionAnswered: false,
        isQuizComplete: state.questionsIndex === state.questions.length - 1,
        questionsIndex: state.isQuizComplete
          ? state.questionsIndex
          : state.questionsIndex + 1,
        selectedOptionValue: undefined,
      };
    case "selected_option":
      if (action.selectedOptionValue === undefined)
        throw Error(
          "Selected option value not provided to dispatch. (action.selectedOptionValue)",
        );
      return {
        ...state,
        isErrored: false,
        selectedOptionValue: action.selectedOptionValue,
      };
    case "errored":
      return {
        ...state,
        isErrored: true,
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
}

export default function QuizForm({ quiz }: QuizFormProps) {
  const [state, dispatch] = React.useReducer(
    reducer,
    quiz.questions,
    createInitialState,
  );
  const formRef = React.useRef<HTMLFormElement | null>(null);

  React.useEffect(() => {
    if (state.isQuizComplete) {
      document.title = `You scored ${state.score} out of ${quiz.questions.length} | Frontend Quiz`;
      return;
    }

    document.title = `Question ${state.questionsIndex + 1} of ${quiz.questions.length} | Frontend Quiz`;
  }, [state.questionsIndex]);

  /* Event handlers */
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOptionValue = e.target.value;
    dispatch({ type: "selected_option", selectedOptionValue });
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    if (state.selectedOptionValue === undefined) {
      dispatch({ type: "errored" });
      return;
    }

    if (state.isQuestionAnswered) {
      dispatch({ type: "incremented_question" });
      formRef.current.reset();
      return;
    }

    dispatch({ type: "answered_question" });
  };

  return (
    <>
      {state.isQuizComplete ? (
        <>
          <h1 className="mb-4 text-[clamp(2.5rem,5vw+1rem,4rem)] font-thin leading-[1.2]">
            Quiz completed
            <span className="block font-medium">You scored...</span>
          </h1>
          <div className="rounded-xl bg-option p-8">
            <div className="mx-auto grid w-fit grid-cols-[2.5rem,min-content] grid-rows-[2.5rem,1fr] gap-4">
              <div
                className="w-10 rounded-md"
                style={{ background: quiz.color }}
              >
                <img
                  src={quiz.icon.substring(1)}
                  alt={`${quiz.title} icon`}
                  className="p-1"
                />
              </div>
              <h2 className="content-center text-md font-medium">
                {quiz.title}
              </h2>
              <p className="col-span-2 text-center">
                <span className="mb-4 block text-[5.5rem]/[1] font-medium">
                  {state.score}
                </span>
                out of {quiz.questions.length}
              </p>
            </div>
          </div>
          <a
            className="mt-3 block w-full rounded-xl bg-purple py-5 text-center text-md font-medium"
            href="/"
          >
            Play Again
          </a>
        </>
      ) : (
        <>
          <p className="mb-3 text-xs italic text-subtitle">
            Question {state.questionsIndex + 1} of {quiz.questions.length}
          </p>
          <h2 className="text-lg font-medium">
            {state.questions[state.questionsIndex].question}
          </h2>{" "}
          <ProgressBar
            max={state.questions.length}
            now={state.questionsIndex}
            outerBarClassName="bg-option h-4 mt-6 p-1 rounded-xl"
            innerBarClassName="bg-purple rounded-xl"
          />
          <form
            className="mt-10 font-medium"
            onSubmit={handleOnSubmit}
            ref={formRef}
          >
            {typeof state.questions === undefined
              ? null
              : state.questions[state.questionsIndex].options.map(
                  (option: string, index: number) => (
                    <label
                      className={`mt-3 grid cursor-pointer grid-cols-[2.5rem_1fr_2.5rem] items-center gap-4 rounded-2xl border-[3px] border-transparent bg-option px-3 py-2 ${state.isQuestionAnswered ? (option === state.questions[state.questionsIndex].answer ? "has-[:checked]:border-green" : "has-[:checked]:border-red") : "has-[:checked]:border-purple"}`}
                      key={option}
                    >
                      <input
                        className="peer absolute opacity-0"
                        type="radio"
                        value={option}
                        name="option"
                        onChange={handleOnChange}
                        disabled={state.isQuestionAnswered}
                      />
                      <div
                        className={`max-w-10 rounded-md bg-grey text-navy-grey peer-checked:text-white ${state.isQuestionAnswered ? (option === state.questions[state.questionsIndex].answer ? "peer-checked:bg-green" : "peer-checked:bg-red") : "peer-checked:bg-purple"}`}
                        aria-hidden="true"
                      >
                        <p className="w-10 py-2 text-center">
                          {String.fromCharCode("A".charCodeAt(0) + index)}
                        </p>
                      </div>
                      <span>{option}</span>
                      {state.isQuestionAnswered &&
                      option ===
                        state.questions[state.questionsIndex].answer ? (
                        <img src="/assets/images/icon-correct.svg" />
                      ) : null}
                      {state.isQuestionAnswered &&
                      !state.isSelectedOptionCorrect &&
                      option === state.selectedOptionValue ? (
                        <img src="/assets/images/icon-incorrect.svg" />
                      ) : null}
                    </label>
                  ),
                )}
            <input
              className="mt-3 w-full rounded-xl bg-purple py-5 text-md font-medium"
              type="submit"
              value="Submit Answer"
            />
          </form>
          {state.isErrored ? (
            <div className="mx-auto mt-3 flex w-fit items-center gap-2">
              <img src="/assets/images/icon-incorrect.svg" className="w-8" />
              <p>Please select an answer</p>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

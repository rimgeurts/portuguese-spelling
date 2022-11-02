import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  selectedQuizId: "",
  activeQuestionId: "",
  activeQuestionIndex: "",
  activeAnswerId: "",
  questions: [],
  answers: [],
  quizTitle: "",
  currentQuestionIndexOpened: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateSelectedQuizId: (state, action) => {
      state.selectedQuizId = action.payload.selectedQuizId;
    },
    updateActiveQuestionId: (state, action) => {
      state.activeQuestionId = action.payload.activeQuestionId;
    },
    updateActiveQuestionIndex: (state, action) => {
      state.activeQuestionIndex = action.payload.activeQuestionIndex;
    },
    updateActiveAnswerId: (state, action) => {
      state.activeAnswerId = action.payload.activeAnswerId;
    },
    updateActiveAnswerIndex: (state, action) => {
      state.activeAnswerIndex = action.payload.activeAnswerIndex;
    },
    updateQuizTitle: (state, action) => {
      state.quizTitle = action.payload.quizTitle;
    },
    addQuestions: (state, action) => {
      console.log({ action });
      state.questions = action.payload.questions;
    },
    updateQuestion: (state, action) => {
      const { questionIndex, questionTitle } = action.payload;
      state.questions.data[questionIndex].attributes.title = questionTitle;
    },
    updateAnswer: (state, action) => {
      const { questionIndex, answerIndex, answerTitle } = action.payload;
      state.questions.data[questionIndex].attributes.answers.data[answerIndex].attributes.title = answerTitle;
    },
  },
});

// Action creators are generated for each case reducer function
export const selectUI = (state) => state.ui;
export const {
  updateSelectedQuizId,
  updateQuizTitle,
  addQuestions,
  updateActiveQuestionId,
  updateActiveAnswerId,
  updateActiveQuestionIndex,
  updateQuestion,
  updateAnswer,
  updateActiveAnswerIndex
} = uiSlice.actions;

export default uiSlice.reducer;

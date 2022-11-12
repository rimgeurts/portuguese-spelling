import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  selectedQuizId: "",
  activeQuestionId: "",
  activeQuestionIndex: 0,
  activeAnswerId: "",
  activeAnswerIndex: 0,
  hasActiveQuestionChanged: false,
  question: "",
  answers: [],
  quizTitle: "",
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
      state.questions = action.payload.questions;
    },
    updateQuestion: (state, action) => {
      state.question = action.payload.questionTitle;
    },
    updateAnswer: (state, action) => {
      state.answers = action.payload.updatedAnswers;
    },
    updateHasActiveQuestionChanged: (state, action) => {
      state.hasActiveQuestionChanged = action.payload.hasActiveQuestionChanged;
    },

    updateUIState: (state, action) => {
      const keys = Object.keys(action.payload);
      keys.map((key) => {
        state[key] = action.payload[key];
      });
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
  updateActiveAnswerIndex,
  updateHasActiveQuestionChanged,
  updateUIState,
} = uiSlice.actions;

export default uiSlice.reducer;

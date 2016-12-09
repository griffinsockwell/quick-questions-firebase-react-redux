import { browserHistory } from 'react-router';
import * as types from './types';
import { authRef, providerGoogle, questionsRef, timeRef, answersRef } from '../reference';

export const checkAuth = () => (dispatch) => {
  authRef.onAuthStateChanged((user) => {
    if (user) {
      dispatch({ type: types.AUTH_RESULT, payload: user });
    } else {
      dispatch({ type: types.AUTH_RESULT, payload: null });
    }
  });
};

export const signIn = () => (dispatch) => {
  dispatch({ type: types.AUTHENTICATING });

  authRef
    .signInWithRedirect(providerGoogle)
    .then(() => {
      authRef
        .getRedirectResult()
        .then((result) => {
          dispatch({ type: types.AUTH_RESULT, payload: result.user });
        });
    });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: types.AUTHENTICATING });

  authRef
    .signOut()
    .then(() => {
      dispatch({ type: types.AUTH_RESULT, payload: null });
    });
};

export const setQuestionText = text => ({
  type: types.SET_QUESTION_TEXT,
  payload: text,
});

export const submitQuestion = text => (dispatch) => {
  const { currentUser } = authRef;

  const newQuestion = {
    answers: 0,
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    text,
    timestamp: timeRef,
    uid: currentUser.uid,
  };

  const questionKey = questionsRef.push().key;

  // Add the question to firebase
  // then push the browser to the question
  questionsRef
    .child(questionKey)
    .set(newQuestion)
    .then(() => {
      dispatch({ type: types.SUBMIT_QUESTION_SUCCESS });
      browserHistory.push(`/question/${questionKey}`);
    }, (error) => {
      dispatch({ type: types.SUBMIT_QUESTION_ERROR, payload: error });
    });
};

export const startListeningForQuestions = () => (dispatch) => {
  questionsRef.on('value', (snap) => {
    const questions = [];
    snap.forEach((shot) => {
      questions.push({ ...shot.val(), key: shot.key });
    });
    dispatch({ type: types.QUESTIONS_START_LISTENING, payload: questions });
  });
};

export const stopListeningForQuestions = () => (dispatch) => {
  questionsRef.off('value');
  dispatch({ type: types.QUESTIONS_STOP_LISTENING });
};

export const startListeningForMyQuestions = uid => (dispatch) => {
  questionsRef
    .orderByChild('uid')
    .equalTo(uid)
    .on('value', (snap) => {
      const questions = [];
      snap.forEach((shot) => {
        questions.push({ ...shot.val(), key: shot.key });
      });
      dispatch({ type: types.MY_QUESTIONS_START_LISTENING, payload: questions });
    });
};

export const stopListeningForMyQuestions = uid => (dispatch) => {
  questionsRef
    .orderByChild('uid')
    .equalTo(uid)
    .off('value');
  dispatch({ type: types.MY_QUESTIONS_STOP_LISTENING });
};

export const fetchQuestion = questionId => (dispatch) => {
  questionsRef
    .child(questionId)
    .once('value', (snap) => {
      const question = { ...snap.val(), key: snap.key };
      dispatch({ type: types.FETCH_QUESTION, payload: question });
    });
};

export const resetQuestion = () => ({
  type: types.RESET_QUESTION,
});

export const setAnswerText = text => ({
  type: types.SET_ANSWER_TEXT,
  payload: text,
});

export const submitAnswer = (text, questionId) => (dispatch) => {
  const { currentUser } = authRef;

  const newAnswer = {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    questionId,
    text,
    timestamp: timeRef,
    uid: currentUser.uid,
  };

  // Add the answer to firebase
  // then increment answers on the question by 1
  answersRef
    .push(newAnswer)
    .then(() => {
      questionsRef
        .child(`${questionId}/answers`)
        .transaction((answers) => {
          let answerCount = answers;
          answerCount += 1;
          return answerCount;
        });
    })
    .then(() => {
      dispatch({ type: types.SUBMIT_ANSWER_SUCCESS });
    }, (error) => {
      dispatch({ type: types.SUBMIT_ANSWER_ERROR, payload: error });
    });
};

export const resetAnswerForm = () => ({
  type: types.RESET_ANSWER_FORM,
});

export const startListeningForAnswers = questionId => (dispatch) => {
  answersRef
    .orderByChild('questionId')
    .equalTo(questionId)
    .on('value', (snap) => {
      const answers = [];
      snap.forEach((shot) => {
        answers.push({ ...shot.val(), key: shot.key });
      });
      dispatch({ type: types.ANSWERS_START_LISTENING, payload: answers });
    });
};

export const stopListeningForAnswers = questionId => (dispatch) => {
  answersRef
    .orderByChild('questionId')
    .equalTo(questionId)
    .off('value');
  dispatch({ type: types.ANSWERS_STOP_LISTENING });
};

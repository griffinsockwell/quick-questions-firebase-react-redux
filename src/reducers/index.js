import { combineReducers } from 'redux';

import AnswerFormReducer from './AnswerFormReducer';
import AnswersReducer from './AnswersReducer';
import AuthReducer from './AuthReducer';
import MyQuestionsReducer from './MyQuestionsReducer';
import QuestionFormReducer from './QuestionFormReducer';
import QuestionReducer from './QuestionReducer';
import QuestionsReducer from './QuestionsReducer';

export default combineReducers({
  answerForm: AnswerFormReducer,
  answers: AnswersReducer,
  auth: AuthReducer,
  myQuestions: MyQuestionsReducer,
  questionForm: QuestionFormReducer,
  question: QuestionReducer,
  questions: QuestionsReducer,
});

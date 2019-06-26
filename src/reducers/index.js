import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';


const context = require.context('./', true, /\.js$/);
const keys    = context.keys().filter(item => item !== './index.js');

const reducers = keys.reduce((memo, key) => {
  const reducer  = context(key).default;
  // filename as store key
  const storeKey = key.match(/([^\/]+)\.js$/)[1];

  memo[storeKey] = combineReducers(reducer);
  return memo;
}, {});

export default reducers;

export function createListReducer(actionNames) {

  return handleActions(
    {
      [actionNames[0]](state) {

        return {
          ...state,
          loading: true
        };
      },
      [actionNames[1]](state, action) {
          
        return {
          ...state,
          items: action.payload,
          error: null,
          loading: false,
          invalid: false,
        };
      },
      [actionNames[2]](state, action) {
        return {
          ...state,
          items: [],
          error: action.error,
          loading: false,
          invalid: true
        };
      },
    },
    {
      items: [],
      error: null,
      loading: false,
      invalid: true,
    }
  );
}

export function createQueryReducer(actionNames, processor) {
  return handleActions(
    {
      [actionNames[0]](state, action) {
        return {
          ...state,
          items: [],
          keyword: action.payload,
          loading: true
        };
      },
      [actionNames[1]](state, action) {
        return {
          ...state,
          items: processor ? processor(action.payload) : action.payload,
          error: null,
          loading: false,
        };
      },
      [actionNames[2]](state, action) {
        return {
          ...state,
          items: [],
          error: action.error,
          loading: false
        };
      },
    },
    {
      items: [],
      error: null,
      keyword: null,
      loading: false,
    }
  );
}

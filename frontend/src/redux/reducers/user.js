import { enableUser } from '../actions/user';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_RESET,
  // Below are for fetching one user
  FETCH_ONE_USER_REQUEST,
  FETCH_ONE_USER_SUCCESS,
  FETCH_ONE_USER_FAIL,
  FETCH_ONE_USER_RESET,
  // Below are 4 reducer to fetch all patient name
  FETCH_ALL_PATIENT_REQUEST,
  FETCH_ALL_PATIENT_SUCCESS,
  FETCH_ALL_PATIENT_FAIL,
  FETCH_ALL_PATIENT_RESET,
  // Below are 4 reducers to create new user
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_RESET,
  // Below are 4 reducers to enable a user
  ENABLE_USER_REQUEST,
  ENABLE_USER_SUCCESS,
  ENABLE_USER_FAIL,
  ENABLE_USER_RESET,
  // Below are 4 reducers to change password
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_RESET,
  // Below are 4 reducers for confirm user registration
  CONFIRM_REGISTRATION_REQUEST,
  CONFIRM_REGISTRATION_SUCCESS,
  CONFIRM_REGISTRATION_FAIL,
  CONFIRM_REGISTRATION_RESET,
  // Below are 4 reducers for delete user
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
} from '../types/user';

const initialState = {
  // Below are states for fetch all user
  allUserInfo: null,
  fetchLoaded: false,
  fetchError: false,
  // Below are status for fetching one user
  oneUserInfo: null,
  fetchOneLoaded: false,
  fetchOneError: false,
  // Below are status for fetching all patients
  allPatientsInfo: null,
  fetchAllPatientLoaded: false,
  fetchAllPatientError: false,
  // Below are status for creating new user
  newUserInfo: null,
  createLoaded: false,
  createError: false,
  // Below are status for enabling user
  enableUserResult: null,
  enableUserLoaded: false,
  enableUserError: false,
  // Below are status for changing password
  changePasswordResult: null,
  changePasswordLoaded: false,
  changePasswordError: false,
  // Below are status for confirming registration
  confirmResult: null,
  confirmLoaded: false,
  confirmError: false,
  // Below are status for deleting user
  deleteResult: null,
  deleteLoaded: false,
  deleteError: false,
};

const UserInformation = (state = initialState, action) => {
  switch (action.type) {
    // Below are reducers for fechting all user's name
    case FETCH_USER_REQUEST: {
      return {
        ...state,
        allUserInfo: null,
        fetchLoaded: false,
        fetchError: false,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        allUserInfo: action.payload.data,
        fetchLoaded: true,
      };
    }
    case FETCH_USER_FAIL: {
      return {
        ...state,
        fetchLoaded: false,
        fetchError: action.payload,
      };
    }
    case FETCH_USER_RESET: {
      return {
        ...state,
        allUserInfo: null,
        fetchLoaded: false,
        fetchError: false,
      };
    }
    // Below are reducers to fetch all one user's information
    case FETCH_ONE_USER_REQUEST: {
      return {
        ...state,
        oneUserInfo: null,
        fetchOneLoaded: false,
        fetchOneError: false,
      };
    }
    case FETCH_ONE_USER_SUCCESS: {
      return {
        ...state,
        oneUserInfo: action.payload.data,
        fetchOneLoaded: true,
      };
    }
    case FETCH_ONE_USER_FAIL: {
      return {
        ...state,
        fetchOneLoaded: false,
        fetchOneError: action.payload,
      };
    }
    case FETCH_ONE_USER_RESET: {
      return {
        ...state,
        oneUserInfo: null,
        fetchOneLoaded: false,
        fetchOneError: false,
      };
    }
    // Below are reducers to fetch all Patients for assign work.
    case FETCH_ALL_PATIENT_REQUEST: {
      return {
        ...state,
        allPatientsInfo: null,
        fetchAllPatientLoaded: false,
        fetchAllPatientError: false,
      };
    }
    case FETCH_ALL_PATIENT_SUCCESS: {
      return {
        ...state,
        allPatientsInfo: action.payload.data,
        fetchAllPatientLoaded: true,
      };
    }
    case FETCH_ALL_PATIENT_FAIL: {
      return {
        ...state,
        fetchAllPatientLoaded: false,
        fetchAllPatientError: action.payload,
      };
    }
    case FETCH_ALL_PATIENT_RESET: {
      return {
        ...state,
        allPatientsInfo: null,
        fetchAllPatientLoaded: false,
        fetchAllPatientError: false,
      };
    }
    // Below are reducers to create new user.
    case CREATE_USER_REQUEST: {
      return {
        ...state,
        newUserInfo: null,
        createLoaded: false,
        createError: false,
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        newUserInfo: action.payload.data,
        createLoaded: true,
      };
    }
    case CREATE_USER_FAIL: {
      return {
        ...state,
        createLoaded: false,
        createError: action.payload,
      };
    }
    case CREATE_USER_RESET: {
      return {
        ...state,
        newUserInfo: null,
        createLoaded: false,
        createError: false,
      };
    }
    // Below are reducers to enable user
    case ENABLE_USER_REQUEST: {
      return {
        ...state,
        enableUserResult: null,
        enableUserLoaded: false,
        enableUserError: false,
      };
    }
    case ENABLE_USER_SUCCESS: {
      return {
        ...state,
        enableUserResult: action.payload.data,
        enableUserLoaded: true,
      };
    }
    case ENABLE_USER_FAIL: {
      return {
        ...state,
        enableUserLoaded: false,
        enableUserError: action.payload,
      };
    }
    case ENABLE_USER_RESET: {
      return {
        ...state,
        enableUserResult: null,
        enableUserLoaded: false,
        enableUserError: false,
      };
    }
    // Below are reducers to change password
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        changePasswordResult: null,
        changePasswordLoaded: false,
        changePasswordError: false,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordResult: action.payload.data,
        changePasswordLoaded: true,
      };
    }
    case CHANGE_PASSWORD_FAIL: {
      return {
        ...state,
        changePasswordLoaded: false,
        changePasswordError: action.payload,
      };
    }
    case CHANGE_PASSWORD_RESET: {
      return {
        ...state,
        changePasswordResult: null,
        changePasswordLoaded: false,
        changePasswordError: false,
      };
    }
    // Below are reducers to confirm registration
    case CONFIRM_REGISTRATION_REQUEST: {
      return {
        ...state,
        confirmResult: null,
        confirmLoaded: false,
        confirmError: false,
      };
    }
    case CONFIRM_REGISTRATION_SUCCESS: {
      return {
        ...state,
        confirmResult: action.payload.data,
        confirmLoaded: true,
      };
    }
    case CONFIRM_REGISTRATION_FAIL: {
      return {
        ...state,
        confirmLoaded: false,
        confirmError: action.payload.error,
      };
    }
    case CONFIRM_REGISTRATION_RESET: {
      return {
        ...state,
        confirmResult: null,
        confirmLoaded: false,
        confirmError: false,
      };
    }
    // Below are reducers to delete users
    case DELETE_USER_REQUEST: {
      return {
        ...state,
        deleteResult: null,
        deleteLoaded: false,
        deleteError: false,
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        deleteResult: action.payload.data,
        deleteLoaded: true,
      };
    }
    case DELETE_USER_FAIL: {
      return {
        ...state,
        deleteLoaded: false,
        deleteError: action.payload.error,
      };
    }
    case DELETE_USER_RESET: {
      return {
        ...state,
        deleteResult: null,
        deleteLoaded: false,
        deleteError: false,
      };
    }
    default:
      return state;
  }
};

export default UserInformation;

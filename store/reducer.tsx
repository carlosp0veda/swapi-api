import {ActionTypes} from './actions'
import {Character, CharacterImage, Film} from '../interfaces/interfaces'

const initialState = {
  characters: [],
  films: [],
  images: [],
  currentPage: 1,
};


type ACTIONS  = 
| {
  type: ActionTypes.NEXT,
  payload: number
}
| {
  type: ActionTypes.PREV,
  payload: number
}
| {
  type: ActionTypes.UPDATE_CHARACTER,
  payload: Character[]
}
| {
  type: ActionTypes.UPDATE_FILMS,
  payload: Film[]
} 
| {
  type: ActionTypes.UPDATE_IMAGES,
  payload: CharacterImage[]
} 




const nextPage = (state: typeof initialState, action: ACTIONS) => {
  return { ...state, currentPage: state.currentPage+1};
};

const prevPage = (state: typeof initialState, action: ACTIONS) => {
  return { ...state, currentPage: state.currentPage-1};
};

const updateCharacters = (state: typeof initialState, action: ACTIONS) => {
  return { ...state, characters: action.payload };
};

const updateFilms = (state: typeof initialState, action: ACTIONS) => {
  return { ...state, films: action.payload};
};

const updateImages = (state: typeof initialState, action: ACTIONS) => {
  return { ...state, images: action.payload};
};


const reducer = (state: any, action:ACTIONS) => {
  switch (action.type) {
    case ActionTypes.NEXT:
      return nextPage(state,action);
    case ActionTypes.PREV:
      return prevPage(state,action);
    case ActionTypes.UPDATE_CHARACTER:
      return updateCharacters(state,action);
    case ActionTypes.UPDATE_FILMS:
      return updateFilms(state, action);
    case ActionTypes.UPDATE_IMAGES:
      return updateImages(state, action);
    default:
        return state;
  }
};

export default reducer;







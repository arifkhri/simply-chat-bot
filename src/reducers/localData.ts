const localDataReducer = (state: any, action: {type: 'update' | 'delete', name: string, value: any}) => {
  switch (action.type) {
  case 'update':
    return ({
      ...state,
      [action.name]: action.value
    });
  case 'delete':
    delete state[action.name];
    return state;
  default:
    return state;
  }
};

export default localDataReducer;

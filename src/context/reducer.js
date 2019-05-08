export default (state, action) => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case 'removeUser':
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case 'setChats':
      return {
        ...state,
        chats: action.payload,
      };
    default:
      return state;
  }
};

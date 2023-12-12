import axios from 'axios';

const checkTokenUser = async (token, dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post('http://localhost:8000/authentication/loginToken/', {}, config);

    if (response.status === 200) {
        dispatch({ type: 'SET_USER', payload: response.data.data});
    }

    console.log('Token überprüft:', response.data);
    return response;
  } catch (error) {
    console.error('Fehler bei der Token-Überprüfung:', error);
    throw error;
  }
};

export default checkTokenUser;
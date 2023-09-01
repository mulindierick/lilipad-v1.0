import firestore from '@react-native-firebase/firestore';
import useUser from './useUser';

const usePost = () => {
  const {user} = useUser();
  return {};
};

export default usePost;

import firestore from '@react-native-firebase/firestore';
import useUser from './useUser';

const usePost = () => {
  const {user} = useUser();
  const {uploadImage} = useUser();

  const fetchPostsOfAllSpaces = async arrayOfSpaces => {
    // Here is the array of spaces, and you want to get all posts of these spaces from Promise.all through Firebase
    const promiseToGetPostOfAllSpaces = arrayOfSpaces.map(space => {
      // return firestore().collection(`spaces/${space}/posts`).get();
      return new Promise((res, rej) => {
        firestore()
          .collection(`spaces/${space}/posts`)
          .orderBy('createdAt', 'desc')
          .get()
          .then(data => {
            res(data);
          })
          .catch(err => {
            rej(err);
          });
      });
    });

    const data = await Promise.allSettled(promiseToGetPostOfAllSpaces).then(
      async data => {
        return await Promise.all(
          data.map(async item => {
            if (item.status === 'fulfilled') {
              const post = item.value.docs.map(async doc => {
                return {
                  ...doc.data(),
                  user: await doc.data().createdByReference.get(),
                };
              });
              return await Promise.all(post);
            }
          }),
        );
      },
    );

    let SpaceDataObject = {};
    arrayOfSpaces.forEach((space, index) => {
      SpaceDataObject[space] = data[index];
    });

    return SpaceDataObject;
  };

  const fetchPostsOfSpecificSpace = async spaceName => {
    const spaceData = await firestore()
      .collection(`spaces/${spaceName}/posts`)
      .orderBy('createdAt', 'desc')
      .get();

    const post = await Promise.all(
      spaceData.docs.map(async item => {
        return {
          ...item.data(),
          user: await item.data().createdByReference.get(),
        };
      }),
    );
    return post;
  };

  const sharePost = async (spaceName, object) => {
    const {text, image} = object;
    try {
      const postId = firestore().collection(`spaces/${spaceName}/posts`).doc();
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image, postId.id);
      }
      const res = await firestore()
        .collection(`spaces/${spaceName}/posts`)
        .doc(postId.id)
        .set({
          text: text,
          postPhoto: imageUrl,
          likes: [],
          comments: [],
          createdAt: firestore.FieldValue.serverTimestamp(),
          createdBy: user?.firebaseUserId,
          createdByReference: firestore().doc(
            `accounts/${user?.firebaseUserId}`,
          ),
          likesCount: 0,
          commentsCount: 0,
          postId: postId.id,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllSpaces = async () => {
    try {
      const data = await firestore().collection('spaces').get();
      return data.docs;
    } catch (err) {
      console.log({err});
    }
  };

  return {
    fetchPostsOfAllSpaces,
    sharePost,
    fetchPostsOfSpecificSpace,
    fetchAllSpaces,
  };
};

export default usePost;

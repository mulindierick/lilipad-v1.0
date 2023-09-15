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
                let userLiked = false;
                if (doc.data().likesCount > 0) {
                  const likes = await firestore()
                    .collection(
                      `spaces/${doc.data().spaceName}/posts/${
                        doc.data().postId
                      }/likes`,
                    )
                    .doc(user?.firebaseUserId)
                    .get();
                  if (likes?._data?.userId === user?.firebaseUserId) {
                    userLiked = true;
                  }
                }
                return {
                  ...doc.data(),
                  user: await doc.data().createdByReference.get(),
                  userLiked: userLiked,
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
          userLiked: false,
        };
      }),
    );
    console.log({post});
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
          createdAt: firestore.FieldValue.serverTimestamp(),
          createdBy: user?.firebaseUserId,
          createdByReference: firestore().doc(
            `accounts/${user?.firebaseUserId}`,
          ),
          likesCount: 0,
          commentsCount: 0,
          postId: postId.id,
          spaceName: spaceName,
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

  const handlePostLike = async (spaceName, postId, like) => {
    try {
      if (like) {
        const likeIdTask = await firestore()
          .collection(`spaces/${spaceName}/posts/${postId}/likes`)
          .doc(user?.firebaseUserId)
          .delete();
        const countIncrementTask = await firestore()
          .collection(`spaces/${spaceName}/posts`)
          .doc(postId)
          .update({
            likesCount: firestore.FieldValue.increment(-1),
          });
      } else {
        const likeIdTask = await firestore()
          .collection(`spaces/${spaceName}/posts/${postId}/likes`)
          .doc(user?.firebaseUserId)
          .set({
            userId: user?.firebaseUserId,
            postId: postId,
            likedAt: firestore.FieldValue.serverTimestamp(),
          });
        const countIncrementTask = await firestore()
          .collection(`spaces/${spaceName}/posts`)
          .doc(postId)
          .update({
            likesCount: firestore.FieldValue.increment(1),
          });
      }
    } catch (err) {
      console.log({err});
    }
  };

  const fetchPostById = async (postId, spaceName) => {
    try {
      const data = await firestore()
        .collection(`spaces/${spaceName}/posts`)
        .doc(postId)
        .get();
      let userLiked = false;
      if (data?._data.likesCount > 0) {
        const likes = await firestore()
          .collection(
            `spaces/${data?._data.spaceName}/posts/${data?._data.postId}/likes`,
          )
          .doc(user?.firebaseUserId)
          .get();
        if (likes?._data?.userId === user?.firebaseUserId) {
          userLiked = true;
        }
      }
      const comments = await firestore()
        .collection(`spaces/${spaceName}/posts/${postId}/comments`)
        .orderBy('createdAt', 'desc')
        .get();
      let commentData = [];

      if (comments.docs.length > 0) {
        commentData = await Promise.all(
          comments.docs.map(async item => {
            return {
              ...item.data(),
              user: await item.data().createdByReference.get(),
            };
          }),
        );
      }

      console.log({comments});
      return {
        data: data?._data,
        user: await data?._data?.createdByReference.get(),
        userLiked: userLiked,
        comments: commentData,
      };
    } catch (err) {
      console.log({err});
    }
  };

  const AddComment = async (spaceName, postId, text) => {
    try {
      const commentId = firestore()
        .collection(`spaces/${spaceName}/posts/${postId}/comments`)
        .doc();
      const res = await firestore()
        .collection(`spaces/${spaceName}/posts/${postId}/comments`)
        .doc(commentId.id)
        .set({
          text: text,
          createdAt: firestore.FieldValue.serverTimestamp(),
          userId: user?.firebaseUserId,
          createdByReference: firestore().doc(
            `accounts/${user?.firebaseUserId}`,
          ),
          commentId: commentId.id,
        });
      const countIncrementTask = await firestore()
        .collection(`spaces/${spaceName}/posts`)
        .doc(postId)
        .update({
          commentsCount: firestore.FieldValue.increment(1),
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdatedComments = async (spaceName, postId) => {
    try {
      console.log({spaceName, postId});
      const comments = await firestore()
        .collection(`spaces/${spaceName}/posts/${postId}/comments`)
        .orderBy('createdAt', 'desc')
        .get();

      let commentData = [];
      console.log({comments});
      if (comments.docs.length > 0) {
        commentData = await Promise.all(
          comments.docs.map(async item => {
            return {
              ...item.data(),
              user: await item.data().createdByReference.get(),
            };
          }),
        );
      }
      return commentData;
    } catch (err) {
      console.log({err});
    }
  };

  return {
    fetchPostsOfAllSpaces,
    sharePost,
    fetchPostsOfSpecificSpace,
    fetchAllSpaces,
    handlePostLike,
    fetchPostById,
    AddComment,
    fetchUpdatedComments,
  };
};

export default usePost;

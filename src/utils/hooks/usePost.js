import firestore from '@react-native-firebase/firestore';
import useUser from './useUser';
import {useDispatch} from 'react-redux';
import {
  setNewNotification,
  setPostCommentCount,
} from '../../redux/reducers/generalSlice';
import {
  useActivityRecorderMutation,
  useSendNewPostNotificationMutation,
  useSentNotificationMutation,
} from '../../redux/apis';

const usePost = () => {
  const {user} = useUser();
  const [sentNotification] = useSentNotificationMutation();
  const [activityRecorder] = useActivityRecorderMutation();
  const [sendNewPostNotification] = useSendNewPostNotificationMutation();

  const {uploadImage} = useUser();
  const dispatch = useDispatch();

  const fetchPostsOfAllSpaces = async (arrayOfSpaces, spacesKeys) => {
    // Here is the array of spaces, and you want to get all posts of these spaces from Promise.all through Firebase
    const promiseToGetPostOfAllSpaces = arrayOfSpaces.map(space => {
      // return firestore().collection(`spaces/${space}/posts`).get();
      return new Promise((res, rej) => {
        firestore()
          .collection(
            `Colleges/${user?.college}/spaces/${spacesKeys[space]}/posts`,
          )
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

    const res = await firestore()
      .collection('accounts')
      .doc(user?.firebaseUserId)
      .get();

    const lastVisitTime = res.data().groupLastVisit;

    const newPostsCount = await Promise.all(
      arrayOfSpaces.map(async space => {
        if (!lastVisitTime[space]) return 0;
        const data = await firestore()
          .collection(
            `Colleges/${user?.college}/spaces/${spacesKeys[space]}/posts`,
          )
          .where('createdAt', '>', lastVisitTime[space])
          .get();
        return data.docs.length;
      }),
    );

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
                      `Colleges/${user?.college}/spaces/${
                        doc.data().spaceId
                      }/posts/${doc.data().postId}/likes`,
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
    let newPostsCountData = {};
    arrayOfSpaces.forEach((space, index) => {
      SpaceDataObject[space] = {
        data: data[index],
        filter: 'Recent',
      };
      newPostsCountData[space] = newPostsCount[index];
    });
    CheckNewActivityUpdate();
    console.log({data});
    return {data: SpaceDataObject, newPostsCount: newPostsCountData};
  };

  const fetchPostsOfSpecificSpace = async spaceName => {
    const spaceData = await firestore()
      .collection(`Colleges/${user?.college}/spaces/${spaceName}/posts`)
      .orderBy('createdAt', 'desc')
      .get();

    const post = await Promise.all(
      spaceData.docs.map(async item => {
        let userLiked = false;
        if (item.data().likesCount > 0) {
          const likes = await firestore()
            .collection(
              `Colleges/${user?.college}/spaces/${spaceName}/posts/${
                item.data().postId
              }/likes`,
            )
            .doc(user?.firebaseUserId)
            .get();
          if (likes?._data?.userId === user?.firebaseUserId) {
            userLiked = true;
          }
        }
        return {
          ...item.data(),
          user: await item.data().createdByReference.get(),
          userLiked: userLiked,
        };
      }),
    );
    console.log({post});
    return post;
  };

  const fetchFilteredPostsOfSpecificSpace = async (spaceName, filter) => {
    console.log({spaceName}, {filter});

    let spaceData = null;
    if (filter == 'Recent') {
      spaceData = await firestore()
        .collection(
          `Colleges/${user?.college}/spaces/${user?.spaceId[spaceName]}/posts`,
        )
        .orderBy('createdAt', 'desc')
        .get();
    } else if (filter == 'Popular') {
      spaceData = await firestore()
        .collection(
          `Colleges/${user?.college}/spaces/${user?.spaceId[spaceName]}/posts`,
        )
        .orderBy('likesCount', 'desc')
        .get();
    } else if (filter == 'My Posts') {
      spaceData = await firestore()
        .collection(
          `Colleges/${user?.college}/spaces/${user?.spaceId[spaceName]}/posts`,
        )
        .where('createdBy', '==', user?.firebaseUserId)
        .get();
    }
    await firestore()
      .collection('accounts')
      .doc(user?.firebaseUserId)
      .set(
        {
          groupLastVisit: {
            [spaceName]: firestore.FieldValue.serverTimestamp(),
          },
        },
        {merge: true},
      );
    const post = await Promise.all(
      spaceData.docs.map(async item => {
        let userLiked = false;
        if (item.data().likesCount > 0) {
          const likes = await firestore()
            .collection(
              `Colleges/${user?.college}/spaces/${
                user?.spaceId[spaceName]
              }/posts/${item.data().postId}/likes`,
            )
            .doc(user?.firebaseUserId)
            .get();
          if (likes?._data?.userId === user?.firebaseUserId) {
            userLiked = true;
          }
        }
        return {
          ...item.data(),
          user: await item.data().createdByReference.get(),
          userLiked: userLiked,
        };
      }),
    );
    return post;
  };

  const sharePost = async (spaceName, object, spaceId) => {
    console.log({user});
    console.log({spaceId});
    const {text, image, video} = object;
    try {
      const postId = firestore()
        .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
        .doc();
      let mediaUrl = null;
      if (image) {
        mediaUrl = await uploadImage(image, postId.id);
      }
      if (video) {
        mediaUrl = await uploadImage(video, postId.id);
      }

      const res = await firestore()
        .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
        .doc(postId.id)
        .set({
          text: text,
          postPhoto: image ? mediaUrl : null,
          postVideo: video ? mediaUrl : null,
          createdAt: firestore.FieldValue.serverTimestamp(),
          createdBy: user?.firebaseUserId,
          createdByReference: firestore().doc(
            `accounts/${user?.firebaseUserId}`,
          ),
          likesCount: 0,
          commentsCount: 0,
          postId: postId.id,
          spaceName: spaceName,
          spaceId: spaceId,
        });
      sendNewPostNotification({
        userId: user?.firebaseUserId,
        postId: postId.id,
        spaceId: spaceId,
        spaceName: spaceName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllSpaces = async () => {
    try {
      const data = await firestore()
        .collection(`Colleges/${user?.college}/spaces`)
        .where('isActive', '==', true)
        .get();
      return data.docs;
    } catch (err) {
      console.log({err});
    }
  };

  const handlePostLike = async (
    spaceName,
    postId,
    like,
    postCreatorId,
    spaceId,
  ) => {
    console.log({spaceName});
    try {
      if (like) {
        const likeIdTask = await firestore()
          .collection(
            `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/likes`,
          )
          .doc(user?.firebaseUserId)
          .delete();
        const countIncrementTask = await firestore()
          .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
          .doc(postId)
          .update({
            likesCount: firestore.FieldValue.increment(-1),
          });
        activityRecorder({
          postId: postId,
          spaceId: spaceId,
          type: 'unlike',
          userId: postCreatorId,
          userIdWhoPerforemedActivity: user?.firebaseUserId,
          spaceName: spaceName,
        });
      } else {
        const likeIdTask = await firestore()
          .collection(
            `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/likes`,
          )
          .doc(user?.firebaseUserId)
          .set({
            userId: user?.firebaseUserId,
            postId: postId,
            likedAt: firestore.FieldValue.serverTimestamp(),
            spaceId: spaceId,
          });
        const countIncrementTask = await firestore()
          .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
          .doc(postId)
          .update({
            likesCount: firestore.FieldValue.increment(1),
          });
        sentNotification({
          userId: user?.firebaseUserId,
          postId: postId,
          spaceId: spaceId,
          type: 'like',
          spaceName: spaceName,
        });
        activityRecorder({
          postId: postId,
          spaceId: spaceId,
          type: 'like',
          userId: postCreatorId,
          userIdWhoPerforemedActivity: user?.firebaseUserId,
          spaceName: spaceName,
        });
      }
    } catch (err) {
      console.log({err});
    }
  };

  const fetchPostById = async (postId, spaceName) => {
    try {
      const data = await firestore()
        .collection(
          `Colleges/${user?.college}/spaces/${user?.spaceId[spaceName]}/posts`,
        )
        .doc(postId)
        .get();
      let userLiked = false;
      if (data?._data.likesCount > 0) {
        const likes = await firestore()
          .collection(
            `Colleges/${user?.college}/spaces/${user?.spaceId[spaceName]}/posts/${data?._data.postId}/likes`,
          )
          .doc(user?.firebaseUserId)
          .get();
        if (likes?._data?.userId === user?.firebaseUserId) {
          userLiked = true;
        }
      }
      const comments = await firestore()
        .collection(
          `Colleges/${user?.college}/spaces/${user?.spaceId[spaceName]}/posts/${postId}/comments`,
        )
        .orderBy('createdAt', 'asc')
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

  const AddComment = async (
    spaceName,
    postId,
    text,
    postCreatorId,
    spaceId,
  ) => {
    try {
      const commentId = firestore()
        .collection(
          `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/comments`,
        )
        .doc();
      const res = await firestore()
        .collection(
          `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/comments`,
        )
        .doc(commentId.id)
        .set({
          text: text,
          createdAt: firestore.FieldValue.serverTimestamp(),
          userId: user?.firebaseUserId,
          createdByReference: firestore().doc(
            `accounts/${user?.firebaseUserId}`,
          ),
          commentId: commentId.id,
          spaceName: spaceName,
          postId: postId,
          spaceId: spaceId,
        });
      const countIncrementTask = await firestore()
        .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
        .doc(postId)
        .update({
          commentsCount: firestore.FieldValue.increment(1),
        });
      activityRecorder({
        postId: postId,
        spaceId: spaceId,
        type: 'comment',
        userId: postCreatorId,
        userIdWhoPerforemedActivity: user?.firebaseUserId,
        spaceName: spaceName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdatedComments = async (spaceId, postId) => {
    try {
      const comments = await firestore()
        .collection(
          `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/comments`,
        )
        .orderBy('createdAt', 'asc')
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
      dispatch(
        setPostCommentCount({
          commentCount: commentData.length,
        }),
      );
      return commentData;
    } catch (err) {
      console.log({err});
    }
  };

  const fetchMyPost = async userId => {
    try {
      const data = await firestore()
        .collectionGroup(`posts`)
        .where('createdBy', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      const post = await Promise.all(
        data.docs.map(async item => {
          let userLiked = false;
          if (item.data().likesCount > 0) {
            const likes = await firestore()
              .collection(
                `Colleges/${user?.college}/spaces/${
                  item.data().spaceId
                }/posts/${item.data().postId}/likes`,
              )
              .doc(user?.firebaseUserId)
              .get();
            if (likes?._data?.userId === user?.firebaseUserId) {
              userLiked = true;
            }
          }
          return {
            ...item.data(),
            user: await item.data().createdByReference.get(),
            userLiked: userLiked,
          };
        }),
      );

      if (user?.firebaseUserId != userId) {
        const res = await firestore().collection('accounts').doc(userId).get();
        return {post: post, user: res.data()};
      }

      return post;
    } catch (e) {
      console.log({e});
    }
  };

  const fetchActivities = async () => {
    const data = await firestore()
      .collection(`accounts/${user?.firebaseUserId}/activity`)
      .orderBy('createdAt', 'desc')
      .get();

    const userData = await firestore()
      .collection('accounts')
      .doc(user?.firebaseUserId)
      .get();

    const sectionListData = await Promise.all(
      data.docs.map(async item => {
        const dayData = await firestore()
          .collection(
            `accounts/${user?.firebaseUserId}/activity/${item.id}/activities`,
          )
          .orderBy('lastUpdated', 'desc')
          .get();

        const eachDayData = await Promise.all(
          dayData.docs.map(async item => {
            if (item.data().users?.length > 0) {
              return {
                ...item.data(),
                newActivity:
                  item?.data()?.lastUpdated?._seconds >
                  userData?.data()?.lastActivitiesChecked?._seconds,
                lastUserDetail: await item.data().lastActivityPerformedBy.get(),
              };
            } else {
              return 'noData';
            }
          }),
        );

        console.log({eachDayData});

        const pureEachDayData = eachDayData.filter(item => item != 'noData');

        // const emptyValuesCheck = eachDayData.filter(item => item != 'noData');
        // if (emptyValuesCheck.length == 0) {
        //   return 'noData';
        // }

        return {
          title: item.id,
          data: pureEachDayData,
        };
      }),
    );

    const pureData = sectionListData.filter(item => item != 'noData');

    await firestore().collection('accounts').doc(user?.firebaseUserId).set(
      {
        lastActivitiesChecked: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    );
    dispatch(setNewNotification({newNotification: false}));

    const filteredData = pureData.filter(item => item.data.length > 0);

    return filteredData;
  };

  const CheckNewActivityUpdate = async () => {
    try {
      const data = await firestore()
        .collection(`accounts/${user?.firebaseUserId}/activity`)
        .orderBy('createdAt', 'desc')
        .get();

      const userData = await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .get();

      await Promise.all(
        data.docs.map(async item => {
          const dayData = await firestore()
            .collection(
              `accounts/${user?.firebaseUserId}/activity/${item.id}/activities`,
            )
            .orderBy('lastUpdated', 'desc')
            .get();

          if (dayData.docs.length > 0) {
            const lastUpdated = dayData.docs[0].data().lastUpdated;
            if (
              lastUpdated._seconds >
              userData.data().lastActivitiesChecked._seconds
            ) {
              dispatch(setNewNotification({newNotification: true}));
            }
          }
        }),
      );
    } catch (err) {
      console.log({err});
    }
  };

  const EditPost = async (spaceId, data, postId, postPhoto, postVideo) => {
    try {
      const {text, image = null, video = null} = data;
      let mediaUrl = null;
      if (image) {
        mediaUrl = await uploadImage(image, postId);
      }
      if (video) {
        mediaUrl = await uploadImage(video, postId);
      }

      if (mediaUrl && image) {
        const res = await firestore()
          .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
          .doc(postId)
          .set(
            {
              text: text,
              postPhoto: mediaUrl,
              postVideo: null,
            },
            {merge: true},
          );
      } else if (mediaUrl && video) {
        const res = await firestore()
          .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
          .doc(postId)
          .set(
            {
              text: text,
              postVideo: mediaUrl,
              postPhoto: null,
            },
            {merge: true},
          );
      } else {
        const res = await firestore()
          .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
          .doc(postId)
          .set(
            {
              text: text,
              postPhoto: postPhoto,
              postVideo: postVideo,
            },
            {merge: true},
          );
      }

      console.log('HELLOO SUCCESSFULLLL');
    } catch (err) {
      console.log({err});
    }
  };

  const deleteUserPost = async (postId, spaceId) => {
    try {
      const postData = await firestore()
        .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
        .doc(postId)
        .get();

      // also delete all the references of likes and comments if exists
      if (postData.data().likesCount > 0) {
        const likes = await firestore()
          .collection(
            `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/likes`,
          )
          .get();
        likes.docs.forEach(async item => {
          await firestore()
            .collection(
              `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/likes`,
            )
            .doc(item.id)
            .delete();
        });
      }

      if (postData.data().commentsCount > 0) {
        const comments = await firestore()
          .collection(
            `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/comments`,
          )
          .get();
        comments.docs.forEach(async item => {
          await firestore()
            .collection(
              `Colleges/${user?.college}/spaces/${spaceId}/posts/${postId}/comments`,
            )
            .doc(item.id)
            .delete();
        });
      }

      // delete the activities from the user who created the post
      //like Activities
      const document = await firestore()
        .collectionGroup('activities')
        .where('id', '==', `${postData.data()?.postId}_like`)
        .get();

      document.forEach(async item => {
        item.ref.delete();
      });

      //comment Activities
      const document2 = await firestore()
        .collectionGroup('activities')
        .where('id', '==', `${postData.data()?.postId}_comment`)
        .get();

      document2.forEach(async item => {
        item.ref.delete();
      });

      //Delete Post
      const res = await firestore()
        .collection(`Colleges/${user?.college}/spaces/${spaceId}/posts`)
        .doc(postId)
        .delete();
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
    fetchFilteredPostsOfSpecificSpace,
    fetchMyPost,
    fetchActivities,
    CheckNewActivityUpdate,
    EditPost,
    deleteUserPost,
  };
};

export default usePost;

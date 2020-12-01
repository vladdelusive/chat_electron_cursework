// import { http } from 'services';
// import { parseContactsList } from '../parse';
import { db } from 'db'
import firebase from 'firebase'
import 'firebase'
import { noty } from 'utils/noty'

const createUserProfile = (profile) => db.collection("profiles").doc(profile.uid).set(profile)

export const auth = {

	subscribeToProfileChats: (uid, onSubsribe) => {
		return db
			.collection('profiles')
			.doc(uid)
			.onSnapshot(snapshot => onSubsribe(snapshot.data()))
	},

	preparedUpdatedProfileData: async (profile) => {
		
		const chatsWithRefs = await Promise.all(profile.chats.map(e => db.doc(`chats/${e}`).get()))
		const chats = await Promise.all(chatsWithRefs.map(e => e.data()))

		const usersInfoRefs = await Promise.all(chats.map(({ users }) => {
			const chatWithPersonUid = users.find(el => profile.uid !== el)
			return db.doc(`profiles/${chatWithPersonUid}`).get()
		}))
		const usersInfo = await Promise.all(usersInfoRefs.map(e => e.data()))

		const preparedChats = chats.reduce((acc, chat, index) => {
			const userValues = usersInfo[index];
			const chatId = profile.chats[index];
			return [...acc, { userInfo: { name: userValues.name, photo: userValues.photo, email: userValues.email, uid: userValues.uid }, id: chatId, ...chat }]
		}, [])

		return { profile: profile, chats: preparedChats }
	},

	googleLogin: () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		return firebase.auth().signInWithPopup(provider).then(async (result) => {
			const profile = {}
			profile.name = result.additionalUserInfo.profile.name;
			profile.email = result.additionalUserInfo.profile.email;
			profile.photo = result.additionalUserInfo.profile.picture;
			profile.uid = result.user.uid;
			if (result.additionalUserInfo.isNewUser) {
				createUserProfile({ ...profile, chats: [] })
				return { profile, chats: [] }
			} else {
				const existedProfile = (await db.doc(`profiles/${profile.uid}`).get()).data()

				const chatsWithRefs = await Promise.all(existedProfile.chats.map(e => db.doc(`chats/${e}`).get()))
				const chats = await Promise.all(chatsWithRefs.map(e => e.data()))

				const usersInfoRefs = await Promise.all(chats.map(({ users }) => {
					const chatWithPersonUid = users.find(el => existedProfile.uid !== el)
					return db.doc(`profiles/${chatWithPersonUid}`).get()
				}))
				const usersInfo = await Promise.all(usersInfoRefs.map(e => e.data()))

				const preparedChats = chats.reduce((acc, chat, index) => {
					const userValues = usersInfo[index];
					const chatId = existedProfile.chats[index];
					return [...acc, { userInfo: { name: userValues.name, photo: userValues.photo, email: userValues.email, uid: userValues.uid }, id: chatId, ...chat }]
				}, [])

				return { profile: existedProfile, chats: preparedChats }
			}
		}).catch((error) => {
			if (error.message) {
				noty('error', error.message);
			}
			return null
		});
	}
	// register: async (payload) => {
	// 	const { email, password } = payload;
	// 	try {
	// 		const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
	// 		return user
	// 	} catch (error) {
	// 		return Promise.reject()
	// 	}
	// }
};

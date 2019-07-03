import { all, fork } from 'redux-saga/effects'
import cardSaga from './sagas/cardSaga'
import shuttleSaga from './sagas/shuttleSaga'
import diningSaga from './sagas/diningSaga'
import homeSaga from './sagas/homeSaga'
import specialEventsSaga from './sagas/specialEventsSaga'
import userSaga from './sagas/userSaga'
import mapSaga from './sagas/mapSaga'
import feedbackSaga from './sagas/feedbackSaga'
import scheduleSaga from './sagas/scheduleSaga'
import parkingSaga from './sagas/parkingSaga'
import messagesSaga from './sagas/messagesSaga'
import myStudentProfileSaga from './sagas/myStudentProfileSaga'
import siSessionsSaga from './sagas/siSessionsSaga'
import eventsSaga from './sagas/eventsSaga'
import newsSaga from './sagas/newsSaga'
import linksSaga from './sagas/linksSaga'
import weatherSaga from './sagas/weatherSaga'
import surfSaga from './sagas/surfSaga'

export default function* rootSaga() {
	yield all([
		fork(cardSaga),
		fork(shuttleSaga),
		fork(diningSaga),
		fork(homeSaga),
		fork(specialEventsSaga),
		fork(userSaga),
		fork(mapSaga),
		fork(feedbackSaga),
		fork(scheduleSaga),
		fork(parkingSaga),
		fork(messagesSaga),
		fork(myStudentProfileSaga),
		fork(siSessionsSaga),
		fork(eventsSaga),
		fork(newsSaga),
		fork(linksSaga),
		fork(weatherSaga),
		fork(surfSaga),
	])
}

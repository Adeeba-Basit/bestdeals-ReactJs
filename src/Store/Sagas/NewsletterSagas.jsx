import { createData, deleteData, getData } from "./Services/NewsletterService"
import {ADD_NEWSLETTER, ADD_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED} from "../Constant";
import { put, takeEvery } from "redux-saga/effects"

function* createSaga(action) {
    var response = yield createData(action.payload)
    yield put({ type: ADD_NEWSLETTER_RED, payload: response })
}
function* getSaga() {
    var response = yield getData()
    yield put({ type: GET_NEWSLETTER_RED, payload: response })
}
function* deleteSaga(action) {
     yield deleteData(action.payload)
    yield put({ type: DELETE_NEWSLETTER_RED, payload: action.payload })
}
export default function* newsletterSaga() {
    yield takeEvery(ADD_NEWSLETTER, createSaga )
    yield takeEvery(GET_NEWSLETTER, getSaga )
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga )
}
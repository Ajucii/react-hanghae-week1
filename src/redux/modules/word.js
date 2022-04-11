import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";

// 액션 타입을 정해줍니다.
const CREATE = "word/CREATE";
const LOAD = "word/LOAD";
const UPDATE = "word/UPDATE";
const DELETE = "word/DELETE";
const LOADED = "word/LOADED";
const REUPDATE = "word/REUPDATE";

// 초기 상태값을 만들어줍니다.
const initialState = {
    is_loaded: false,
    list: [],
};

//추가
export const createWord = (word) => {
    return { type: CREATE, word };
};

// 불러오기
export const loadWord = (word_list) => {
    return { type: LOAD, word_list }
}

// 완료
export const updateWord = (word_index) => {
    return { type: UPDATE, word_index }
}

// 삭제
export const deleteWord = (word_index) => {
    return { type: DELETE, word_index }
}

// Spinner
export const isLoaded = (loaded) => {
    return { type: LOADED, loaded }
}

// 완료 취소
export const reupdateWord = (word_index) => {
    return { type: REUPDATE, word_index }
}



export const loadWordFB = () => {
    return async function (dispatch) {
        const word_data = await getDocs(query(collection(db, "word"), orderBy("createdAt", "desc")));

        let word_list = [];

        word_data.forEach((w) => {
            word_list.push({ id: w.id, ...w.data() })
        });

        dispatch(loadWord(word_list))
    }
}


export const addWordFB = (word) => {
    return async function (dispatch) {

        dispatch(isLoaded(false));

        const docRef = await addDoc(collection(db, "word"), word);
        const word_data = { id: docRef.id, ...word };

        dispatch(createWord(word_data))
    }
}


export const updateWordFB = (word_id) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "word", word_id);

        await updateDoc(docRef, { completed: true });

        const _word_list = getState().word.list;
        const word_index = _word_list.findIndex((w) => {
            return w.id === word_id;
        })
        dispatch(updateWord(word_index));
    }
}

export const reupdateWordFB = (word_id) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "word", word_id);

        await updateDoc(docRef, { completed: false });

        const _word_list = getState().word.list;
        const word_index = _word_list.findIndex((w) => {
            return w.id === word_id;
        })
        dispatch(reupdateWord(word_index));
    }
}


export const deleteWordFB = (word_id) => {
    return async function (dispatch, getState) {
        if (!word_id) {
            window.alert("아이디가 없는 단어입니다");
            return;
        }

        const docRef = doc(db, "word", word_id);
        await deleteDoc(docRef);

        const _word_list = getState().word.list;
        const word_index = _word_list.findIndex((w) => {
            return w.id === word_id;
        });
        dispatch(deleteWord(word_index));
    }
}



// 리듀서예요.
// 실질적으로 store에 들어가 있는 데이터를 변경하는 곳이죠!
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case "word/LOAD": {
            return { list: action.word_list, is_loaded: true };
        }

        case "word/CREATE": {
            const new_word_list = [action.word, ...state.list];
            return { ...state, list: new_word_list, is_loaded: true };
        }

        case "word/UPDATE": {
            const new_word_list = state.list.map((l, index) => {

                if (parseInt(action.word_index) === index) {
                    return { ...l, completed: true }
                } else {
                    return l;
                }
            });

            return { ...state, list: new_word_list }
        }

        case "word/REUPDATE": {
            const new_word_list = state.list.map((l, index) => {

                if (parseInt(action.word_index) === index) {
                    return { ...l, completed: false }
                } else {
                    return l;
                }
            });

            return { ...state, list: new_word_list }
        }


        case "word/DELETE": {
            const new_word_list = state.list.filter((l, index) => {
                return parseInt(action.word_index) !== index;
            })
            return { ...state, list: new_word_list };
        }

        case "word/LOADED": {
            return { ...state, is_loaded: action.loaded }
        }



        default:
            return state;
    }
}
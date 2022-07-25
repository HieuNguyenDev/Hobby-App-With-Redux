// setup redux store

// state
// reducer
// store

const { createStore } = window.Redux;

const initialState = [
    'Coding',
];

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            const newList = [...state];
            newList.push(action.payload);
            // state.push(action.payload)
            return newList;
        }
        case 'RESET_HOBBY': {
           
        }
        default: return state;
    }
};

const store = createStore(hobbyReducer);

// Render hobby list 
const renderHobbyList = (hobbyList) => {
    if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;
    const ulElement = document.querySelector('#hobbyListId');
    ulElement.textContent = ''
    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.innerText = hobby;
        ulElement.appendChild(liElement)
    }

};

// Render initial hobbyList
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList)

// HANDLE FORM SUBMMIT
var handleFormSubmit = () => {
    let valueInput = document.querySelector('input').value;
    if (!valueInput || valueInput === '') return ;
    const action_add = {
        type: 'ADD_HOBBY',
        payload: valueInput
    }

    store.dispatch(action_add);
}

const handleResetInput = () => {
    let valueInput = document.querySelector('input').value = '';
    const action_reset = {
        type: 'RESET_HOBBY',
        payload: valueInput
    }
    store.dispatch(action_reset);
}

const buttonAddElement = document.querySelector('#add-btn-js');
const buttonResetElement = document.querySelector('#reset-btn-js');

buttonAddElement.addEventListener('click', handleFormSubmit);
buttonResetElement.addEventListener('click', handleResetInput);

store.subscribe(() => {
    console.log('<<< State update: ', store.getState());
    const newListHobby = store.getState();
    renderHobbyList(newListHobby);
})



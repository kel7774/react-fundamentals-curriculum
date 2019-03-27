{
    type: "TO_DO",
    todo: {
        id: 0,
        name: "Learn Redux",
        complete: false,
    }
}

{
    type: 'REMOVE_TODO',
    id: 0,
}

{
   type: "TOGGLE_TODO",
   id: 0,
}

{
    type: "ADD_GOAL",
    goal: {
        id: 0,
        name: "Run a marathon"
    }
}

{
    type: "REMOVE_GOAL",
    id: 0
}

//Reducer function
function todos(state = [], action) {
    if(action.type === "ADD_TODO"){
        return state.concat([action.todo])
    }
    return state
}

//action is just an object that represents an event that will change the state of our store

function createStore(reducer){
    //the store should have 4 parts
    //1. the state
    //2. get state
    //3. listen to changes on state
    //4. update state (dispatch)
    

    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => {
                l !== listener
            })
        }
    }

    const dispatch = (action) => {
        // call todos, will get new state, then be able to update
        //loop over & invoke the listeners
        state = reducer(state, action)
        listeners.forEach((listener) => {
            listener()
        })
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

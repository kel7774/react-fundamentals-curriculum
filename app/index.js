//library code
function createStore(reducer){
    //the store should have 4 parts
    //1. the state
    //2. get state
    //3. listen to changes on state
    //4. update state (dispatch)
    

    let state
    let listeners = []

    const getState = () => state

// listen to changes
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

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

//action creators
function addTodoAction (todo){
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id){
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id){
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id){
    return {
        type: REMOVE_GOAL,
        id
    }
}

//Reducer functions
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo : 
            Object.assign({}, todo, {complete: !todo.complete})
        )
    default:
        return state
    }
}

function goals(state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default: state
    }
}

function app(state = {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

//action is just an object that represents an event that will change the state of our store


const store = createStore(app);
store.dispatch(addGoalAction({
    id: 0,
    name: "Learn Redux"
}))
function createStore(){
    //the store should have 4 parts
    //1. the state
    //2. get state
    //3. listen to changes on state
    //4. update state
    

    let state
    const getState = () => state
    return {
        getState
    }
}
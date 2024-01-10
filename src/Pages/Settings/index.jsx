import { useReducer } from "react";
import Icons from "../../Assets/icons";

function reducer(state, action) {
  console.log(action);
  if (action.type === "light1") {
    return {
      ...state,
      [action.type]: !state[action.type],
    };
  } else if (action.type === "light2") {
    return {
      ...state,
      [action.type]: !state[action.type],
    };
  } else if (action.type === "light3") {
    return {
      ...state,
      [action.type]: !state[action.type],
    };
  } else if (action.type === "light4") {
    return {
      ...state,
      [action.type]: !state[action.type],
    };
  } else {
    console.error("No action found");
    return {
      ...state,
    };
  }
}

export default function Settings() {
  const [state, dispatch] = useReducer(reducer, {
    light1: false,
    light2: false,
    light3: false,
    light4: false,
  });

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-3"
          onClick={() => dispatch({ type: "light1", payload: "Tatada" })}
        >
          <Icons.lightning size={50} color={state.light1 && "red"} />
          <div>Light 1</div>
        </div>
        <div className="col-3" onClick={() => dispatch({ type: "light2" })}>
          <Icons.lightning size={50} color={state.light2 && "red"} />
          <div>Light 2</div>
        </div>
        <div className="col-3" onClick={() => dispatch({ type: "light3" })}>
          <Icons.lightning size={50} color={state.light3 && "red"} />
          <div>Light 3</div>
        </div>
        <div className="col-3" onClick={() => dispatch({ type: "light4" })}>
          <Icons.lightning size={50} color={state.light4 && "red"} />
          <div>Light 4</div>
        </div>
        <div className="col-3" onClick={() => dispatch({ type: "light5" })}>
          <Icons.lightning size={50} color={state.light5 && "red"} />
          <div>Light 5</div>
        </div>
      </div>
    </div>
  );
}

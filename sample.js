  const action  = {
      1:"on",
      2:"off"
  }

let myState = "";
const reducer = (state,action)=>{

    switch (action.type) {
        case "on":
            myState = action.type;
            return `my current state is ${state} when on`
            case "off":
            myState = action.type;
            return `my current state is ${state} when off`
        default:
            throw new Error("error");
            break;
    }
}

const UseR =(reducer,state)=>{

const caller = (newState,action)=>{
     return reducer(newState,action)
}
return [state,caller];
    
}

const [state,dispatch] = UseR(reducer,"on");

// let x = dispatch("on",)
// x = dispatch("willian",{type:"off"})
// console.log(x)

const Validate = ()=>{

    return (fn,next)=>{
         let y = fn();
         return y;
    }
}
const data = [1,2,6,7];
const val = Validate();
val(()=>"hello or next",)
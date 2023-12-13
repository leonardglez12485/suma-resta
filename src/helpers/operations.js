
const respuesta = {
    operation: String,
    resp: Number,
    valido: false,
}

const signos = ['+','-'];

// const getOperation = ()=>{
//     const operationsArray = Array.from(Array(33))
//     return operationsArray.map(( _, index)=> index)
// }

export function getRandomArbitrary(min, max) {
    return Math.trunc((Math.random() * (max - min) + min));
  }

const getResultado = (a, b, c, s1, s2)=>{
    if(s1==='+' && s2==='+') return a+b+c;
    if(s1==='+' && s2==='-') return a+b-c;
    if(s1==='-' && s2==='+') return a-b+c;
    if(s1==='-' && s2==='-') return a-b-c;
   }


const getOperation = ()=>{
    const a = getRandomArbitrary(10,99);
    const b = getRandomArbitrary(0,9);
    const c = getRandomArbitrary(0,9);
    const s1 = signos[Math.floor(Math.random() * 2)];
    const s2 = signos[Math.floor(Math.random() * 2)];
    respuesta.operation = `${a} ${s1} ${b} ${s2} ${c}`;
    if(getResultado(a,b,c,s1,s2)>0){
        respuesta.resp= getResultado(a,b,c,s1,s2);
        respuesta.valido= true;
    } else{
        respuesta.resp= getResultado(a,b,c,s1,s2);
        respuesta.valido= false;
    }
    console.log(respuesta)
    return respuesta;
}


const getOperationOptions= ()=>{
        return this.respuesta;
  }

export default getOperation
 
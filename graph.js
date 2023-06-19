class Person{
    constructor(name){
        this.name = name;
    }
}
class Graph{
    constructor(){
        this.list = {};
    }
    addPerson(person){
        if(!this.list[person.name]){
            this.list[person.name] = [];
            return true;
        }
        return false;

    }
    addFriend(person,friend){
        if(!this.list[person.name]){return undefined}
        if(!this.list[friend.name]){ this.addPerson(friend.name)}
          if(this.list[person.name]){
            this.list[friend.name].push(person.name);
            this.list[person.name].push(friend.name)
          }
          
    }
    removeFriend(person,friend){
        if(this.list[person.name]){
            this.list[person.name] = this.list[person.name].filter(aminos => aminos !== friend.name)
        }
    }

    DFS(v){
        
        const result = [];
        const visited = {};
        const stack = [];
        stack.push(v.name)
        while(stack.length){
           const node = stack.pop()
           result.push(node);
           visited[node] = true;
           this.list[node].forEach(e =>{
               
               if(!visited[e] && !stack.includes(e)){
                   stack.push(e)
               }
           })
        }

        return result;
    }

    recursiveDFS(person,amigo){
         const visto = {};
         const resultado = [];
         const helper = (cur,amigo)=>{
             
               if(cur == amigo){
                resultado.push(cur)
                   return true;
               }
               if(cur == null){
                   return false;
               }

               resultado.push(cur)
               visto[cur] = true;
            for (const vecino of this.list[cur]) {
                if(!visto[vecino]){
                    if(helper(vecino,amigo)){
                        return resultado.join(" -> ");
                    }
                }
               
            } 
            return false;  
         }
        return helper(person,amigo)
        // console.log(resultado)
    }
}
const willian = new Person("willian")
const Jose = new Person("jose")
const ana = new Person("ana")
const khaled = new Person("khaled")
const Digna = new Person("Digna")


const amigos = new Graph()

amigos.addPerson(willian)
amigos.addPerson(Jose)
amigos.addPerson(khaled)
amigos.addPerson(ana)
amigos.addPerson(Digna)

amigos.addFriend(willian,Jose)
amigos.addFriend(willian,khaled)
amigos.addFriend(ana,Jose)
amigos.addFriend(ana,Digna)
// amigos.removeFriend(willian,Jose)
// amigos.removeFriend(Jose,willian)
amigos.DFS(willian)
let z = amigos.recursiveDFS("khaled","Digna")
console.log(z)
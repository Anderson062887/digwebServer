class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    insert(val){
       let node = new Node(val);
       if(!this.root){
           this.root = node;
           return this;
       }
       let cur = this.root;

       while(true){
        if(cur.val == val){console.log("duplicated") 
        return;}
           if(cur.val > node.val){
               if(!cur.left){
                   cur.left = node;
                   break;
               }
               cur = cur.left;
           }else{
               if(!cur.right){
                   cur.right = node;
                   break;
               }
               cur = cur.right;
           }
       }
    }

    find(target){
       if(!this.root){
           return undefined;
       }
       if(this.root.val === target){
           return true;
       }

       let cur = this.root;
  

       while (cur  && cur.val !== target) {
        
           if(target < cur.val){
               if(!cur.left){
                   return false;
               }
               cur = cur.left
           }else{
               if(!cur.right){
                   return false;
               }
               cur = cur.right;
           }
           
       }
     
       if(cur.val === target){
           return true;
       }
       return false;


    }

    dfs(){
        let result = [];
            const helper = (n)=>{

                if(n.left){
                helper(n.left)
                }
                result.push(n.val)
                if(n.right){
                    helper(n.right)
                }

            }
            helper(this.root)
            console.log(result);
    }
}


const maze = [
    ["w","w"," ","w"],
    ["w","w"," ","w"],
    ["w"," "," ","w"],
    ["w"," ","w","w"],
    ["w"," "," ","w"],
    ["w","w"," ","w"],
];

const walk = (g,r,c,s)=>{

}
const path = (g)=>{
const s = {};
for (let r = 0; r < g.length; r++) {
    
    for (let c = 0; c < g[0].length; c++) {
        const element = array[c];
        
    }
    
}
}

const tree = new Tree();
tree.insert(100);
tree.insert(170);
tree.insert(150);
tree.insert(175);
tree.insert(75);
tree.insert(85);
tree.insert(65);
tree.insert(65);
tree.dfs();
let found = tree.find(175)
 console.log(found)
const cl=console.log;
const filtertodos=document.getElementById("filtertodos");
const todoscontainer=document.getElementById("todoscontainer");
const loader=document.getElementById("loader");

const BASE_URL="https://jsonplaceholder.typicode.com";
const TODOS_URL=`${BASE_URL}/todos`;

const sweetalert=(msg,icon)=>{
      Swal.fire({
         title:msg,
         timer:2500,
         icon:icon
      })
}

const templating=(arr)=>{
   let result=``;
   arr.forEach((todos,index) => {
          result+=`
                <tr>
                  <td>${index+1}</td>
                  <td>${todos.id}</td>
                  <td>${todos.title}</td>
                  <td>${todos.userId}</td>
                  <td>${todos.completed ? "Yes":"No"}</td>
               </tr>`
         todoscontainer.innerHTML=result;   
   })
          
          sweetalert("DATA IS ADDEDD SUCCESSFULLYY!!","success");
}
const makeapicall=async(methodname,apiurl,msgbody)=>{
   loader.classList.remove("d-none")
       try{
        
           const res=await fetch(apiurl,{
                method:methodname,
                msgbody:msgbody,
                header:{
                   token:"JWT FROM LS"
                }
           });
           return await res.json();
       }catch(err){
          sweetalert(err,"error")
       }
}



const fetchtodos=async()=>{
      try{
          const res= await makeapicall("GET",TODOS_URL);
          cl(res);
           templating(res);
      } 
      catch(err){
          sweetalert(err,"error")
      }
      finally{
         loader.classList.add('d-none');
      }
}
fetchtodos();


const filtertodoslist=(filter,arr)=>{
       let filterarr=[];
       if(filter==="completed"){
          filterarr=arr.filter(todo=>todo.completed);
       }else if(filter==="notcompleted"){
          filterarr=arr.filter(todo=>!todo.completed);
       }else{
           filterarr=arr;
       }
       templating(filterarr);
}

const onfilter=async(eve)=>{
      eve.preventDefault();
      let filter =eve.target.value;
      //cl(filter);
      try{
           const res= await makeapicall("GET",TODOS_URL) ;
           filtertodoslist(filter,res) 
      }
      catch(err){
           sweetalert(err,"error")
      }finally{
           loader.classList.add("d-none");
      }
}


filtertodos.addEventListener("change",onfilter);


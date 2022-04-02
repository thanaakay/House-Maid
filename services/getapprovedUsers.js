const tokenValue = localStorage.getItem("tokenKey");
const userData = localStorage.getItem("userData");


const userDataObject = JSON.parse(userData)
const logoutClass= document.querySelector(".logoutClass ul li");
const maidClass = document.querySelector(".maidClass ul li")
const RegisterClass=document.querySelector(".RegisterClass ul li");
const loginClass =document.querySelector(".loginclass");
const myMaidLink = document.querySelector(".maidClass ul li a")

if(userData){
  logoutClass.style.display="block";
  maidClass.style.display="block"
  RegisterClass.style.display="none";
  loginClass.style.display="none";
}

maidClass.addEventListener('click', () => {

  myMaidLink.setAttribute("href", `./mymaid.html?id=${userDataObject.id}`)
  console.log("attribute")
})
logoutClass.addEventListener("click",()=>{
  localStorage.removeItem("userData")
  window.location="index.html"
})
const intrepreters=document.querySelector('.intrepreter')
const paginate = document.querySelector(".paginate")
const errors = document.querySelector(".error");
const path = window.location.href
const pg = path.split("=")[1]

let page = pg === undefined ? 1 : pg;

const findPages = (numbers) =>{
const num = parseInt(numbers, 10)
const arr = Array.from({length: num}, (_, i) => i + 1)

arr.map(list =>{
  const li = `<ul class="pagination"><li onClick="updatePage(${list})" class="makes"><a>${list}<span class="sr-only">(current)</span></a></li></ul`
  document.querySelector(".lists").innerHTML +=li
  
})
}


updatePage = (upage) =>{
  page=upage
  window.location.href=`index.html?page=${page}`
};

  fetch(`https://interpreters-api.herokuapp.com/api/v1/users/interpreters/onlyapproved/?page=${page}`,{
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      let pageNumber=Math.ceil(data.interpreters.count/10)   
    findPages(pageNumber)
    
    
    data.interpreters.rows.map(interpreter=>{
      const intrepret= userData? `<div class="col-sm-3 col-xs-12 htlfndr-visitor-column">
                        <div class=htlfndr-visitor-card inter-card>
                           <div class=visitor-avatar-side>
                            <div class=visitor-avatar> <img src="${interpreter.profile}" height=90 width=90 alt="user avatar" /> </div>
                           </div>
                           <div class=visitor-info-side>
                              <h7 class=visitor-user-name ><a href="singleUser.html#/${interpreter.id}">${interpreter.firstName} ${interpreter.lastName}</a></h7>
                              <h6 class=visitor-user-firm>${interpreter.Languages}</h6>
                              <h6 class=visitor-user-firm>${interpreter.cost}</h6>
                              <button class='btn btn-primary btns-sm bookbtn' onclick="book(${interpreter.id})">Book</button>
                           </div>
                        </div>
                     </div>
                     `:
                     `<div class="col-sm-3 col-xs-12 htlfndr-visitor-column">
                        <div class=htlfndr-visitor-card inter-card>
                           <div class=visitor-avatar-side>
                            <div class=visitor-avatar> <img src="${interpreter.profile}" height=90 width=90 alt="user avatar" /> </div>
                           </div>
                           <div class=visitor-info-side>
                              <h7 class=visitor-user-name ><a href="singleUser.html#/${interpreter.id}">${interpreter.firstName} ${interpreter.lastName}</a></h7>
                              <h6 class=visitor-user-firm>${interpreter.Languages}</h6>
                              <h6 class=visitor-user-firm>${interpreter.cost}</h6>
                           </div>
                        </div>
                     </div>
                     `
    intrepreters.innerHTML+=intrepret 
    })
    
    });

    const book = (id)=>{

      fetch(`https://interpreters-api.herokuapp.com/api/v1/users/booking/${id}`,{
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization:`bearer ${tokenValue}`
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.error || data.Error){
          errors.textContent=data.error || data.Error
          errors.classList.remove("alert-success")
          errors.classList.add("alert-danger")
          errors.style.display ="block"
          setTimeout(()=>{
            errors.style.display ="none"
          }, 4000)
        }
        if(!(data.error || data.Error)){
          errors.textContent=data.Message || data.message
          errors.classList.remove("alert-danger")
          errors.classList.add("alert-success")
          errors.style.display ="block"
          setTimeout(()=>{
            errors.style.display ="none"
          }, 5000)
        } 
      })
    }


const tokenValue = localStorage.getItem("tokenKey");
const userData = localStorage.getItem("userData");

const intrepreters=document.querySelector('.intrepreter')

const paginate = document.querySelector(".paginate")
const errors = document.querySelector(".error");

const logoutbt=document.querySelector(".logoutBtn");

logoutbt.addEventListener("click",()=>{
  localStorage.removeItem("userData")
  window.location="index.html"
})

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
  window.location.href=`allintrepreter.html?page=${page}`
};

const customerId = JSON.parse(userData)


fetch(`https://interpreters-api.herokuapp.com/api/v1/users/interpreters/?page=${page}`,{
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${tokenValue}`,
    },
  })
  .then((response) => response.json())
  .then((data) => {
    
    let pageNumber=Math.ceil(data.interpreters.count/10)   
    findPages(pageNumber)
    data.interpreters.rows.map(interpreter=>{
      const intrepret=`<div class="col-sm-4 col-xs-12 htlfndr-visitor-column">
                        <div class=htlfndr-visitor-card>
                           <div class=visitor-avatar-side>
                            <div class="visitor-avatar image"> <img src="${interpreter.profile}" alt="user avatar" /> </div>
                           </div>
                           <div class=visitor-info-side>
                           <h7 class=visitor-user-name ><a href="singleUser.html#/${interpreter.id}">${interpreter.firstName} ${interpreter.lastName}</a></h7>
                              <p class=visitor-user-firm>Tel: ${interpreter.phone_number}</p>
                              <p class=visitor-user-firm> Status: ${interpreter.status}</p>
                              <div class=btns>
                              <button class="btn btn-primary btn-danger btn-sm" onclick="rejectUser(${interpreter.id})">Reject</button>
                              <button class="btn btn-primary btn-success btn-sm" onclick="approveUser(${interpreter.id})">Approve</button>
                              </div>

                           </div>
                        </div>
                     </div>
                     `;
    intrepreters.innerHTML+=intrepret 

    })
  });


  // approve user
  const approveUser = (id)=>{

    fetch(`https://interpreters-api.herokuapp.com/api/v1/users/approve/interpreters/${id}`,{
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${tokenValue}`,
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
      window.location.reload();
    })
  }

  // reject user
  const rejectUser = (id)=>{

    fetch(`https://interpreters-api.herokuapp.com/api/v1/users/reject/interpreters/${id}`,{
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${tokenValue}`,
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
      window.location.reload() 
    })
  }

  
  
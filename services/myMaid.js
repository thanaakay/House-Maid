
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

// customers
fetch(`https://interpreters-api.herokuapp.com/api/v1/users/customers/${customerId.id}`,{
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${tokenValue}`,
    },
  })
  .then((response) => response.json())
  .then((data) => {
      //   })
      
      // fetch(`https://interpreters-api.herokuapp.com/api/v1/users/interpreters/?page=${page}`,{
          //     method: "GET",
          //     headers: {
              //       "Content-type": "application/json; charset=UTF-8",
              //       Authorization: `Bearer ${tokenValue}`,
              //     },
              //   })
              //   .then((response) => response.json())
              //   .then((data) => {
                  
                  let pageNumber=Math.ceil(data.maid.length/10)   
                  findPages(pageNumber)
                  if (data.maid.length ===0){
                    intrepreters.innerHTML= " <h4>No Maid Hired!</h4>"
                  }
                  data.maid.map(interpreter=>{
                      const intrepret=`<div class="col-sm-4 col-xs-12 htlfndr-visitor-column">
                      <div class=htlfndr-visitor-card>
                      <div class=visitor-avatar-side>
                      <div class="visitor-avatar image"> <img src="${interpreter.profile}" alt="user avatar" /> </div>
                      </div>
                      <div class=visitor-info-side>
                      <h7 class=visitor-user-name ><a href="singleUser.html#/${interpreter.id}"><b>${interpreter.firstName} ${interpreter.lastName}</b></a></h7>
                      <p class=visitor-user-firm>Tel: ${interpreter.phone_number}</p>
                      <p class=visitor-user-firm> wage | salary: ${interpreter.cost}</p>
                      <div class=btns>
                      <button class="btn btn-primary btn-danger btn-sm" onclick="unBookUser(${interpreter.id})">Un Book</button>
    
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
  const unBookUser = (id)=>{

    fetch(`https://interpreters-api.herokuapp.com/api/v1/users/unbooking/${id}`,{
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
      window.location.reload() 
    })
  }

  
  
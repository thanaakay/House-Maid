
const errorsregister = document.querySelector(".registererror");
const loadingregister = document.querySelector(".loading p");

const btn =document.querySelector('.register');
const profile =document.querySelector('input[type="file"]');
const form = document.querySelector('.register-form');

const interpreterform=document.querySelector('.intrepreterForm');
const clientForm=document.querySelector('.clientform');
const registerform=document.querySelector('.registervalue');

const customerbtn =document.querySelector(".customerbtn");

registerform.addEventListener('change',(event)=>{
  if(event.target.value==="1"){
    console.log(event.target.value)
    
    console.log("intrepreter")
    clientForm.style.display='none'  ;
    interpreterform.style.display='block';
  }
  if(event.target.value==="2"){
    console.log("Client")
    interpreterform.style.display='none';
    clientForm.style.display='block';
  }
  if(event.target.value==="0"){

    console.log("Nothing choosen")
  
    interpreterform.style.display='none'
    clientForm.style.display='none'
  }

})


customerbtn.addEventListener("click", ()=>{
  event.preventDefault();
 const firstName=document.querySelector(".firstNamec");
 const lastName=document.querySelector(".lastNamec");
 const phoneNumber=document.querySelector(".phone_numberc");
 const email=document.querySelector(".emailc");
 const password=document.querySelector(".passwordc");
 const datas=JSON.stringify({
   firstName:firstName.value,
   lastName:lastName.value,
   phone_number:phoneNumber.value,
   email:email.value,
   password:password.value
 })

 console.log(datas)
 console.log(firstName.value)


 fetch("https://interpreters-api.herokuapp.com/api/v1/users/customer/signUp",{
  method: "POST",
  body: datas,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
.then((res) => res.json())
      .then((data) => {
        console.log(data)
        loadingregister.innerHTML="<h3>Registering ...</h3>"
        loadingregister.style.display ="block"

        if(data.error || data.Error){
          errorsregister.textContent=data.error || data.Error
          errorsregister.style.display ="block"
          loadingregister.style.display ="none"
          setTimeout(()=>{
            errorsregister.style.display ="none"
          }, 4000)
        }
        if(!(data.error || data.Error)){
          errorsregister.textContent=data.Message || data.message
          errorsregister.classList.remove("alert-danger")
          errorsregister.classList.add("alert-success")
          errorsregister.style.display ="block"
          loadingregister.style.display ="none"
          window.location = "index.html";
          setTimeout(()=>{
            window.location.reload()
          }, 3000)
        }
      });

})

form.addEventListener("submit", () => {
  event.preventDefault()
  const formData = new FormData(form);
  
  fetch("https://interpreters-api.herokuapp.com/api/v1/users/signUp",{
        method: "POST",
        body: formData,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        loadingregister.innerHTML="<h3>Registering ...</h3>"
        loadingregister.style.display ="block"

        if(data.error || data.Error){
          errorsregister.textContent=data.error || data.Error
          errorsregister.style.display ="block"
          loadingregister.style.display ="none"
          setTimeout(()=>{
            errorsregister.style.display ="none"
          }, 4000)
        }
        if(!(data.error || data.Error)){
          errorsregister.textContent=data.Message || data.message
          errorsregister.classList.remove("alert-danger")
          errorsregister.classList.add("alert-success")
          errorsregister.style.display ="block"
          loadingregister.style.display ="none"
          window.location = "index.html";
          setTimeout(()=>{
            window.location.reload()
          }, 3000)
        }
      });

})


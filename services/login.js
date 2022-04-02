

const errorlogin = document.querySelector(".loginerror");
const successeslogin = document.querySelector(".success");
const loginButton =document.querySelector('.login');

loginButton.addEventListener('click',()=>{
    const email=document.querySelector('.emaillogin');
    const password=document.querySelector('.password');
    const inputData = JSON.stringify({
        email:email.value,
        password:password.value

    })
      event.preventDefault();
      fetch("https://interpreters-api.herokuapp.com/api/v1/users/signIn",{
        method: "POST",
        body: inputData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.error || data.Error){
          errorlogin.textContent=data.error || data.Error
          errorlogin.style.display ="block"
          loadingregister.style.display ="none"
          setTimeout(()=>{
            errorlogin.style.display ="none"
          }, 4000)
        }
    
        if (!(data.Error||data.error)) {
        const userData=JSON.stringify(data.user);
        const userToken=data.token
        window.localStorage.setItem('tokenKey', userToken);
        window.localStorage.setItem('userData',userData);
        

        if(data.user.role==='customer'){
          loginButton.style.display="none";
          window.location="index.html"
        }
        if(!data.user.role){
            window.location = "allintrepreter.html";
        }
         }
        
      });

    })



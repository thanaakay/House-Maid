
const tokenValue = localStorage.getItem("tokenKey");
const userData = localStorage.getItem("userData");

const myId = window.location.href
console.log(myId)
const id = myId.split("/").reverse()[0]
console.log(id)

const intrepreters=document.querySelector('.intrepreter')


  //get a user

    fetch(`https://interpreters-api.herokuapp.com/api/v1/users/interpreters/${id}`,{
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())

    .then((data) => {
      console.log(data)
      document.querySelector(".intrepretername").innerHTML=`${data.user.firstName} ${data.user.lastName}`
      document.querySelector(".intrepreterimage img").src=data.user.profile
      document.querySelector(".languages").innerHTML=`Languages: ${data.user.Languages}`
      document.querySelector(".phoneNumber").innerHTML=`${data.user.phone_number}`
      document.querySelector(".email").innerHTML=`${data.user.email}`
      document.querySelector(".place").innerHTML=`${data.user.location}`
      document.querySelector(".bio p").innerHTML=`${data.user.bio}`
      document.querySelector(".cost").innerHTML=`${data.user.cost}`
    })
  

 
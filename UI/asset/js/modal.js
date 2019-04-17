

const myFunctions = () =>{
  let x = document.querySelector('#status');;
  if (x.innerHTML === "Active") {
    x.innerHTML = "Inactive";
  } else {
    x.innerHTML = "Active";
  }
}

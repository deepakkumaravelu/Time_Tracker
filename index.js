async function Login  (userName, password){

    var users = await fetch("./users.json").then((response) => {
        return response.json();
    });
    users=users.user;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    
      var user = users.find(
        (user) => user.name === userName && user.password === password
      );
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};
document.getElementById("submitForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  let userName=document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  try {
    console.log("call");
    let user = await Login(userName, password);
    if(user){
        window.location.href="./time.html";
    }
    console.log("User logged in:", user);
  } catch (error) {
    console.error("Login error:", error.message);
    alert("Login error:", error.message);
  }
});

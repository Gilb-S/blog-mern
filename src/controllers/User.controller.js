// log in user

const loginUser = async(email, password) => {
    //check if have value 
    if(!email|| !password){ 
        throw Error("All fields required");
    }

    const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw Error(data.msg);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      return data;
}
// register user
 const registerUser = async(email, password, passwordConfirm) => {
    //check if have value 
    if(!email|| !password || !passwordConfirm){ 
        throw Error("All fields required");
    }

    // check if the pass doest match
    if(password !== passwordConfirm){
        throw Error("password do not match");
    }

    // create res 
    const res = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      //create data res
      const data = await res.json();

      if (!res.ok) {
        throw Error(data.msg);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      return data;

 }

export {loginUser, registerUser}
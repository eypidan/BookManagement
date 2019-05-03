function login_judge(){
    const username=document.getElementById("admin_name").value;
    const password=document.getElementById("admin_password").value;
    let request = 
    {  
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            id: `${username}`,
            password: `${password}`
        })
    };

    (async () => {
        const rawResponse = await fetch('http://localhost:1112/signin', request);
        const content = await rawResponse.json();
        console.log(content);
        if(content.status===-1) alert('wrong pass');
        else {
            localStorage.token = content.token;
            window.location.href = "/index.html";
        }
    })();

}
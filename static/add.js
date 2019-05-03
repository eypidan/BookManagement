function addcard(){
    const name=document.getElementById("1").value;
    const department=document.getElementById("2").value;
    const type=document.getElementById("3").value;
    let request = 
    {  
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            name: `${name}`,
            department: `${department}`,
            type:`${type}`,
            token:localStorage.token
        })
    };

    (async () => {
        const rawResponse = await fetch('http://localhost:1112/addcard', request);
        const content = await rawResponse.json();
        console.log(content);
        if(content.status===1) alert(`add ${name} sucessfully`);
 
    })();

}
const form = document.querySelector('form');

form.addEventListener('submit', async(e)=>{
    e.preventDefault();

    //get the values
    const name = document.querySelector('#name').value
    const password = document.querySelector('#password').value


    try{
        const res = await fetch('/login',{
        method: 'POST',
        body: JSON.stringify({name, password}),
        headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json()
        if(data.errors){
            console.log('could not get user')
        }
        if(data.user){
            location.assign('/dashboard')
        }
    }
    catch (err){
        console.log(err)
    }
    

})
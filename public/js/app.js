console.log('Client side javascript file loaded! ')

 const weatherForm =document.querySelector('form')
 const search = document.querySelector('input')
 const messageOne = document.querySelector('#message_1')
 const messageTwo = document.querySelector('#message_2')

 //messageOne.textContent='from JavaScript'

 weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

        messageOne.textContent = 'Loading....'
        messageTwo.textContent = ''
        fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error);
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

                // console.log(data.location);
                // console.log(data.forecast);
            }
        })
    })
    console.log(location);
 })



 
 /*fetch('http://puzzle.mead.io./puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
 })*/

 /*fetch('http://localhost:3000/weather?address=chandigarh').then((response) => {
     response.json().then((data) => {
         if(data.error){
             console.log(data.error);
         }
         else{
             console.log(data.location);
             console.log(data.forecast);
         }
     })
 })*/


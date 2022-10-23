const learnPromise = new Promise( (resolve, failure)=>{
    setTimeout( () => {
        // resolve(undefined);
        failure('Anya does not have any pictures');
    }, 5000);
});

learnPromise.then( (data) => {
   console.log(data);
}).catch( (error) => {
    console.log(error)
})


console.log('russia');

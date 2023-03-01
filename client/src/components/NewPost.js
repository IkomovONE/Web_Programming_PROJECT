function NewPost() {


    const submit = (e) => {
        e.preventDefault()
        
    
        fetch("/api/book/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
      }
    
      const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    


    return (

        <div className="div">

            <div id="darkened">


            <h1>Create a new post</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={submit} onChange={handleChange}> 
                

          
                <label id= "label" >New post subject</label>

                <input id= "name" type="text" name="name"></input>

                <p></p>

                <label id= "label" >Description</label>

                <input id= "author" type="text" name="author"></input>

                <p></p>

                <label id= "label" >Code</label>

                <input id= "author" type="text" name="author"></input>
                <p></p>


                
                


                <input id= "submit" type= "submit" name="submit" value= "Post the snippet"></input>
                <p></p>

            
              </form>




            </div>



        </div>


        



        




    )
}




export default NewPost
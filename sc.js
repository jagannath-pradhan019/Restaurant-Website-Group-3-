const firebaseConfig = {
    apiKey: "AIzaSyAhnLQGanwLYTVerrqCl97wmV4WNvXuGVw",
    authDomain: "group-3-project-bfa4a.firebaseapp.com",
    databaseURL: "https://group-3-project-bfa4a-default-rtdb.firebaseio.com",
    projectId: "group-3-project-bfa4a",
    storageBucket: "group-3-project-bfa4a.appspot.com",
    messagingSenderId: "70810292875",
    appId: "1:70810292875:web:05d6f2f27139ed3bbdba8e"
  };
      // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
     const auth = firebase.auth()
     const database = firebase.database()
  
      function register() {
          email = document.getElementById('email').value
          password = document.getElementById('password').value
          full_name = document.getElementById('full_name').value
  
          if (validate_email(email) == false || validate_password(password) == false) {
            alert('Email or password is outta line')
            return
          }
          if(validate_field(full_name) == false ) {
            alert('One or more extra fields is Outta line')
            return
          }
  
  
          auth.createUserWithEmailAndPassword(email, password)
          .then(function() {
  
  
  
            var user = auth.currentUser
            var database_ref = database.ref()
            var user_data = {
              email : email,
              full_name : full_name,
              last_login : Date.now()
            }
  
            database_ref.child('users/' + user.uid).set(user_data)
            alert('User Created')
  
          })
          .catch(function(error){
            var error_code = error.code
            var error_message = error.message
            alert(error_message)
          })
  
        
          
      }


      function login() {
        email = document.getElementById('email').value
        password = document.getElementById('password').value

        if(validate_email(email) == false || validate_password == false) {
            alert('Email or Password is outta line')
            return
        }
        auth.signInWithEmailAndPassword(email, password) 
        .then(function() {
            var user = auth.currentUser

            var database_ref = database.ref()

            var user_data = {
                
                last_login : Date.now()
              }
            
            database_ref.child('users/' + user.uid).update(user_data)

            alert('User Logged in!!')




        })
        .catch(function(error) {
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })

      }
      function validate_email(email){
        expression = /^[^@]+@\w+(\.\w+)+\w$/
        if(expression.test(email) == true) {
          return true
        } else {
          return false
        }
  
      }
      function validate_password(password) {
        if(password < 6) {
          return false
        } else {
          return true
        }
      }
  
      function validate_field(field) {
        if (field == null) {
          return false
        } 
        if (field.length <= 0) {
          return false
        } else {
          return true
        }
  
      }
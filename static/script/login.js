function login() {
    var my_Request3 = Ajax();
    var form3 = new FormData();
    var username=document.getElementById("username-input").value;
    var password=document.getElementById("password-input").value;
    form3.append("password", password);
    form3.append("username", username);

    my_Request3.onreadystatechange = function() {
    if (my_Request3.readyState == 4 && my_Request3.status == 200) {
        var resText3 = my_Request3.responseText;
          var do_register_status=JSON.parse(resText3).status.toString();
         //alert(do_register_status);
         if(do_register_status=="0"){
         	sessionStorage.setItem("hpcp_login", username);
         	localStorage.setItem("hpcp_login",username);
                alert("dear "+username+", you log in successully ^_^");
                window.location.href="/";
         }
        }
    }
    my_Request3.open("POST", "/do_login/", true);
    my_Request3.send(form3);
   
}

const logValue = (event) => {
    event.preventDefault();
    let nameValue = document.getElementById("name").value;
    let emailValue = document.getElementById("email").value;
    let phoneValue = document.getElementById("phone").value;
    let timeValue = document.getElementById("time").value;

    console.log("Name:", nameValue);
    console.log("Email:", emailValue);
    console.log("Phone:", phoneValue);
    console.log("Time:", timeValue);

}
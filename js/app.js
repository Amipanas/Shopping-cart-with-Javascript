
// variables
// putting all courses in a variable
const courses = document.querySelector("#courses-list");
const shoppingCartContent = document.querySelector("#cart-content tbody");
// access to the clear button
const clearBtn = document.querySelector("#clear-cart");

// eventlisteners
// add a click event for our courses to buy it.
courses.addEventListener("click" ,buyCourse)
// add a click event for our courses to remove it from the cart.
shoppingCartContent.addEventListener("click" ,removeCourse);
// add a clicl event for clear the whole cart.
clearBtn.addEventListener("click" ,removeAllCourses);

document.addEventListener("DOMContentLoaded" ,onLoad)


// functions


// this function buyed a course
function buyCourse(e) {
    e.preventDefault()
    // This function confirms that only the button is clicked and sends the information
    if(e.target.classList.contains("add-to-cart")){
        // access to the card div by parent element.
        // putting all information of buyed course in a variable
        const buyedCourse = e.target.parentElement.parentElement;

        // read HTML's values
        getCourse(buyedCourse);
    }  
}
// this function get all information about the course that user buyed
function getCourse(course) {

    // info of the selected course
    const courseInfo = {
        image : course.querySelector("img").src,
        title : course.querySelector("h4").textContent,
        cost : course.querySelector("span").textContent,
        id : course.querySelectorAll("a")[1].getAttribute("data-id")
    };
    
    // send the info to a function for addin to cart
    addToCart(courseInfo)
}

// this function adding the information to cart
function addToCart(cInfo) {
    // creat <tr>
    let row = document.createElement("tr");
    // put the needed information in a HTML table.
    row.innerHTML = `
            <td><img src= "${cInfo.image}" width= "60%"></td>
            <td><p>${cInfo.title}</p></td>
            <td>${cInfo.cost}</td>
            <td>
                <a href = "#" class = "remove" id="${cInfo.id}">X</a>
            </td>
    `
    shoppingCartContent.appendChild(row);
    addToStorage(cInfo);
}

// this function remove a course from the cart
function removeCourse(params) {
    let item = params.target.parentElement.parentElement;
    if(params.target.classList.contains("remove")){
        item.remove();
        // removeFromStorage(params.target.parentElement.parentElement)

        let courseName = item.querySelector("p").textContent;

        const storage = getFromStorage()
        storage.forEach(function(element ,index) {
            if (courseName === element.title) {
                storage.splice(index ,1)
            }
        });

        localStorage.setItem("courses" ,JSON.stringify(storage))
    }
}

// this function remove all items in cart by one click
function removeAllCourses() {
    /* shoppingCartContent.innerHTML = null;*/

    // make loop to search for firstchild and remove it.
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.firstChild.remove();
    }
    removeAllFromLocalStorage()
}

function getFromStorage() {
    let course;
    // if local storage contains anything put them in a variable
    if(localStorage.getItem("courses")){
        course = JSON.parse(localStorage.getItem("courses"))
    }
    // if local storage doesent have anything creat an empty array as a variables
    else{
        course = [];
    }
    return course;
}

function addToStorage(course) {
    let courses = getFromStorage()
    courses.push(course)
    localStorage.setItem("courses" ,JSON.stringify(courses));
}

function removeAllFromLocalStorage() {
    localStorage.clear();
}


function onLoad(e) {
    const Courses = getFromStorage()

    // creat a loop for search in localstorage and add items to cart
    Courses.forEach(element => {
        // creat a table row
        let row = document.createElement("tr");
        // put the needed information in a HTML table.
        row.innerHTML = `
            <td><img src= "${element.image}" width= "60%"></td>
            <td><p>${element.title}</p></td>
            <td>${element.cost}</td>
            <td><a href = "#" class = "remove">X</a></td>
        `
        shoppingCartContent.appendChild(row);
    });
    
}
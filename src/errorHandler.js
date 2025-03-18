export default function errorHandler(error) {
    if (error.name === "SyntaxError"){
        alert("Enter a valid cityname");
    } 
    console.log(error);

    
}
// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select the form element
  const form = document.getElementById("verificationForm");

  // Add an event listener for form submission
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the input values
    const studentName = document.getElementById("student-name").value.trim();
    const certificateID = document
      .getElementById("certificate-ID")
      .value.trim();

    // Basic form validation
    if (studentName === "" || certificateID === "") {
      // Show an error if either field is empty
      alert("Please fill in both the student name and certificate ID.");
    } else {
      fetch(`http://localhost:3000/api/validate/${certificateID}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Certificate not found");
          }
          return response.json();
        })
        .then((data) => {
          // Handle successful response (assuming the API returns a JSON object)
          if (data.isValid) {
            alert(`Certificate is valid for ID: ${certificateID}`);
          } else {
            alert("Certificate is not valid.");
          }
        })
        .catch((error) => {
          // Handle error (e.g., certificate not found, network error)
          alert(`Error: ${error.message}`);
        });
    }

    // API call to check if the certificate ID is valid
  });
});

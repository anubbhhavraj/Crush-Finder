// document.addEventListener("DOMContentLoaded", () => {
//     const collegeInput = document.getElementById("collegeName");
//     const autocompleteContainer = document.getElementById("autocomplete-container");

//     collegeInput.addEventListener("input", function () {
//         let inputValue = this.value.toLowerCase();
//         autocompleteContainer.innerHTML = "";

//         if (!inputValue) return;

//         let filteredColleges = colleges.filter(college =>
//             college.toLowerCase().includes(inputValue)
//         ).sort();

//         filteredColleges.slice(0, 10).forEach(college => {
//             let collegeOption = document.createElement("div");
//             collegeOption.textContent = college;
//             collegeOption.addEventListener("click", function () {
//                 collegeInput.value = college;
//                 autocompleteContainer.innerHTML = "";
//             });
//             autocompleteContainer.appendChild(collegeOption);
//         });
//     });

//     document.addEventListener("click", function (e) {
//         if (e.target !== collegeInput) {
//             autocompleteContainer.innerHTML = "";
//         }
//     });
// });

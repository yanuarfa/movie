// Ajax

// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=d0939e2b&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movie-container").html(cards);

//       // Ketika tombol detail diklik
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=d0939e2b&i=" +
//             $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = showMovieDetail(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// Fetch (resources, init)
// const searchBtn = document.querySelector(".search-button");
// searchBtn.addEventListener("click", function () {
//   const inputKey = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=d0939e2b&s=" + inputKey.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // Ketika tombol detail diklik

//       const modalDetailButton = document.querySelectorAll(
//         ".modal-detail-button"
//       );
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=d0939e2b&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

// Fetch (Refactoring) (Async Await)
const searchBtn = document.querySelector(".search-button"); //State the button when user click it
searchBtn.addEventListener("click", async function () { //When user click on the button then do this function
  try {
    const inputKey = document.querySelector(".input-keyword"); //State the search input element
    const movies = await getMovies(inputKey.value); //get the value from the search input and the use the function getMovies
    updateUI(movies); //use the UpdateUI function
  } catch (err) {
    alert(err); //If error catch the error and show them
  }
});

function getMovies(keyword) { //This function get the argument from the input element
  return fetch("http://www.omdbapi.com/?apikey=d0939e2b&s=" + keyword) //YOUR API KEY using fetch
  //Do Promise using chaining (.)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText); //If respone fail then state the error status text
      }
      return response.json(); //if succeed return the respon in JSON
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error); //When the api key fail or wrong do show this response error
      }
      return response.Search; //if succeed do the searching and show it
    });
}

function updateUI(movies) { //argument from the movies variable
  let cards = ""; //state the empty cards using let
  movies.forEach((m) => (cards += showCards(m))); //do the looping using forEach and then fill the cards variable using the showCards function
  const movieContainer = document.querySelector(".movie-container"); //get the element movie container to get the empty container
  movieContainer.innerHTML = cards; //after gain the container fill it with cards variable
}

// event binding
document.addEventListener("click", async function (e) {
  // console.log(e.target);
  if (e.target.classList.contains("modal-detail-button")) { 
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=d0939e2b&i=" + imdbid) //YOUR API KEY
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
    <div class="card" style="width: 18rem;">
        <img src="${m.Poster}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Lihat Detail</a>
        </div>
      </div>
</div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" alt="" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item"><strong>Sutradara : </strong> ${m.Director}</li>
                <li class="list-group-item"><strong>Pemain : </strong> ${m.Actors}</li>
                <li class="list-group-item"><strong>Penulis : </strong> ${m.Writer}</li>
                <li class="list-group-item"><strong>Plot: </strong> <br> ${m.Plot}</li>
              </ul>
        </div>
    </div>
  </div>`;
}

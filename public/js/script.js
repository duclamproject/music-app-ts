// APLAYER
const aplayer = document.getElementById("aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
    autoplay: true,
  });
  const avatar = document.querySelector(".singer-detail .inner-avatar");
  ap.on("pause", function () {
    avatar.style.animationPlayState = "paused";
  });
  ap.on("play", function () {
    avatar.style.animationPlayState = "running";
  });
}
// End: APLAYER

// Button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
    // console.log(isActive);

    const typeLike = isActive ? "dislike" : "like";

    const link = `/songs/like/${typeLike}/${idSong}`;

    const option = {
      method: "PATCH",
    };

    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.newLike} lượt thích`;
          buttonLike.classList.toggle("active");
          // console.log(data);
        }
      });
  });
}
// End: Button like

// Button favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
console.log(listButtonFavorite);

if (listButtonFavorite.length > 0) {
  listButtonFavorite.forEach((button) => {
    button.addEventListener("click", () => {
      const idSong = button.getAttribute("button-favorite");
      const isActive = button.classList.contains("active");
      // console.log(isActive);

      const typeFavorite = isActive ? "unfavorite" : "favorite";

      const link = `/songs/favorite/${typeFavorite}/${idSong}`;

      const option = {
        method: "PATCH",
      };

      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            button.classList.toggle("active");
          }
        });
    });
  });
}
// End: Button favorite

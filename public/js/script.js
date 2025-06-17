// APLAYER
const aplayer = document.getElementById("aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics,
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

  ap.on("ended", function () {
    const link = `/songs/listen/${dataSong._id}`;

    const option = {
      method: "PATCH",
    };

    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const elementInnenListen = document.querySelector(
          ".singer-detail .inner-listen span"
        );
        elementInnenListen.innerHTML = `${data.listen} lượt nghe`;
      });
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

// Search suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector(`input[name="keyword"]`);
  const boxSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;
    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.songs;
        if (songs.length > 0) {
          boxSuggest.classList.add("show");
          const htmls = songs.map((song) => {
            return `
                <a class="inner-item" href="/songs/detail/${song.slug}">
                    <div class="inner-image"><img src="${song.avatar}" /></div>
                    <div class="inner-info">
                        <div class="inner-title">${song.title}</div>
                        <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}</div>
                    </div>
                </a>
              `;
          });
          const boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = htmls.join("");
        } else {
          boxSearch.classList.remove("show");
        }
      });
  });
}
// End: Search suggest

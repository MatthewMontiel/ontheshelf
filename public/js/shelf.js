const submitGame = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const genre = document.querySelector("#genre").value.trim();
  const minplayers = document.querySelector("#minplayers").value.trim();
  const maxplayers = document.querySelector("#maxplayers").value.trim();
  const difficulty = document.querySelector("#difficulty").value.trim();
  const ages = document.querySelector("#ages").value.trim();
  const playtime = document.querySelector("#playtime").value.trim();

  if (title) {
    const response = await fetch("/api/games", {
      method: "POST",
      // do we need to tie in the user id here? if so how?
      body: JSON.stringify({
        title,
        genre,
        minplayers,
        maxplayers,
        difficulty,
        ages,
        playtime,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // check on this
      document.location.replace("/shelf");
    } else {
      alert();
      // response.statusText
    }
  }
};

document.querySelector("#submit-game").addEventListener("click", submitGame);

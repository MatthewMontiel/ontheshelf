// function to add game to the shelf
const submitGame = async (event) => {
  event.preventDefault();
  // local variables
  const title = document.querySelector("#title").value.trim();
  const genre = document.querySelector("#genre").value.trim();
  const minplayers = document.querySelector("#minplayers").value.trim();
  const maxplayers = document.querySelector("#maxplayers").value.trim();
  const difficulty = document.querySelector("#difficulty").value.trim();
  const ages = document.querySelector("#ages").value.trim();
  const playtime = document.querySelector("#playtime").value.trim();
  //
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
    // if game was good, place on shelf and place new game on shelf aka rewrite the shelf
    if (response.ok) {
      // check on this
      document.location.replace("/shelf");
    } else {
      alert("This game fell on the floor");
    }
  }
};

// throw away game from the shelf
const burnGame = async (event) => {
  if (event.target.hasAttribute("")) {
    const id = event.target.getAttribute("");
    const response = await fetch(`/api/game/${id}`, {
      method: "DELETE",
    });
    // if good response then burn the game
    if (response.ok) {
      document.location.replace("/shelf");
    } else {
      alert("This game dodged your attack")
    }
  }
}

// review viewport to locate and listen for functions
document.querySelector("#submit-game").addEventListener("click", submitGame);
document.querySelector("#").addEventListener("click", burnGame);

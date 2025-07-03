// TODO: localStorage save
async function getPlayer(name: TPlayerName): Promise<TPlayerFunction> {
  // Отработать сообщение по CSP ошибке: vimeo (site with example)
  try {
    let url = `http://localhost:4000/players/${name}.js`;
    const res = await fetch(url);
    const code = await res.text();
    return eval(code) as TPlayerFunction;
  } catch (e) {
    alert("Fatal error");
    console.error("Can't success exec fetchPlayer. Error:\n", e);
    throw new Error("Can't success exec fetchPlayer");
  }
}

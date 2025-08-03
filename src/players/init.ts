// TODO: Выпиливаем. Переделаем на отдельный плагин
async function getPlayer(name: TPlayerName): Promise<TPlayerFunction> {
  try {
    let url = `http://localhost:4000/players/${name}.js`;
    const res = await fetch(url);
    const code = await res.text();
    return eval(code) as TPlayerFunction;
  } catch (e) {
    alert(
      `Fatal error. Can't get a player '${name}'. May be actived HTTP header - CSP by site.`,
    );
    console.error("Can't success exec fetchPlayer. Error:\n", e);
    throw new Error("Can't success exec fetchPlayer");
  }
}

import Game from "./Game";
import UI from "./UI";

export const Routers = [
  {
    component: Game,
    path: "/game",
    exact: true,
  },
  {
    component: UI,
    path: "/ui",
    exact: true,
  },
  {
    component: Game,
    redirect: "/game",
    path: "/",
  },
];

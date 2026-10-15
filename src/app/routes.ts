import { Routes } from "@angular/router";
export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "home",
    title: "Overview | Idea to Impact",
    loadComponent: () => import("./pages/home").then((m) => m.Home),
  },
  {
    path: "ideas",
    title: "Ideas | Idea to Impact",
    loadComponent: () => import("./pages/ideas").then((m) => m.Ideas),
  },
  {
    path: "portfolio",
    title: "Portfolio | Idea to Impact",
    loadComponent: () => import("./pages/portfolio").then((m) => m.Portfolio),
  },
  {
    path: "strategy",
    title: "Strategy | Idea to Impact",
    loadComponent: () => import("./pages/strategy").then((m) => m.Strategy),
  },
  {
    path: "reports",
    title: "Reports | Idea to Impact",
    loadComponent: () => import("./pages/reports").then((m) => m.Reports),
  },
  { path: "**", redirectTo: "home" },
];

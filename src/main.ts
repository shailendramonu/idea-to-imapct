import { bootstrapApplication } from "@angular/platform-browser";
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
} from "@angular/router";
import { provideZonelessChangeDetection } from "@angular/core";
import { App } from "./app/app";
import { routes } from "./app/routes";
bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" }),
    ),
  ],
}).catch(console.error);

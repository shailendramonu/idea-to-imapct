import { Dialog } from "./shared/dialog";
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Store } from "./core/store";
import { Icon } from "./shared/icon";
@Component({
  selector: "app-root",
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Icon, Dialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip" href="#main">Skip to content</a>
    <aside class="sidebar" [class.open]="menu()">
      <a routerLink="/home" class="brand" (click)="menu.set(false)"
        ><span class="brandmark"><span></span><span></span><span></span></span
        ><span>Idea to Impact<small>STRATEGY INTO ACTION</small></span></a
      >
      <div class="workspace">
        <span class="workspace-icon">I</span>
        <div>Demand Group<small>Demo workspace</small></div>
        <span class="workspace-dot"></span>
      </div>
      <p class="nav-label">WORKSPACE</p>
      <nav aria-label="Main navigation">
        @for (item of links; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="active"
            (click)="menu.set(false)"
            ><app-icon [name]="item.icon" /><span>{{ item.label }}</span>
            @if (item.label === "Ideas") {
              <span class="nav-count">{{ store.ideas().length }}</span>
            }
          </a>
        }
      </nav>
      <div class="sidebar-bottom">
        <div class="sidebar-note">
          <app-icon name="spark" />
          <h4>Good ideas deserve impact.</h4>
          <p>One clear path from ambition to measurable outcomes.</p>
          <a routerLink="/strategy">Explore your strategy ↗</a>
        </div>
        <button class="reset" (click)="resetOpen.set(true)">
          <app-icon name="refresh" />Reset sample data
        </button>
        <div class="profile">
          <span class="avatar">DW</span>
          <div>Demo workspace<small>Executive view · no login</small></div>
        </div>
      </div>
    </aside>
    @if (menu()) {
      <button
        class="mobile-scrim"
        aria-label="Close navigation"
        (click)="menu.set(false)"
      ></button>
    }
    <div class="app-body">
      <header class="topbar">
        <div class="top-left">
          <button
            class="icon-button mobile-toggle"
            aria-label="Open navigation"
            (click)="menu.set(!menu())"
          >
            <app-icon name="menu" /></button
          ><span class="breadcrumb"
            >Workspace <span>/</span>
            <strong>Strategy &amp; investment</strong></span
          >
        </div>
        <div class="top-actions">
          <span class="demo-pill"><i></i> Interactive demo</span
          ><span class="top-date">FY 2026–27</span
          ><span class="avatar small">DW</span>
        </div>
      </header>
      <main id="main" tabindex="-1"><router-outlet /></main>
      <footer class="footer">
        <span
          >Idea to Impact <span class="muted">/</span> Strategy. Clarity.
          Results.</span
        ><span>Fictional sample data · AUD · Stored in this browser only</span>
      </footer>
    </div>
    @if (store.toast()) {
      <div class="toast" role="status">
        <app-icon name="check" />{{ store.toast()
        }}<button
          class="icon-button"
          aria-label="Dismiss notification"
          (click)="store.toast.set('')"
        >
          <app-icon name="close" />
        </button>
      </div>
    }
    @if (resetOpen()) {
      <div class="overlay">
        <section
          appDialog
          (dismissed)="resetOpen.set(false)"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-title"
          class="confirm-modal"
        >
          <h2 id="reset-title">Restore the demo?</h2>
          <p>
            This removes locally created ideas and edits, then restores the
            original sample dataset.
          </p>
          <div class="actions">
            <button class="btn" (click)="resetOpen.set(false)">
              Keep my changes</button
            ><button
              class="btn primary"
              (click)="store.reset(); resetOpen.set(false)"
            >
              Restore sample data
            </button>
          </div>
        </section>
      </div>
    }
  `,
})
export class App {
  readonly store = inject(Store);
  readonly menu = signal(false);
  readonly resetOpen = signal(false);
  readonly links = [
    { path: "/home", label: "Home", icon: "home" },
    { path: "/ideas", label: "Ideas", icon: "idea" },
    { path: "/portfolio", label: "Portfolio", icon: "portfolio" },
    { path: "/strategy", label: "Strategy", icon: "strategy" },
    { path: "/reports", label: "Reports", icon: "reports" },
  ];
}

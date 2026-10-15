import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Store } from "../core/store";
import { compact } from "../core/rules";
import { Icon } from "../shared/icon";
@Component({
  selector: "app-strategy",
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">DEMAND GROUP</div>
        <h1>Strategy, made actionable.</h1>
        <p>
          Give every investment a purpose and every objective a path to impact.
        </p>
      </div>
      <span class="year-chip"><app-icon name="calendar" />FY 2026–27</span>
    </div>
    <section class="strategy-banner">
      <span class="eyebrow">DEMAND GROUP · STRATEGIC AMBITION</span>
      <h2>
        Build a smarter, stronger business.<br /><em
          >Create value that lasts.</em
        >
      </h2>
      <p>
        Four strategic objectives. One connected portfolio of opportunities.
      </p>
      <div class="strategy-banner-foot">
        <span
          ><app-icon name="strategy" />{{ s.objectives.length }} strategic
          objectives</span
        ><span
          ><app-icon name="idea" />{{ s.ideas().length }} connected ideas</span
        ><span
          ><app-icon name="portfolio" />{{ compact(s.totalCost()) }} proposed
          investment</span
        >
      </div>
    </section>
    <div class="objective-grid">
      @for (o of s.objectives; track o.id; let n = $index) {
        <article class="panel objective-card">
          <div class="card-top">
            <span
              class="objective-number"
              [style.background]="o.colour + '20'"
              [style.color]="o.colour"
              >0{{ n + 1 }}</span
            ><span class="muted">{{ o.owner }}</span>
          </div>
          <h2>{{ o.title }}</h2>
          <p>{{ o.description }}</p>
          <div class="target">
            <small>SUCCESS LOOKS LIKE</small><strong>{{ o.target }}</strong>
          </div>
          <div class="alignment-label">
            <span>Illustrative objective progress</span
            ><strong>{{ o.progress }}%</strong>
          </div>
          <div class="bar-track">
            <span
              [style.width.%]="o.progress"
              [style.background]="o.colour"
            ></span>
          </div>
          <div class="objective-stats">
            <div>
              <strong>{{ count(o.id) }}</strong
              ><small>Linked ideas</small>
            </div>
            <div>
              <strong>{{ compact(cost(o.id)) }}</strong
              ><small>Proposed investment</small>
            </div>
            <div>
              <strong>{{ compact(benefit(o.id)) }}</strong
              ><small>Annual benefit</small>
            </div>
          </div>
          <a
            class="text-link"
            routerLink="/ideas"
            [queryParams]="{ objective: o.id }"
            >Explore aligned ideas<app-icon name="arrow"
          /></a>
        </article>
      }
    </div>
    <section class="panel">
      <div class="panel-heading">
        <div>
          <h2>From strategy to measurable outcomes</h2>
          <p>A clear, repeatable path for every opportunity</p>
        </div>
      </div>
      <div class="lifecycle">
        @for (step of steps; track step.title; let n = $index) {
          <div>
            <span>{{ n + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        }
      </div>
    </section>
    <div class="info-note">
      <app-icon name="info" />Strategy targets and objective progress are fixed
      illustrative data. Idea counts, investment and benefits update from your
      local dataset.
    </div>
  `,
})
export class Strategy {
  readonly s = inject(Store);
  readonly compact = compact;
  readonly steps = [
    { title: "Set strategy", text: "Define the outcomes that matter." },
    { title: "Capture ideas", text: "Give opportunities a single home." },
    { title: "Prioritise", text: "Compare value, risk and effort." },
    { title: "Govern", text: "Make informed, recorded decisions." },
    { title: "Deliver", text: "Turn approval into accountable work." },
    { title: "Realise value", text: "Measure outcomes and learn." },
  ];
  count(id: string): number {
    return this.s
      .ideas()
      .filter((i) => i.objective === id && i.status !== "Cancelled").length;
  }
  cost(id: string): number {
    return this.s
      .ideas()
      .filter((i) => i.objective === id && i.status !== "Cancelled")
      .reduce((a, i) => a + i.cost, 0);
  }
  benefit(id: string): number {
    return this.s
      .ideas()
      .filter((i) => i.objective === id && i.status !== "Cancelled")
      .reduce((a, i) => a + i.benefit, 0);
  }
}

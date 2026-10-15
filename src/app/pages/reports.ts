import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Store } from "../core/store";
import { compact, priorityScore } from "../core/rules";
import { STAGES } from "../core/models";
import { Icon } from "../shared/icon";
@Component({
  selector: "app-reports",
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">EVIDENCE, NOT GUESSWORK</div>
        <h1>Clarity behind every decision.</h1>
        <p>
          Understand pipeline health, strategic investment and realised value.
        </p>
      </div>
      <div class="actions">
        <button class="btn" (click)="print()">
          <app-icon name="file" />Print report</button
        ><button class="btn primary" (click)="s.export(filtered())">
          <app-icon name="down" />Export CSV
        </button>
      </div>
    </div>
    <div class="report-filter">
      <span><app-icon name="reports" />Portfolio intelligence</span
      ><select
        aria-label="Report objective filter"
        [value]="objective()"
        (change)="objective.set($any($event.target).value)"
      >
        <option value="">All strategic objectives</option>
        @for (o of s.objectives; track o.id) {
          <option [value]="o.id">{{ o.title }}</option>
        }</select
      ><span class="muted"
        >{{ filtered().length }} ideas · Current local dataset</span
      >
    </div>
    <div class="metrics">
      <article class="metric">
        <div class="metric-top">
          Proposed investment<app-icon name="portfolio" />
        </div>
        <strong>{{ compact(cost()) }}</strong
        ><span>Excludes cancelled ideas</span>
      </article>
      <article class="metric">
        <div class="metric-top">
          Expected annual benefit<app-icon name="trend" />
        </div>
        <strong>{{ compact(benefit()) }}</strong
        ><span>Estimates, not guaranteed returns</span>
      </article>
      <article class="metric">
        <div class="metric-top">Realised benefit<app-icon name="check" /></div>
        <strong>{{ compact(realised()) }}</strong
        ><span>Illustrative completed initiatives</span>
      </article>
      <article class="metric highlight">
        <div class="metric-top">
          Average priority score<app-icon name="strategy" />
        </div>
        <strong>{{ average() }}<small>/100</small></strong
        ><span>Non-cancelled ideas</span>
      </article>
    </div>
    <div class="two-col">
      <section class="panel">
        <div class="panel-heading">
          <div>
            <h2>Pipeline health</h2>
            <p>Number of ideas at each lifecycle stage</p>
          </div>
          <app-icon name="reports" />
        </div>
        <div class="stage-chart">
          @for (st of stages; track st) {
            <div class="stage-bar">
              <span>{{ st }}</span>
              <div class="bar-track">
                <span
                  [style.width.%]="(count(st) / maxStage()) * 100"
                  [style.background]="
                    st === 'Completed'
                      ? '#497e68'
                      : st === 'Demand forum'
                        ? '#a18ac4'
                        : '#88a69b'
                  "
                ></span>
              </div>
              <strong>{{ count(st) }}</strong>
            </div>
          }
        </div>
      </section>
      <section class="panel">
        <div class="panel-heading">
          <div>
            <h2>Investment mix</h2>
            <p>Estimated cost by category, excluding cancelled ideas</p>
          </div>
          <app-icon name="portfolio" />
        </div>
        <div class="category-list">
          @for (c of categories; track c.name) {
            <div class="alignment-row">
              <div class="alignment-label">
                <span
                  ><i class="dot" [style.background]="c.colour"></i
                  >{{ c.name }}</span
                ><strong>{{ compact(categoryCost(c.name)) }}</strong>
              </div>
              <div class="bar-track">
                <span
                  [style.width.%]="
                    cost() ? (categoryCost(c.name) / cost()) * 100 : 0
                  "
                  [style.background]="c.colour"
                ></span>
              </div>
            </div>
          }
        </div>
        <div class="report-insight">
          <app-icon name="info" />
          <div>
            <strong>Keep the balance intentional.</strong>
            <p>
              Compare investment distribution with your strategic ambition, not
              just the number of ideas.
            </p>
          </div>
        </div>
      </section>
    </div>
    <section class="panel">
      <div class="panel-heading">
        <div>
          <h2>Benefits realisation</h2>
          <p>
            Completed initiatives only · expected annual benefit versus recorded
            realised benefit
          </p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Owner</th>
              <th>Expected annual benefit</th>
              <th>Realised benefit</th>
              <th>Realisation</th>
            </tr>
          </thead>
          <tbody>
            @for (i of completed(); track i.id) {
              <tr>
                <td>
                  <a
                    class="table-title"
                    routerLink="/ideas"
                    [queryParams]="{ id: i.id }"
                    >{{ i.title }}</a
                  ><small>{{ i.id }}</small>
                </td>
                <td>{{ i.owner }}</td>
                <td>{{ compact(i.benefit) }}</td>
                <td>{{ compact(i.realised) }}</td>
                <td>
                  <span class="score"
                    >{{
                      i.benefit
                        ? Math.round((i.realised / i.benefit) * 100)
                        : 0
                    }}%</span
                  >
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="empty">
                  No completed initiatives in this selection.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
    <div class="info-note">
      <app-icon name="info" />All reports use fictional demonstration data.
      Expected and realised values are illustrative, not audited financial
      measures.
    </div>
  `,
})
export class Reports {
  readonly s = inject(Store);
  readonly objective = signal("");
  readonly compact = compact;
  readonly Math = Math;
  readonly stages = STAGES;
  readonly categories = [
    { name: "Customer", colour: "#7895d4" },
    { name: "Growth", colour: "#497e68" },
    { name: "Operational", colour: "#c99b50" },
    { name: "Regulatory", colour: "#a18ac4" },
    { name: "Enablement", colour: "#7aaeb2" },
  ];
  readonly filtered = computed(() =>
    this.s
      .ideas()
      .filter((i) => !this.objective() || i.objective === this.objective()),
  );
  readonly included = computed(() =>
    this.filtered().filter((i) => i.status !== "Cancelled"),
  );
  readonly cost = computed(() =>
    this.included().reduce((a, i) => a + i.cost, 0),
  );
  readonly benefit = computed(() =>
    this.included().reduce((a, i) => a + i.benefit, 0),
  );
  readonly realised = computed(() =>
    this.included().reduce((a, i) => a + i.realised, 0),
  );
  readonly average = computed(() =>
    this.included().length
      ? Math.round(
          this.included().reduce((a, i) => a + priorityScore(i.scores), 0) /
            this.included().length,
        )
      : 0,
  );
  readonly completed = computed(() =>
    this.filtered().filter((i) => i.status === "Completed"),
  );
  count(st: string): number {
    return this.filtered().filter((i) => i.status === st).length;
  }
  maxStage(): number {
    return Math.max(1, ...this.stages.map((st) => this.count(st)));
  }
  categoryCost(c: string): number {
    return this.included()
      .filter((i) => i.category === c)
      .reduce((a, i) => a + i.cost, 0);
  }
  print(): void {
    window.print();
  }
}

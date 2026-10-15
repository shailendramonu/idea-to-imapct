import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "../core/store";
import { Idea } from "../core/models";
import { compact, priorityScore, readiness } from "../core/rules";
import { Metrics } from "../shared/metrics";
import { Icon } from "../shared/icon";
import { Badge } from "../shared/badge";
@Component({
  selector: "app-portfolio",
  imports: [RouterLink, Metrics, Icon, Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CHOOSE WHAT MATTERS</div>
        <h1>A portfolio with purpose.</h1>
        <p>Balance strategic value, investment and delivery readiness.</p>
      </div>
      <button class="btn" (click)="s.export()">
        <app-icon name="down" />Export portfolio
      </button>
    </div>
    <app-metrics />
    <div class="tabs page-tabs" role="tablist" aria-label="Portfolio views">
      @for (t of views; track t) {
        <button
          role="tab"
          [attr.aria-selected]="view() === t"
          [class.active]="view() === t"
          (click)="view.set(t)"
        >
          {{ t }}
        </button>
      }
    </div>
    @if (view() === "Prioritisation") {
      <section class="budget-banner">
        <div>
          <span class="eyebrow">WHAT CAN WE INVEST IN?</span>
          <h2>Make the trade-offs visible.</h2>
          <p>
            Illustrative top-down funding scenario. Not an approval or resource
            commitment.
          </p>
        </div>
        <label
          >Available budget (AUD)<input
            type="number"
            min="0"
            step="50000"
            [value]="budget()"
            (input)="budget.set(Math.max(0, +$any($event.target).value))"
        /></label>
        <div class="budget-result">
          <strong>{{ scenario().count }}</strong
          ><span
            >ideas within budget<br />{{
              compact(scenario().spent)
            }}
            allocated</span
          >
        </div>
      </section>
      <section class="panel">
        <div class="panel-heading">
          <div>
            <h2>Ranked investment opportunities</h2>
            <p>
              Active ideas only · weighted score · benefit used to break ties
            </p>
          </div>
          <span class="count-chip">{{ s.ranked().length }} ideas</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Opportunity</th>
                <th>Stage</th>
                <th>Investment</th>
                <th>Annual benefit</th>
                <th>Score</th>
                <th>Scenario</th>
              </tr>
            </thead>
            <tbody>
              @for (i of s.ranked(); track i.id; let n = $index) {
                <tr [class.below-line]="n >= scenario().count">
                  <td>
                    <span class="rank">{{ n + 1 }}</span>
                  </td>
                  <td>
                    <a
                      class="table-title"
                      routerLink="/ideas"
                      [queryParams]="{ id: i.id }"
                      >{{ i.title }}</a
                    ><small>{{ s.objective(i.objective) }}</small>
                  </td>
                  <td><app-badge [text]="i.status" /></td>
                  <td>{{ compact(i.cost) }}</td>
                  <td>{{ compact(i.benefit) }}</td>
                  <td>
                    <span class="score">{{ score(i.scores) }}</span>
                  </td>
                  <td>
                    <span
                      [class]="
                        n < scenario().count ? 'scenario-in' : 'scenario-out'
                      "
                      >{{
                        scenario().count
                          ? "Within budget"
                          : "Below funding line"
                      }}</span
                    >
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="panel-foot">
          <app-icon name="info" />The funding line stops at the first idea that
          exceeds the remaining budget. Mandatory work and capacity need
          separate review.
        </div>
      </section>
    }
    @if (view() === "Value matrix") {
      <section class="panel">
        <div class="panel-heading">
          <div>
            <h2>Find the right balance</h2>
            <p>Expected annual benefit versus estimated delivery effort</p>
          </div>
          <span class="count-chip">Select an idea to inspect</span>
        </div>
        <div class="matrix-wrap">
          <span class="axis-y">EXPECTED ANNUAL BENEFIT →</span>
          <div class="matrix">
            <span class="quadrant q1">QUICK WINS</span
            ><span class="quadrant q2">STRATEGIC BETS</span
            ><span class="quadrant q3">SMALL IMPROVEMENTS</span
            ><span class="quadrant q4">RECONSIDER</span>
            @for (i of s.active(); track i.id) {
              <a
                class="bubble"
                routerLink="/ideas"
                [queryParams]="{ id: i.id }"
                [style.left.%]="10 + i.effort * 8"
                [style.bottom.%]="10 + (i.benefit / maxBenefit()) * 78"
                [style.background]="s.colour(i.objective)"
                [attr.aria-label]="
                  i.title +
                  ': ' +
                  compact(i.benefit) +
                  ' benefit, effort ' +
                  i.effort
                "
                [title]="
                  i.title + ' · ' + compact(i.benefit) + ' · effort ' + i.effort
                "
                >{{ i.id.slice(-2) }}</a
              >
            }
          </div>
          <span class="axis-x"
            >LOWER EFFORT ← DELIVERY EFFORT → HIGHER EFFORT</span
          >
        </div>
        <div class="legend">
          @for (o of s.objectives; track o.id) {
            <span
              ><i class="dot" [style.background]="o.colour"></i
              >{{ o.title }}</span
            >
          }
        </div>
      </section>
    }
    @if (view() === "Governance") {
      <div class="two-col">
        <section class="panel">
          <div class="panel-heading">
            <div>
              <h2>Demand forum</h2>
              <p>Qualified demand, clear decisions, accountable owners</p>
            </div>
            <app-icon name="people" />
          </div>
          <div class="forum-info">
            <div>
              <small>Cadence</small><strong>Weekly · 30 minutes</strong>
            </div>
            <div>
              <small>Voting members</small
              ><strong>6 configured for demo</strong>
            </div>
            <div>
              <small>Quorum reference</small><strong>4 voting members</strong>
            </div>
            <div>
              <small>Decision authority</small
              ><strong>Concept endorsement</strong>
            </div>
          </div>
          <div class="info-note">
            <app-icon name="info" />Quorum shown as floor(6 ÷ 2) + 1. Attendance
            and voting are not enforced in this static demo.
          </div>
        </section>
        <section class="panel">
          <div class="panel-heading">
            <div>
              <h2>Before the forum</h2>
              <p>Keep governance proportionate and evidence-led</p>
            </div>
            <app-icon name="shield" />
          </div>
          <div class="checklist">
            <div>✓ Strategic objective and sponsor</div>
            <div>✓ Concept and investment estimate</div>
            <div>✓ Funding pathway and categorisation</div>
            <div>✓ Delivery team consultation</div>
            <div>✓ Business operations assurance</div>
          </div>
        </section>
      </div>
      <section class="panel">
        <div class="panel-heading">
          <div>
            <h2>Agenda for review</h2>
            <p>Open a proposal to review evidence and record a decision</p>
          </div>
          <span class="count-chip">{{ s.forum().length }} proposals</span>
        </div>
        @for (i of s.forum(); track i.id) {
          <a
            class="decision-row"
            routerLink="/ideas"
            [queryParams]="{ id: i.id, tab: 'Governance' }"
            ><span class="item-icon"><app-icon name="file" /></span>
            <div>
              <small>{{ i.id }} · {{ i.owner }}</small>
              <h3>{{ i.title }}</h3>
              <span
                >{{ compact(i.cost) }} ·
                {{
                  readiness(i).length
                    ? "Readiness checks outstanding"
                    : "Ready for review"
                }}</span
              >
            </div>
            <app-icon name="chevron"
          /></a>
        } @empty {
          <div class="empty">No proposals are awaiting a forum decision.</div>
        }
      </section>
    }
    @if (view() === "Delivery") {
      <div class="delivery-grid">
        @for (i of s.approved(); track i.id) {
          <article class="panel delivery-card">
            <div class="card-top">
              <span class="eyebrow">{{ i.id }}</span
              ><app-badge [text]="i.status" />
            </div>
            <h2>{{ i.title }}</h2>
            <p>{{ s.objective(i.objective) }}</p>
            <div class="delivery-owner">
              <span class="avatar small">{{ i.owner.slice(0, 1) }}</span>
              <div>{{ i.owner }}<small>Accountable delivery owner</small></div>
            </div>
            <div class="alignment-label">
              <span>Delivery progress</span><strong>{{ i.progress }}%</strong>
            </div>
            <div class="bar-track">
              <span
                [style.width.%]="i.progress"
                [style.background]="s.colour(i.objective)"
              ></span>
            </div>
            <div class="delivery-stats">
              <div>
                <small>Investment</small><strong>{{ compact(i.cost) }}</strong>
              </div>
              <div>
                <small>Annual benefit</small
                ><strong>{{ compact(i.benefit) }}</strong>
              </div>
            </div>
            <a class="btn" routerLink="/ideas" [queryParams]="{ id: i.id }"
              >View delivery brief<app-icon name="arrow"
            /></a>
          </article>
        }
      </div>
      <div class="info-note">
        <app-icon name="info" />Delivery tracking is illustrative. Jira and
        Azure DevOps are not connected.
      </div>
    }
  `,
})
export class Portfolio {
  readonly s = inject(Store);
  readonly view = signal(
    inject(ActivatedRoute).snapshot.queryParamMap.get("view") === "governance"
      ? "Governance"
      : "Prioritisation",
  );
  readonly views = ["Prioritisation", "Value matrix", "Governance", "Delivery"];
  readonly budget = signal(750000);
  readonly Math = Math;
  readonly compact = compact;
  readonly score = priorityScore;
  readonly readiness = readiness;
  readonly scenario = computed(() => {
    let spent = 0,
      count = 0;
    for (const i of this.s.ranked()) {
      if (spent + i.cost > this.budget()) break;
      spent += i.cost;
      count++;
    }
    return { spent, count };
  });
  maxBenefit(): number {
    return Math.max(1, ...this.s.active().map((i) => i.benefit));
  }
}

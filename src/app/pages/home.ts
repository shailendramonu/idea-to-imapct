import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Store } from "../core/store";
import { compact, priorityScore } from "../core/rules";
import { Metrics } from "../shared/metrics";
import { Icon } from "../shared/icon";
import { Badge } from "../shared/badge";
@Component({
  selector: "app-home",
  imports: [RouterLink, Metrics, Icon, Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">THE BIG PICTURE</div>
        <h1>Great ideas. Real impact.</h1>
        <p>
          Your strategy, opportunities and investment decisions. All in one
          place.
        </p>
      </div>
      <a class="btn primary" routerLink="/ideas" [queryParams]="{ new: 1 }"
        ><app-icon name="plus" />Capture an idea</a
      >
    </div>
    <section class="hero">
      <div>
        <span class="hero-tag"><i></i> FROM AMBITION TO OUTCOMES</span>
        <h2>Invest in what<br /><em>moves you forward.</em></h2>
        <p>
          Connect every idea to your strategy.<br />Prioritise with confidence.
          Deliver measurable value.
        </p>
        <a class="btn lime" routerLink="/portfolio"
          >Explore your portfolio<app-icon name="arrow"
        /></a>
      </div>
      <div class="hero-journey">
        <div class="journey-orbit"></div>
        <div class="journey-card one">
          <span class="journey-icon"><app-icon name="idea" /></span>
          <div>
            Capture the opportunity<small>One pipeline. Every good idea.</small>
          </div>
          <span class="mini-check">✓</span>
        </div>
        <div class="journey-connector"></div>
        <div class="journey-card two">
          <span class="journey-icon"><app-icon name="strategy" /></span>
          <div>
            Choose what matters<small>Aligned. Prioritised. Governed.</small>
          </div>
          <span class="mini-check">✓</span>
        </div>
        <div class="journey-connector"></div>
        <div class="journey-card three">
          <span class="journey-icon"><app-icon name="trend" /></span>
          <div>
            Turn decisions into value<small
              >Clear ownership. Real outcomes.</small
            >
          </div>
          <span class="mini-check">✓</span>
        </div>
      </div>
    </section>
    <app-metrics />
    <div class="two-col">
      <section class="panel">
        <div class="panel-heading">
          <div>
            <h2>Where strategy meets investment</h2>
            <p>Estimated investment by strategic objective</p>
          </div>
          <a routerLink="/strategy" class="text-link"
            >View strategy <app-icon name="arrow"
          /></a>
        </div>
        <div class="alignment-list">
          @for (o of s.objectives; track o.id) {
            <div class="alignment-row">
              <div class="alignment-label">
                <span
                  ><i class="dot" [style.background]="o.colour"></i
                  >{{ o.title }}</span
                ><strong>{{ compact(cost(o.id)) }}</strong>
              </div>
              <div class="bar-track">
                <span
                  [style.width.%]="
                    s.totalCost() ? (cost(o.id) / s.totalCost()) * 100 : 0
                  "
                  [style.background]="o.colour"
                ></span>
              </div>
              <small>{{ count(o.id) }} ideas linked to this objective</small>
            </div>
          }
        </div>
        <div class="panel-foot">
          <app-icon name="strategy" /><span
            >Every active idea has a strategic home.</span
          >
        </div>
      </section>
      <section class="panel">
        <div class="panel-heading">
          <div>
            <h2>Decisions that need you</h2>
            <p>Your next demand forum agenda</p>
          </div>
          <span class="count-chip">{{ s.forum().length }} items</span>
        </div>
        @for (i of s.forum(); track i.id) {
          <a
            class="decision-row"
            routerLink="/ideas"
            [queryParams]="{ id: i.id, tab: 'Governance' }"
            ><span
              class="item-icon"
              [style.background]="s.colour(i.objective) + '20'"
              [style.color]="s.colour(i.objective)"
              ><app-icon name="file"
            /></span>
            <div>
              <small>{{ i.id }} · {{ i.category }}</small>
              <h3>{{ i.title }}</h3>
              <span
                >{{ compact(i.cost) }} investment ·
                {{ priorityScore(i.scores) }} priority score</span
              >
            </div>
            <app-icon name="chevron"
          /></a>
        } @empty {
          <div class="empty">No proposals are awaiting the forum.</div>
        }
        <a
          class="panel-foot text-link"
          routerLink="/portfolio"
          [queryParams]="{ view: 'governance' }"
          >Open governance workspace <app-icon name="arrow"
        /></a>
      </section>
    </div>
    <section class="panel">
      <div class="panel-heading">
        <div>
          <h2>Highest-priority opportunities</h2>
          <p>Evidence-led ranking, with executive judgement</p>
        </div>
        <a class="text-link" routerLink="/portfolio"
          >View all <app-icon name="arrow"
        /></a>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Opportunity</th>
              <th>Strategic objective</th>
              <th>Stage</th>
              <th>Expected benefit</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            @for (i of s.ranked().slice(0, 4); track i.id) {
              <tr>
                <td>
                  <a
                    class="table-title"
                    routerLink="/ideas"
                    [queryParams]="{ id: i.id }"
                    >{{ i.title }}</a
                  ><small>{{ i.id }} · {{ i.owner }}</small>
                </td>
                <td>
                  <span class="objective-label"
                    ><i
                      class="dot"
                      [style.background]="s.colour(i.objective)"
                    ></i
                    >{{ s.objective(i.objective) }}</span
                  >
                </td>
                <td><app-badge [text]="i.status" /></td>
                <td>{{ compact(i.benefit) }}</td>
                <td>
                  <span class="score">{{ priorityScore(i.scores) }}</span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class Home {
  readonly s = inject(Store);
  readonly compact = compact;
  readonly priorityScore = priorityScore;
  cost(id: string): number {
    return this.s
      .ideas()
      .filter((i) => i.objective === id && i.status !== "Cancelled")
      .reduce((a, i) => a + i.cost, 0);
  }
  count(id: string): number {
    return this.s
      .ideas()
      .filter((i) => i.objective === id && i.status !== "Cancelled").length;
  }
}

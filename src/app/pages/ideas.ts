import { Dialog } from "../shared/dialog";
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  DestroyRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "../core/store";
import { Idea, Stage, Scores, STAGES } from "../core/models";
import { compact, money, priorityScore, readiness } from "../core/rules";
import { Icon } from "../shared/icon";
import { Badge } from "../shared/badge";
@Component({
  selector: "app-ideas",
  imports: [ReactiveFormsModule, Icon, Badge, Dialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">OPPORTUNITY STARTS HERE</div>
        <h1>Your next big idea.</h1>
        <p>
          Capture opportunities. Build the case. Move the right ideas forward.
        </p>
      </div>
      <button class="btn primary" (click)="openNew()">
        <app-icon name="plus" />Capture an idea
      </button>
    </div>
    <div class="summary-strip">
      <span
        ><strong>{{ s.ideas().length }}</strong> total ideas</span
      ><span
        ><strong>{{ s.active().length }}</strong> active</span
      ><span
        ><strong>{{ s.forum().length }}</strong> awaiting forum</span
      ><span
        ><strong>{{ compact(s.totalBenefit()) }}</strong> expected annual
        benefit</span
      >
    </div>
    <section class="panel">
      <div class="toolbar">
        <label class="search-field"
          ><app-icon name="search" /><input
            aria-label="Search ideas"
            placeholder="Search ideas, IDs or owners…"
            [value]="search()"
            (input)="search.set($any($event.target).value)" /></label
        ><select
          aria-label="Filter by stage"
          [value]="stage()"
          (change)="stage.set($any($event.target).value)"
        >
          <option value="">All stages</option>
          @for (st of stages; track st) {
            <option [value]="st">{{ st }}</option>
          }</select
        ><select
          aria-label="Filter by objective"
          [value]="objective()"
          (change)="objective.set($any($event.target).value)"
        >
          <option value="">All objectives</option>
          @for (o of s.objectives; track o.id) {
            <option [value]="o.id">{{ o.title }}</option>
          }</select
        ><select
          aria-label="Sort ideas"
          [value]="sort()"
          (change)="sort.set($any($event.target).value)"
        >
          <option value="updated">Recently updated</option>
          <option value="score">Priority score</option>
          <option value="benefit">Expected benefit</option></select
        ><button class="btn subtle" (click)="clear()">Reset filters</button
        ><button
          class="icon-button"
          aria-label="Export filtered ideas"
          (click)="s.export(filtered())"
        >
          <app-icon name="down" />
        </button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Idea / opportunity</th>
              <th>Objective</th>
              <th>Stage</th>
              <th>Investment</th>
              <th>Score</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (i of filtered(); track i.id) {
              <tr>
                <td>
                  <button class="table-title" (click)="open(i.id)">
                    {{ i.title }}</button
                  ><small>{{ i.id }} · {{ i.owner }} · {{ i.branch }}</small>
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
                <td>{{ compact(i.cost) }}</td>
                <td>
                  <span class="score">{{ score(i.scores) }}</span>
                </td>
                <td class="nowrap muted">{{ i.updated }}</td>
                <td>
                  <button
                    class="icon-button"
                    [attr.aria-label]="'Open ' + i.title"
                    (click)="open(i.id)"
                  >
                    <app-icon name="chevron" />
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="7">
                  <div class="empty">
                    <app-icon name="search" />
                    <h3>No matching ideas</h3>
                    <p>Try a different search or clear your filters.</p>
                    <button class="btn" (click)="clear()">Clear filters</button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div class="panel-foot">
        Showing {{ filtered().length }} of {{ s.ideas().length }} ideas · All
        figures in AUD
      </div>
    </section>
    @if (creating()) {
      <div class="overlay">
        <section
          class="form-modal"
          appDialog
          (dismissed)="close()"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-title"
        >
          <div class="modal-heading">
            <div>
              <div class="eyebrow">START WITH THE OPPORTUNITY</div>
              <h2 id="new-title">Capture a new idea</h2>
              <p>
                A clear problem is the first step towards meaningful impact.
              </p>
            </div>
            <button
              class="icon-button"
              aria-label="Close new idea"
              (click)="close()"
            >
              <app-icon name="close" />
            </button>
          </div>
          <form [formGroup]="form" (ngSubmit)="create()">
            <div class="form-grid">
              <label class="full"
                >Idea title *<input
                  formControlName="title"
                  placeholder="A short, outcome-focused title"
                  maxlength="120" /></label
              ><label class="full"
                >Problem or opportunity *<textarea
                  formControlName="description"
                  rows="3"
                  placeholder="What needs to change, and why does it matter?"
                ></textarea></label
              ><label
                >Strategic objective *<select formControlName="objective">
                  @for (o of s.objectives; track o.id) {
                    <option [value]="o.id">{{ o.title }}</option>
                  }
                </select></label
              ><label
                >Investment category<select formControlName="category">
                  @for (c of categories; track c) {
                    <option>{{ c }}</option>
                  }
                </select></label
              ><label
                >Requestor / owner *<input formControlName="owner" /></label
              ><label
                >Executive sponsor *<input formControlName="sponsor" /></label
              ><label>Business unit<input formControlName="branch" /></label
              ><label
                >Funding pathway<select formControlName="funding">
                  <option>Operating budget</option>
                  <option>Strategic investment</option>
                  <option>To be confirmed</option>
                </select></label
              ><label
                >Estimated investment (AUD)<input
                  type="number"
                  min="0"
                  formControlName="cost" /></label
              ><label
                >Expected annual benefit (AUD)<input
                  type="number"
                  min="0"
                  formControlName="benefit"
              /></label>
            </div>
            @if (form.invalid && submitted()) {
              <p class="validation" role="alert">
                Enter a title (at least 5 characters), description (at least 20
                characters), owner and sponsor. Estimates must be zero or
                greater.
              </p>
            }
            <div class="info-note">
              <app-icon name="info" />Demo only. No email is sent and no data
              leaves your browser.
            </div>
            <div class="modal-actions">
              <button type="button" class="btn" (click)="close()">Cancel</button
              ><button class="btn primary" type="submit">
                <app-icon name="plus" />Submit idea
              </button>
            </div>
          </form>
        </section>
      </div>
    }
    @if (selected(); as i) {
      <div class="drawer-overlay">
        <button
          class="drawer-scrim"
          aria-label="Close idea details"
          (click)="close()"
        ></button>
        <section
          class="drawer"
          appDialog
          (dismissed)="close()"
          role="dialog"
          aria-modal="true"
          aria-labelledby="idea-title"
        >
          <div class="drawer-heading">
            <div>
              <div class="eyebrow">{{ i.id }} · {{ i.category }}</div>
              <h2 id="idea-title">{{ i.title }}</h2>
              <div class="drawer-meta">
                <app-badge [text]="i.status" /><span
                  >Updated {{ i.updated }}</span
                >
              </div>
            </div>
            <button
              class="icon-button"
              aria-label="Close idea details"
              (click)="close()"
            >
              <app-icon name="close" />
            </button>
          </div>
          <div class="tabs" role="tablist" aria-label="Idea details">
            @for (t of tabs; track t) {
              <button
                role="tab"
                [attr.aria-selected]="tab() === t"
                [class.active]="tab() === t"
                (click)="tab.set(t)"
              >
                {{ t }}
              </button>
            }
          </div>
          <div class="drawer-content">
            @if (tab() === "Overview") {
              <div class="detail-metrics">
                <div>
                  <small>Estimated investment</small
                  ><strong>{{ money(i.cost) }}</strong>
                </div>
                <div>
                  <small>Expected annual benefit</small
                  ><strong>{{ money(i.benefit) }}</strong>
                </div>
                <div>
                  <small>Priority score</small
                  ><strong>{{ score(i.scores) }}<small>/100</small></strong>
                </div>
              </div>
              <h3>The opportunity</h3>
              <p>{{ i.description }}</p>
              <dl class="details-grid">
                <div>
                  <dt>Strategic objective</dt>
                  <dd>{{ s.objective(i.objective) }}</dd>
                </div>
                <div>
                  <dt>Business unit</dt>
                  <dd>{{ i.branch }}</dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>{{ i.owner }}</dd>
                </div>
                <div>
                  <dt>Executive sponsor</dt>
                  <dd>{{ i.sponsor }}</dd>
                </div>
                <div>
                  <dt>Funding pathway</dt>
                  <dd>{{ i.funding }}</dd>
                </div>
                <div>
                  <dt>Created</dt>
                  <dd>{{ i.created }}</dd>
                </div>
              </dl>
              <div class="section-divider"></div>
              <h3>Progress the demand</h3>
              <p class="muted">
                Forum entry requires a complete concept and assurance. Approval
                requires a recorded endorsement.
              </p>
              <div class="inline-form">
                <select
                  #nextStage
                  aria-label="Next demand stage"
                  [value]="i.status"
                >
                  @for (st of stages; track st) {
                    <option>{{ st }}</option>
                  }</select
                ><button class="btn primary" (click)="move(i, nextStage.value)">
                  Update stage
                </button>
              </div>
              @if (i.status === "Approved") {
                <div class="info-note">
                  <app-icon name="check" />Approved for delivery. Handover is
                  simulated; no external system is connected.
                </div>
                <button class="btn" (click)="move(i, 'Delivery')">
                  Hand over to delivery <app-icon name="arrow" />
                </button>
              }
            }
            @if (tab() === "Assessment") {
              <h3>Concept &amp; assurance</h3>
              <p class="muted">
                Save the concept and confirm consultation before the forum.
              </p>
              <label
                >Concept and proposed delivery approach<textarea
                  #concept
                  rows="4"
                  [value]="i.concept"
                ></textarea></label
              ><label class="checkbox"
                ><input
                  #social
                  type="checkbox"
                  [checked]="i.socialised"
                />Consulted impacted delivery teams</label
              ><label class="checkbox"
                ><input
                  #assured
                  type="checkbox"
                  [checked]="i.assurance"
                />Business operations assurance completed</label
              ><button
                class="btn primary"
                (click)="
                  saveConcept(i, concept.value, social.checked, assured.checked)
                "
              >
                Save concept &amp; assurance
              </button>
              <div class="section-divider"></div>
              <div class="panel-heading compact-heading">
                <div>
                  <h3>Priority assessment</h3>
                  <p>Six transparent criteria, each scored 1–5.</p>
                </div>
                <span class="score large">{{ score(i.scores) }}</span>
              </div>
              @for (c of criteria; track c.key) {
                <div class="criterion">
                  <div>
                    <strong>{{ c.label }}</strong
                    ><small>{{ c.weight }}% weighting</small>
                  </div>
                  <select
                    [attr.aria-label]="c.label + ' score'"
                    [value]="i.scores[c.key]"
                    (change)="setScore(i, c.key, +$any($event.target).value)"
                  >
                    @for (n of [1, 2, 3, 4, 5]; track n) {
                      <option [value]="n">{{ n }} / 5</option>
                    }
                  </select>
                </div>
              }
              <div class="info-note">
                <app-icon name="info" />Illustrative weighted scoring, not the
                proprietary six-category RICE model in the reference guide.
                Scores support judgement; they do not make decisions.
              </div>
            }
            @if (tab() === "Governance") {
              <h3>Forum readiness</h3>
              @if (readiness(i).length) {
                <div class="checklist warning">
                  @for (issue of readiness(i); track issue) {
                    <div>○ {{ issue }}</div>
                  }
                </div>
              } @else {
                <div class="info-note success">
                  <app-icon name="shield" />All readiness checks complete. Ready
                  for an informed decision.
                </div>
              }
              <div class="section-divider"></div>
              <h3>Record a decision</h3>
              <p class="muted">
                This demo simulates a forum decision. It does not verify voting
                authority or quorum.
              </p>
              <label
                >Decision outcome<select #outcome>
                  <option>Endorsed for investment work</option>
                  <option>More information required</option>
                  <option>Pending decision</option>
                  <option>On hold</option>
                  <option>Rejected</option>
                  <option>Noted</option>
                </select></label
              ><label
                >Rationale and conditions *<textarea
                  #rationale
                  rows="3"
                  placeholder="Explain the decision, funding pathway and any conditions."
                ></textarea></label
              ><button
                class="btn primary"
                (click)="
                  record(i, outcome.value, rationale.value);
                  rationale.value = ''
                "
              >
                Record decision
              </button>
              <div class="section-divider"></div>
              <h3>Decision history</h3>
              @for (d of i.decisions; track $index) {
                <article class="history-item">
                  <span class="dot green-dot"></span>
                  <div>
                    <strong>{{ d.outcome }}</strong>
                    <p>{{ d.rationale }}</p>
                    <small>{{ d.date }} · Demo forum</small>
                  </div>
                </article>
              } @empty {
                <p class="muted">No decisions recorded yet.</p>
              }
            }
            @if (tab() === "Activity") {
              <h3>Discussion &amp; evidence</h3>
              <label
                >Add a comment<textarea
                  #comment
                  rows="3"
                  placeholder="Share an update or ask a question…"
                ></textarea></label
              ><button
                class="btn primary"
                (click)="addComment(i, comment.value); comment.value = ''"
              >
                Post comment
              </button>
              <div class="section-divider"></div>
              @for (c of i.comments; track $index) {
                <article class="history-item">
                  <span class="avatar small">DW</span>
                  <div>
                    <strong>Demo workspace</strong>
                    <p>{{ c.text }}</p>
                    <small>{{ c.date }}</small>
                  </div>
                </article>
              } @empty {
                <p class="muted">No comments yet.</p>
              }
              <div class="section-divider"></div>
              <h3>Reference documents</h3>
              <p class="muted">
                Names only. No document contents are uploaded or stored.
              </p>
              @for (d of i.documents; track $index) {
                <div class="document-row">
                  <app-icon name="file" />{{ d
                  }}<span class="muted">Reference only</span>
                </div>
              }
              <label
                >Reference document name<input
                  #documentName
                  placeholder="e.g. Business case.pdf" /></label
              ><button
                class="btn"
                (click)="
                  addDocument(i, documentName.value); documentName.value = ''
                "
              >
                Add reference name
              </button>
            }
          </div>
          <div class="drawer-footer">
            <app-icon name="info" />All changes stay in this browser. No backend
            or integrations.
          </div>
        </section>
      </div>
    }
  `,
})
export class Ideas {
  readonly s = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroy = inject(DestroyRef);
  readonly search = signal("");
  readonly stage = signal("");
  readonly objective = signal("");
  readonly sort = signal("updated");
  readonly creating = signal(false);
  readonly selectedId = signal("");
  readonly tab = signal("Overview");
  readonly submitted = signal(false);
  readonly stages = STAGES;
  readonly categories = [
    "Customer",
    "Growth",
    "Operational",
    "Regulatory",
    "Enablement",
  ];
  readonly tabs = ["Overview", "Assessment", "Governance", "Activity"];
  readonly compact = compact;
  readonly money = money;
  readonly score = priorityScore;
  readonly readiness = readiness;
  readonly criteria: { key: keyof Scores; label: string; weight: number }[] = [
    { key: "alignment", label: "Strategic alignment", weight: 25 },
    { key: "customer", label: "Customer value", weight: 20 },
    { key: "value", label: "Financial value", weight: 20 },
    { key: "risk", label: "Risk and compliance", weight: 15 },
    { key: "feasibility", label: "Delivery feasibility", weight: 10 },
    { key: "urgency", label: "Time criticality", weight: 10 },
  ];
  readonly form = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(5)]],
    description: ["", [Validators.required, Validators.minLength(20)]],
    objective: ["growth", Validators.required],
    category: ["Growth"],
    owner: ["", Validators.required],
    sponsor: ["", Validators.required],
    branch: ["Digital"],
    funding: ["To be confirmed"],
    cost: [0, Validators.min(0)],
    benefit: [0, Validators.min(0)],
  });
  readonly selected = computed(() =>
    this.s.ideas().find((i) => i.id === this.selectedId()),
  );
  readonly filtered = computed(() =>
    this.s
      .ideas()
      .filter(
        (i) =>
          (!this.stage() || i.status === this.stage()) &&
          (!this.objective() || i.objective === this.objective()) &&
          [i.title, i.id, i.owner, i.branch]
            .join(" ")
            .toLowerCase()
            .includes(this.search().toLowerCase()),
      )
      .sort((a, b) =>
        this.sort() === "score"
          ? priorityScore(b.scores) - priorityScore(a.scores)
          : this.sort() === "benefit"
            ? b.benefit - a.benefit
            : b.updated.localeCompare(a.updated),
      ),
  );
  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((p) => {
        this.creating.set(p.has("new"));
        this.selectedId.set(p.get("id") ?? "");
        const t = p.get("tab");
        if (t && this.tabs.includes(t)) this.tab.set(t);
        this.objective.set(p.get("objective") ?? "");
      });
  }
  clear(): void {
    this.search.set("");
    this.stage.set("");
    this.objective.set("");
    this.sort.set("updated");
  }
  openNew(): void {
    this.form.reset({
      objective: "growth",
      category: "Growth",
      branch: "Digital",
      funding: "To be confirmed",
      cost: 0,
      benefit: 0,
    });
    this.submitted.set(false);
    void this.router.navigate([], { queryParams: { new: 1 } });
  }
  open(id: string): void {
    this.tab.set("Overview");
    void this.router.navigate([], { queryParams: { id } });
  }
  close(): void {
    void this.router.navigate([], { queryParams: {} });
  }
  create(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    if (
      !v.title.trim() ||
      !v.owner.trim() ||
      !v.sponsor.trim() ||
      !v.description.trim()
    )
      return;
    const id = this.s.create({
      ...v,
      title: v.title.trim(),
      description: v.description.trim(),
    });
    this.creating.set(false);
    this.open(id);
  }
  move(i: Idea, status: string): void {
    if (STAGES.includes(status as Stage))
      this.s.transition(i.id, status as Stage);
  }
  saveConcept(
    i: Idea,
    concept: string,
    socialised: boolean,
    assurance: boolean,
  ): void {
    this.s.update({ ...i, concept: concept.trim(), socialised, assurance });
    this.s.notify("Concept and assurance saved");
  }
  setScore(i: Idea, key: keyof Scores, value: number): void {
    this.s.update({
      ...i,
      scores: { ...i.scores, [key]: Math.max(1, Math.min(5, value)) },
    });
  }
  record(i: Idea, outcome: string, rationale: string): void {
    if (!rationale.trim()) {
      this.s.notify("Enter a decision rationale first.");
      return;
    }
    this.s.decision(i.id, outcome, rationale);
  }
  addComment(i: Idea, text: string): void {
    if (!text.trim()) return;
    this.s.update({
      ...i,
      comments: [
        { text: text.trim(), date: new Date().toISOString().slice(0, 10) },
        ...i.comments,
      ],
    });
    this.s.notify("Comment added");
  }
  addDocument(i: Idea, name: string): void {
    if (!name.trim()) return;
    this.s.update({ ...i, documents: [...i.documents, name.trim()] });
    this.s.notify("Document reference added. No file was uploaded.");
  }
}

import type { Idea, Objective } from "./models";
export const OBJECTIVES: Objective[] = [
  {
    "id": "growth",
    "title": "Grow sustainable revenue",
    "description": "Build scalable products and unlock new customer segments.",
    "owner": "Commercial team",
    "colour": "#497e68",
    "target": "15% revenue growth",
    "progress": 64
  },
  {
    "id": "customer",
    "title": "Make every experience count",
    "description": "Remove friction and improve the customer journey.",
    "owner": "Customer experience",
    "colour": "#7895d4",
    "target": "Customer NPS of 60",
    "progress": 72
  },
  {
    "id": "efficiency",
    "title": "Work smarter, deliver faster",
    "description": "Automate repetitive work and release team capacity.",
    "owner": "Operations team",
    "colour": "#c99b50",
    "target": "20% less manual effort",
    "progress": 58
  },
  {
    "id": "resilience",
    "title": "Build a resilient business",
    "description": "Strengthen security, compliance and operational continuity.",
    "owner": "Risk and technology",
    "colour": "#a18ac4",
    "target": "95% control coverage",
    "progress": 81
  }
];
export const SEED_IDEAS: Idea[] = [
  {
    "id": "ITI-1001",
    "title": "Customer self-service hub",
    "description": "Customer self-service hub addresses a clear business opportunity in digital. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "customer",
    "category": "Customer",
    "branch": "Digital",
    "owner": "Alex Morgan",
    "sponsor": "Jordan Lee",
    "status": "Demand forum",
    "cost": 180000,
    "benefit": 520000,
    "effort": 5,
    "confidence": 70,
    "scores": {
      "alignment": 5,
      "customer": 4,
      "value": 5,
      "risk": 3,
      "feasibility": 4,
      "urgency": 5
    },
    "funding": "Strategic investment",
    "concept": "Run a focused discovery, validate the customer self-service hub approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-07-10",
    "updated": "2026-10-01",
    "progress": 0,
    "realised": 0,
    "comments": [
      {
        "text": "Initial discovery completed. Confirm benefit baseline and delivery dependencies before the next review.",
        "date": "2026-10-08"
      }
    ],
    "decisions": [],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1002",
    "title": "Intelligent invoice processing",
    "description": "Intelligent invoice processing addresses a clear business opportunity in finance. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "efficiency",
    "category": "Operational",
    "branch": "Finance",
    "owner": "Taylor Reed",
    "sponsor": "Casey Blake",
    "status": "Delivery",
    "cost": 95000,
    "benefit": 280000,
    "effort": 3,
    "confidence": 85,
    "scores": {
      "alignment": 5,
      "customer": 3,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 4
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the intelligent invoice processing approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-08-11",
    "updated": "2026-10-02",
    "progress": 62,
    "realised": 0,
    "comments": [],
    "decisions": [
      {
        "outcome": "Endorsed for investment work",
        "rationale": "Strategic alignment and funding pathway confirmed. Delivery team to validate milestones.",
        "date": "2026-10-06"
      }
    ],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1003",
    "title": "Partner marketplace",
    "description": "Partner marketplace addresses a clear business opportunity in commercial. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "growth",
    "category": "Growth",
    "branch": "Commercial",
    "owner": "Sam Ellis",
    "sponsor": "Jordan Lee",
    "status": "Preparing proposal",
    "cost": 240000,
    "benefit": 850000,
    "effort": 8,
    "confidence": 85,
    "scores": {
      "alignment": 4,
      "customer": 3,
      "value": 5,
      "risk": 3,
      "feasibility": 3,
      "urgency": 5
    },
    "funding": "Strategic investment",
    "concept": "Run a focused discovery, validate the partner marketplace approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-09-12",
    "updated": "2026-10-03",
    "progress": 0,
    "realised": 0,
    "comments": [
      {
        "text": "Initial discovery completed. Confirm benefit baseline and delivery dependencies before the next review.",
        "date": "2026-10-08"
      }
    ],
    "decisions": [],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1004",
    "title": "Identity and access uplift",
    "description": "Identity and access uplift addresses a clear business opportunity in technology. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "resilience",
    "category": "Regulatory",
    "branch": "Technology",
    "owner": "Riley Chen",
    "sponsor": "Casey Blake",
    "status": "Approved",
    "cost": 130000,
    "benefit": 190000,
    "effort": 4,
    "confidence": 70,
    "scores": {
      "alignment": 5,
      "customer": 3,
      "value": 4,
      "risk": 5,
      "feasibility": 4,
      "urgency": 4
    },
    "funding": "Strategic investment",
    "concept": "Run a focused discovery, validate the identity and access uplift approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-07-13",
    "updated": "2026-10-04",
    "progress": 0,
    "realised": 0,
    "comments": [],
    "decisions": [
      {
        "outcome": "Endorsed for investment work",
        "rationale": "Strategic alignment and funding pathway confirmed. Delivery team to validate milestones.",
        "date": "2026-10-06"
      }
    ],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1005",
    "title": "Customer feedback loop",
    "description": "Customer feedback loop addresses a clear business opportunity in customer service. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "customer",
    "category": "Customer",
    "branch": "Customer service",
    "owner": "Alex Morgan",
    "sponsor": "Jordan Lee",
    "status": "Completed",
    "cost": 45000,
    "benefit": 125000,
    "effort": 2,
    "confidence": 85,
    "scores": {
      "alignment": 4,
      "customer": 4,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 5
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the customer feedback loop approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-08-14",
    "updated": "2026-10-05",
    "progress": 100,
    "realised": 102500,
    "comments": [
      {
        "text": "Initial discovery completed. Confirm benefit baseline and delivery dependencies before the next review.",
        "date": "2026-10-08"
      }
    ],
    "decisions": [
      {
        "outcome": "Endorsed for investment work",
        "rationale": "Strategic alignment and funding pathway confirmed. Delivery team to validate milestones.",
        "date": "2026-10-06"
      }
    ],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1006",
    "title": "Predictive capacity planning",
    "description": "Predictive capacity planning addresses a clear business opportunity in operations. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "efficiency",
    "category": "Operational",
    "branch": "Operations",
    "owner": "Jamie Park",
    "sponsor": "Casey Blake",
    "status": "Client engagement",
    "cost": 110000,
    "benefit": 310000,
    "effort": 5,
    "confidence": 85,
    "scores": {
      "alignment": 4,
      "customer": 3,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 4
    },
    "funding": "Strategic investment",
    "concept": "Run a focused discovery, validate the predictive capacity planning approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": false,
    "created": "2026-09-15",
    "updated": "2026-10-06",
    "progress": 0,
    "realised": 0,
    "comments": [],
    "decisions": [],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1007",
    "title": "Subscription growth engine",
    "description": "Subscription growth engine addresses a clear business opportunity in commercial. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "growth",
    "category": "Growth",
    "branch": "Commercial",
    "owner": "Sam Ellis",
    "sponsor": "Jordan Lee",
    "status": "Sponsor review",
    "cost": 155000,
    "benefit": 610000,
    "effort": 5,
    "confidence": 70,
    "scores": {
      "alignment": 5,
      "customer": 3,
      "value": 5,
      "risk": 3,
      "feasibility": 4,
      "urgency": 5
    },
    "funding": "Strategic investment",
    "concept": "Run a focused discovery, validate the subscription growth engine approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-07-16",
    "updated": "2026-10-07",
    "progress": 0,
    "realised": 0,
    "comments": [
      {
        "text": "Initial discovery completed. Confirm benefit baseline and delivery dependencies before the next review.",
        "date": "2026-10-08"
      }
    ],
    "decisions": [],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1008",
    "title": "Data retention controls",
    "description": "Data retention controls addresses a clear business opportunity in technology. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "resilience",
    "category": "Regulatory",
    "branch": "Technology",
    "owner": "Riley Chen",
    "sponsor": "Casey Blake",
    "status": "Demand forum",
    "cost": 80000,
    "benefit": 140000,
    "effort": 3,
    "confidence": 85,
    "scores": {
      "alignment": 5,
      "customer": 3,
      "value": 4,
      "risk": 5,
      "feasibility": 4,
      "urgency": 4
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the data retention controls approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-08-17",
    "updated": "2026-10-08",
    "progress": 0,
    "realised": 0,
    "comments": [],
    "decisions": [],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1009",
    "title": "Employee knowledge assistant",
    "description": "Employee knowledge assistant addresses a clear business opportunity in people. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "efficiency",
    "category": "Enablement",
    "branch": "People",
    "owner": "Taylor Reed",
    "sponsor": "Casey Blake",
    "status": "Initial review",
    "cost": 65000,
    "benefit": 210000,
    "effort": 4,
    "confidence": 85,
    "scores": {
      "alignment": 4,
      "customer": 3,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 5
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the employee knowledge assistant approach with impacted teams, then deliver in incremental releases.",
    "socialised": false,
    "assurance": false,
    "created": "2026-09-18",
    "updated": "2026-10-09",
    "progress": 0,
    "realised": 0,
    "comments": [
      {
        "text": "Initial discovery completed. Confirm benefit baseline and delivery dependencies before the next review.",
        "date": "2026-10-08"
      }
    ],
    "decisions": [],
    "documents": []
  },
  {
    "id": "ITI-1010",
    "title": "Mobile service companion",
    "description": "Mobile service companion addresses a clear business opportunity in digital. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "customer",
    "category": "Customer",
    "branch": "Digital",
    "owner": "Jamie Park",
    "sponsor": "Jordan Lee",
    "status": "New",
    "cost": 160000,
    "benefit": 420000,
    "effort": 7,
    "confidence": 70,
    "scores": {
      "alignment": 4,
      "customer": 4,
      "value": 5,
      "risk": 3,
      "feasibility": 3,
      "urgency": 4
    },
    "funding": "Strategic investment",
    "concept": "Run a focused discovery, validate the mobile service companion approach with impacted teams, then deliver in incremental releases.",
    "socialised": false,
    "assurance": false,
    "created": "2026-07-19",
    "updated": "2026-10-10",
    "progress": 0,
    "realised": 0,
    "comments": [],
    "decisions": [],
    "documents": []
  },
  {
    "id": "ITI-1011",
    "title": "Supplier risk dashboard",
    "description": "Supplier risk dashboard addresses a clear business opportunity in finance. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "resilience",
    "category": "Enablement",
    "branch": "Finance",
    "owner": "Riley Chen",
    "sponsor": "Casey Blake",
    "status": "On hold",
    "cost": 70000,
    "benefit": 160000,
    "effort": 4,
    "confidence": 85,
    "scores": {
      "alignment": 4,
      "customer": 3,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 5
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the supplier risk dashboard approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-08-20",
    "updated": "2026-10-11",
    "progress": 0,
    "realised": 0,
    "comments": [
      {
        "text": "Initial discovery completed. Confirm benefit baseline and delivery dependencies before the next review.",
        "date": "2026-10-08"
      }
    ],
    "decisions": [],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1012",
    "title": "New market discovery",
    "description": "New market discovery addresses a clear business opportunity in commercial. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "growth",
    "category": "Growth",
    "branch": "Commercial",
    "owner": "Sam Ellis",
    "sponsor": "Jordan Lee",
    "status": "New",
    "cost": 55000,
    "benefit": 330000,
    "effort": 3,
    "confidence": 85,
    "scores": {
      "alignment": 4,
      "customer": 3,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 4
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the new market discovery approach with impacted teams, then deliver in incremental releases.",
    "socialised": false,
    "assurance": false,
    "created": "2026-09-21",
    "updated": "2026-10-12",
    "progress": 0,
    "realised": 0,
    "comments": [],
    "decisions": [],
    "documents": []
  },
  {
    "id": "ITI-1013",
    "title": "Workflow automation toolkit",
    "description": "Workflow automation toolkit addresses a clear business opportunity in operations. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "efficiency",
    "category": "Operational",
    "branch": "Operations",
    "owner": "Taylor Reed",
    "sponsor": "Casey Blake",
    "status": "Delivery",
    "cost": 120000,
    "benefit": 390000,
    "effort": 4,
    "confidence": 70,
    "scores": {
      "alignment": 5,
      "customer": 3,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 5
    },
    "funding": "Strategic investment",
    "concept": "Run a focused discovery, validate the workflow automation toolkit approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-07-22",
    "updated": "2026-10-13",
    "progress": 38,
    "realised": 0,
    "comments": [
      {
        "text": "Initial discovery completed. Confirm benefit baseline and delivery dependencies before the next review.",
        "date": "2026-10-08"
      }
    ],
    "decisions": [
      {
        "outcome": "Endorsed for investment work",
        "rationale": "Strategic alignment and funding pathway confirmed. Delivery team to validate milestones.",
        "date": "2026-10-06"
      }
    ],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1014",
    "title": "Legacy reporting refresh",
    "description": "Legacy reporting refresh addresses a clear business opportunity in technology. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "efficiency",
    "category": "Operational",
    "branch": "Technology",
    "owner": "Alex Morgan",
    "sponsor": "Casey Blake",
    "status": "Cancelled",
    "cost": 40000,
    "benefit": 70000,
    "effort": 3,
    "confidence": 85,
    "scores": {
      "alignment": 4,
      "customer": 3,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 4
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the legacy reporting refresh approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-08-23",
    "updated": "2026-10-14",
    "progress": 0,
    "realised": 0,
    "comments": [],
    "decisions": [],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1015",
    "title": "Accessible service design",
    "description": "Accessible service design addresses a clear business opportunity in customer service. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "customer",
    "category": "Customer",
    "branch": "Customer service",
    "owner": "Jamie Park",
    "sponsor": "Jordan Lee",
    "status": "Demand forum",
    "cost": 85000,
    "benefit": 240000,
    "effort": 3,
    "confidence": 85,
    "scores": {
      "alignment": 5,
      "customer": 4,
      "value": 4,
      "risk": 3,
      "feasibility": 4,
      "urgency": 5
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the accessible service design approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-09-24",
    "updated": "2026-10-15",
    "progress": 0,
    "realised": 0,
    "comments": [
      {
        "text": "Initial discovery completed. Confirm benefit baseline and delivery dependencies before the next review.",
        "date": "2026-10-08"
      }
    ],
    "decisions": [],
    "documents": [
      "Concept brief.pdf"
    ]
  },
  {
    "id": "ITI-1016",
    "title": "Security response playbooks",
    "description": "Security response playbooks addresses a clear business opportunity in technology. The proposal improves service quality, reduces avoidable effort and creates measurable outcomes for customers and teams.",
    "objective": "resilience",
    "category": "Regulatory",
    "branch": "Technology",
    "owner": "Riley Chen",
    "sponsor": "Casey Blake",
    "status": "Completed",
    "cost": 60000,
    "benefit": 180000,
    "effort": 2,
    "confidence": 70,
    "scores": {
      "alignment": 5,
      "customer": 3,
      "value": 4,
      "risk": 5,
      "feasibility": 4,
      "urgency": 4
    },
    "funding": "Operating budget",
    "concept": "Run a focused discovery, validate the security response playbooks approach with impacted teams, then deliver in incremental releases.",
    "socialised": true,
    "assurance": true,
    "created": "2026-07-25",
    "updated": "2026-10-01",
    "progress": 100,
    "realised": 147600,
    "comments": [],
    "decisions": [
      {
        "outcome": "Endorsed for investment work",
        "rationale": "Strategic alignment and funding pathway confirmed. Delivery team to validate milestones.",
        "date": "2026-10-06"
      }
    ],
    "documents": [
      "Concept brief.pdf"
    ]
  }
];

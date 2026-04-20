<div align="center">

# MillPro Enterprise

### Real-Time Health Sensor Data Visualization Platform

[![CI/CD](https://github.com/Brianmatovu511/millpro-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/Brianmatovu511/millpro-v2/actions)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-E84B3A?style=flat-square)](https://hl7.org/fhir/R4/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-BF8C1A?style=flat-square)](LICENSE)

**INCO — Innovation and Complexity Management**  
Two-tier web application: FHIR-compliant backend + D3.js real-time data visualization frontend.

</div>

---

## One-Button Demo

The quickest way to verify the app is running. No login required.

```
http://localhost:5000/demo.html
```

Press **Record Sensor Reading** — it generates a simulated heart-rate value (60–100 bpm), writes it to the PostgreSQL database via the backend, and displays the last 10 readings instantly. This satisfies the "one button → backend → database" requirement.

---

## Run in GitHub Codespaces

1. Open this repo on GitHub
2. Click **Code → Codespaces → Create codespace on main**
3. Wait ~2 minutes for Docker Compose to start the app and database
4. Codespaces will automatically forward port `5000` and open a browser tab
5. Navigate to `/demo.html` — press the button and watch data write to the DB

No `.env` file, no manual setup. Everything is pre-configured in `docker-compose.yml`.

---

## Run Locally (One Command)

```bash
git clone https://github.com/Brianmatovu511/millpro-v2.git
cd millpro-v2
docker compose up --build
```

Open [http://localhost:5000/demo.html](http://localhost:5000/demo.html)

> Docker Desktop must be running. The compose file starts PostgreSQL and the app together.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js 20 + Express — REST + FHIR R4 API |
| Database | PostgreSQL 15 via Prisma ORM |
| Frontend | React 18 + Vite + D3.js |
| Auth | JWT + bcrypt + role-based access control |
| Logging | Winston — structured JSON with correlation IDs |
| Testing | Jest + Supertest — 96% coverage on core modules |
| CI/CD | GitHub Actions — lint → test → Docker build |
| Container | Docker multi-stage build + Docker Compose |
| Security | Helmet, rate limiting, express-validator, FHIR schema validation |

---

## FHIR API

The backend emits FHIR R4-compliant JSON for all sensor observations.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/fhir/metadata` | GET | CapabilityStatement |
| `/api/fhir/Observation` | GET | Search observations (`?patient=`, `?status=`) |
| `/api/fhir/Observation/:id` | GET | Single observation |
| `/api/fhir/Observation` | POST | Create from raw sensor reading |
| `/api/demo/reading` | POST | Public one-button demo write |
| `/api/demo/readings` | GET | Last 10 demo readings |

---

## Project Structure

```
millpro-v2/
├── .devcontainer/
│   └── devcontainer.json        # GitHub Codespaces config
├── .github/workflows/
│   └── ci.yml                   # CI/CD: lint → test → Docker build
├── .husky/
│   └── pre-commit               # Runs lint + tests before every commit
├── client/
│   ├── public/
│   │   └── demo.html            # One-button demo page (no login needed)
│   └── src/
│       ├── App.jsx              # Full management dashboard
│       ├── api.js               # Axios API client
│       └── hooks/useAuth.jsx    # Auth context
├── server/
│   ├── fhir/
│   │   ├── mapper.js            # Sensor readings → FHIR Observation
│   │   └── validator.js         # FHIR R4 schema validation
│   ├── middleware/
│   │   ├── auth.js              # JWT authenticate + role authorize
│   │   ├── correlationId.js     # UUID per request for tracing
│   │   ├── errorHandler.js      # Centralized error handling
│   │   └── validate.js          # express-validator result handler
│   ├── routes/
│   │   ├── demo.js              # Public demo endpoint (no auth)
│   │   ├── fhir.js              # FHIR R4 Observation API
│   │   └── ...                  # Business routes
│   └── utils/
│       └── logger.js            # Winston structured logging
├── tests/                       # Jest test suites (96% coverage)
├── prisma/schema.prisma         # Database schema incl. SensorReading
├── docker-compose.yml           # One-command local + Codespaces start
├── Dockerfile                   # Multi-stage production build
└── eslint.config.js             # ESLint v9 flat config
```

---

## Development Checklist (INCO Evaluation)

| Criterion | Implementation | Level |
|-----------|---------------|-------|
| Dev Environment | Git + husky pre-commit hooks, GitHub Actions CI/CD, Docker | Excellent |
| Testing | Jest, 20 tests, 96% coverage, automated in CI | Excellent |
| Configuration | Per-environment `.env` templates, no hardcoded secrets | Advanced |
| Logging | Winston, structured JSON, correlation IDs, severity levels | Advanced |
| Deployment | Docker multi-stage build, Compose, Codespaces-ready | Excellent |
| Input Validation | express-validator on all endpoints, FHIR schema validation | Advanced |
| Error Handling | Centralized handler, Prisma/JWT categorization, AppError class | Advanced |
| Auth & Encryption | JWT, bcrypt, role-based access, helmet security headers | Advanced |
| Fault Tolerance | Error boundaries, operational vs system error separation | Basic |
| FHIR Compliance | R4 Observation, CapabilityStatement, LOINC codes, bundle output | Advanced |

---

## How Our Team Collaborates with AI Agents

### Team Composition

| Member | Role | Responsibilities |
|--------|------|-----------------|
| **Brian** | Backend Engineer | API design, database schema, server infrastructure, DevOps, CI/CD, Docker, FHIR integration |
| **Rebecca** | Frontend Engineer | React components, D3.js visualizations, UI/UX, demo page, Vite build pipeline |
| **Aamna** | Business Analyst | Requirements analysis, use-case definition, FHIR data standards research, stakeholder documentation |
| **Pious** | Product Manager | Project roadmap, feature prioritization, team coordination, presentation preparation, testing sign-off |

### Human vs AI Responsibilities

**What humans own:**
- **Brian & Rebecca** define the technical architecture and make all final decisions on code that gets merged. Brian reviews every backend pull request; Rebecca owns all frontend merges.
- **Aamna** translates course requirements (professor instructions, FHIR standards, INCO rubric) into concrete acceptance criteria. She ensures the team builds the right thing, not just something that runs.
- **Pious** tracks progress against the professor's evaluation criteria, coordinates across the IT and business sides, and prepares the project presentation. He is the human checkpoint before any feature is called "done."

**What AI agents do:**
- Generate boilerplate code (route scaffolding, test stubs, Docker configs) so Brian and Rebecca spend time on logic, not repetition.
- Perform the first pass on code review — flagging security issues (e.g., SQL injection patterns, hardcoded secrets), unused variables, and ESLint violations before a human reviews.
- Write and run test suites autonomously, then report coverage gaps to the engineer.
- Produce structured documentation drafts (README sections, API docs) that Aamna edits for accuracy and Pious approves for presentation quality.

### Running AI Agents Asynchronously

The team uses Claude Code CLI triggered through GitHub Actions so AI work happens unattended:

1. **On every push**, the CI pipeline runs lint and tests automatically — no human needs to be at a keyboard.
2. **Pre-commit hooks** (husky) run AI-assisted lint checks locally before code ever reaches GitHub.
3. **Brian uses Claude Code** in the terminal to scaffold new backend routes: he describes the endpoint in plain English, the agent writes the route, middleware, and test file, then Brian reviews the diff before committing.
4. **Rebecca uses Claude Code** to generate D3.js visualization components from a data schema description, then refines the output for design consistency.
5. **Aamna runs document-generation prompts** against the professor's rubric to produce requirement traceability matrices — checking which evaluation criteria are covered and which are gaps.

### Keeping the Whole Team Moving in the Right Direction

- **The professor's rubric is the single source of truth.** Aamna maintains a living checklist (tracked in the README under "Development Checklist") that maps each rubric point to a concrete file or test. No feature is "done" until that row turns green.
- **GitHub becomes the coordination layer.** Every change goes through a pull request. Brian, Rebecca, Aamna and Pious all receive PR notifications. The CI badge in this README is visible to everyone — if it's red, the whole team stops and fixes it before adding anything new.
- **AI agents are given scope, not autonomy.** The agents scaffold and suggest; humans approve and merge. This prevents drift: if an agent generates code that technically works but violates a FHIR schema or the professor's architecture requirements, the human reviewer catches it at PR time.
- **Weekly sync (15 min):** Pious runs a short standup where each person states what the CI pipeline shows, not what they think is done. This grounds the meeting in observable facts rather than assumptions.

---

## Available Scripts

```bash
# One-command start (Docker)
docker compose up --build

# Development (local Node + separate DB)
npm run setup        # install deps + generate Prisma client
npm run db:push      # push schema to DB
npm run db:seed      # load demo data (company code: JGM001)
npm run dev          # backend :5000 + frontend :5173 concurrently

# Quality
npm test             # run Jest test suite
npm run lint         # ESLint check
npm run lint:fix     # auto-fix lint issues

# Build
npm run build        # build React frontend for production
npm start            # start production server
```

---

## Demo Credentials (after seeding)

| Company Code | User | Password | Role |
|---|---|---|---|
| `JGM001` | Owner | `owner1234` | OWNER — full access |
| `JGM001` | Admin | `admin1234` | ADMIN — write + approval queue |
| `JGM001` | Supervisor | `super1234` | SUPERVISOR — read-only |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by Team Mavericks — INCO Course, TH Deggendorf

</div>

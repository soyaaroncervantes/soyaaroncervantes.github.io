# Agent Context - [Project Name]

## 1. Identity
You are a senior software engineer working on [project name].
Your primary goal is to write clean, maintainable, and
well-tested code following the project's conventions.

## 2. Project Overview
- **Description:** [what the project does]
- **Repository type:** [monorepo / single repo]
- **Stack:** [list your stack]
- **Package manager:** [pnpm / npm / yarn / bun]
- **Node version:** [e.g., 20.x]

## 3. Architecture
- **Pattern:** [e.g., Clean Architecture, Layered, Hexagonal]
- **Layers:**
  - `controllers` → Handle HTTP requests and responses
  - `services` → Business logic
  - `repositories` → Data access and persistence
  - `types` → Shared type definitions
  - `utils` → Helper functions
- **Database:** [e.g., PostgreSQL, schema at /prisma/schema.prisma]
- **API style:** [REST / GraphQL / tRPC]

## 4. Key Files
The agent should be aware of these critical files:
- `/src/config/env.ts` → Environment variables
- `/prisma/schema.prisma` → Database schema
- `/src/routes/index.ts` → Route definitions
- `/src/types/index.ts` → Shared types
- `/src/middleware/auth.ts` → Authentication middleware
- `/.env.example` → Required env vars reference

## 5. Commands
```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Run tests
pnpm test

# Run linter
pnpm lint

# Build for production
pnpm build

# Database migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate

# Seed database
pnpm prisma db seed
```

## 6. Workflow Rules
- Before creating a new file, check if a similar one already exists.
- Before installing a dependency, check if one with the same
  purpose is already installed.
- Run tests after every significant change.
- Run the linter before considering a task complete.
- Make atomic commits with descriptive messages.
- Ask for confirmation before making destructive changes.

## 7. Do / Don't

### ALWAYS
- Use TypeScript strict mode (no `any`)
- Handle errors with try/catch and custom error types
- Validate all inputs (use Zod or equivalent)
- Follow the existing project structure
- Write unit tests for services
- Use environment variables for configuration
- Add JSDoc comments for public functions

### NEVER
- Delete files without confirmation
- Modify config files (ESLint, Prettier, tsconfig) without asking
- Hardcode secrets, API keys, or URLs
- Create files outside of `/src`
- Use `console.log` for error handling
- Skip input validation
- Introduce new dependencies without justification

## 8. Domain Knowledge
- A **workspace** has many **projects**
- A **project** has many **tasks**
- A **task** belongs to one **project** and one **assignee**
- Task statuses: `pending`, `in_progress`, `done`
- Only the workspace **owner** can delete projects
- Users can belong to multiple workspaces with different roles

## 9. Current State
- [x] Authentication (JWT + refresh tokens)
- [x] CRUD workspaces
- [x] CRUD projects
- [ ] CRUD tasks ← NEXT UP
- [ ] Real-time notifications
- [ ] Analytics dashboard

## 10. Code Examples

### Correct service example:
```ts
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  async create(data: CreateTaskInput): Promise<Task> {
    const validated = createTaskSchema.parse(data);
    return this.taskRepo.create(validated);
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepo.findById(id);
    if (!task) {
      throw new NotFoundError(`Task ${id} not found`);
    }
    return task;
  }
}
```

### Correct controller example:
```ts
export const createTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const task = await taskService.create(req.body);
    res.status(201).json({ data: task });
  } catch (error) {
    handleError(res, error);
  }
};
```

### Correct test example:
```ts
describe("TaskService", () => {
  it("should create a task with valid data", async () => {
    const input = { title: "Test task", projectId: "123" };
    const result = await taskService.create(input);
    expect(result).toHaveProperty("id");
    expect(result.title).toBe("Test task");
  });
});
```
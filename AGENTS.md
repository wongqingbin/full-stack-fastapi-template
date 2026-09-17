# 仓库指南

## 项目结构与模块组织

这是一个 FastAPI + React/Vite 全栈模板，后端与前端代码分离。后端位于 `backend/app/`：路由在 `api/routes/`，依赖项在 `api/deps.py`，模型在 `models.py`，CRUD 辅助逻辑在 `crud.py`，Alembic 迁移文件在 `alembic/versions/`。后端测试放在 `backend/tests/`。

React/TypeScript 应用位于 `frontend/src/`：基于文件的路由页面在 `routes/`，可复用 UI 在 `components/`，Hooks 和工具函数分别在 `hooks/`、`lib/`。Playwright 测试位于 `frontend/tests/`，文件使用 `*.spec.ts` 命名。不要手动编辑生成的 `frontend/src/client/`、`frontend/src/routeTree.gen.ts` 或 `backend/app/email-templates/`。邮件组件源文件位于 `packages/react-email/`。

## 构建、测试与开发命令

- `docker compose up -d db mailpit`：启动 PostgreSQL 和 Mailpit。
- `cd backend; uv sync; uv run bash scripts/prestart.sh; uv run fastapi dev`：安装依赖、初始化并运行 API。
- `bun install && bun run dev`：安装工作区依赖并启动 Vite。
- `cd backend; uv run bash scripts/test.sh`：运行带覆盖率统计的 Pytest；查看 `htmlcov/index.html`。
- `bun run test` / `bun run test:ui`：以无头模式或交互模式运行 Playwright 测试。
- `bun run lint`：执行 Biome 前端检查与格式化。
- `uv run prek run --all-files`：提交前运行全仓库 Git 钩子。

## 代码风格与命名规范

使用 Python 类型标注；所有后端改动必须通过严格的 `mypy`、`ty` 和 Ruff 检查。Python 模块、函数和变量使用 `snake_case`，类使用 `PascalCase`。TypeScript/React 组件使用 `PascalCase`，函数和 Hooks 使用 `camelCase`。Biome 强制使用空格、双引号和无分号风格；请让工具自动格式化文件。修改 API Schema 后，运行 `bash scripts/generate-client.sh` 重新生成 SDK。

## 测试指南

每次行为变更都应更新测试。后端使用 Pytest，测试文件遵循 `test_*.py`；前端用户流程使用 Playwright，测试文件遵循 `*.spec.ts`。提交前先运行受影响的测试，再运行相关完整测试套件。模型变更必须提交迁移文件，例如：`uv run alembic revision --autogenerate -m "Add user field"`。

## 提交与拉取请求

本地历史目前只有 `Initial commit`，因此未形成既定的提交信息规范。请使用简洁的祈使句标题，例如 `Add item export endpoint`。保持提交和 PR 聚焦于单一改动。PR 必须通过测试、说明改动内容、关联相关 issue，并在 UI 改动时附上截图。大型功能、重构和新增依赖应先讨论；外部贡献者不应直接修改 `pyproject.toml` 或 `uv.lock`。

## 配置

`.env` 仅用于本地默认配置，绝不可提交生产环境密钥。修改前端或邮件源文件后，应同步重新生成相应产物。

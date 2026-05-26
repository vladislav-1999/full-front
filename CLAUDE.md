# ЕДИНЫЙ КОД-СТАЙЛ КОМАНДЫ (Frontend)

Документ собирает общие, НЕ привязанные к конкретному проекту соглашения: стек, структуру, паттерны компонентов, работу с темой и AI-тулинг. Применяется ко всем фронтенд-проектам команды, которые ведутся в едином код-стайле.

## Бэкенд проекта

Учебный бэкенд лежит локально в `d:\student\node\` — простой Node.js HTTP-сервер (без фреймворков) на порту `3001`. Точка входа — `server.js`. Запуск: `node server.js`. CORS уже настроен на `http://localhost:3000`.

При проблемах с запросами фронта (404, неожиданный формат ответа) — смотреть напрямую в `d:\student\node\server.js`, там описаны все роуты.

## Обязательные правила код-стайла (чек-лист)

1. Если в проекте есть переменные цветов, переменные текстовых стилей и готовые styled-компоненты — использовать их в приоритете над raw/inline-стилями. (цвета — см. раздел 5; текст — см. правило 10)
2. Не использовать `className` в рецептах (recipes).
3. Не использовать селектор `float`.
4. Запрещено использовать API-типы внутри компонентов. Компоненты должны быть независимыми и ничего не знать об API.
5. Глобальные структуры данных хранить в `constants`. Локальные структуры данных (используемые в одном конкретном компоненте) — внутри этого компонента.
6. Кнопки и формы, делающие серверные запросы, должны быть обёрнуты в компонент, который показывает loading-состояние, пока данные не готовы.
7. Все размеры — только в `rem`. Использовать `px` или Chakra-токены `sm`/`md`/`xl` и т.п. запрещено. (см. раздел 4 — базовый размер 1rem = 10px)
8. Если используется готовый компонент Chakra UI — он должен принимать все нижележащие пропсы этого компонента и расширять типы из библиотеки Chakra (через `ChakraProps`, см. раздел 7).
9. Проверять согласованность с остальным проектом.
10. У всех узлов с текстом должен быть прописан `textStyle` — либо использоваться компонент со встроенным `textStyle`.

## 1. Стек

- Next.js (App Router, `output: 'standalone'`) + React 19
- TypeScript (strict, `moduleResolution: 'bundler'`, path-alias `@/*` указывает в корень)
- Chakra UI v3 + `@emotion/react` (peer) + `next-themes` — UI-кит со светлой/тёмной темой
- TanStack Query v5 + `@lukemorales/query-key-factory` — server state и фабрика ключей
- `axios` — HTTP-клиент
- `react-hook-form` + `zod` (v4) — формы и валидация (zod-резолвер через `@hookform/resolvers` подключается с первой формой)
- React Compiler включён (`reactCompiler: true` в `next.config`, `babel-plugin-react-compiler` в devDeps) — НЕ писать `useMemo`/`useCallback` руками без причины
- ESLint (flat config через `eslint-config-next`) + Prettier

Версии мажоров — последние стабильные на момент инициализации проекта; конкретный мажор может отличаться между проектами, но набор библиотек и подход — общий.

## 2. Prettier (`.prettierrc.json`) — единые настройки форматирования

- `useTabs: true`, `tabWidth: 4`
- `printWidth: 160`
- `semi: false` (без точек с запятой)
- `singleQuote: true`
- `bracketSpacing: true`
- `arrowParens: 'always'`
- `singleAttributePerLine: true`
- `quoteProps: 'preserve'`
- `htmlWhitespaceSensitivity: 'ignore'`
- `endOfLine: 'auto'`

## 3. Структура репозитория

- `app/` — Next.js App Router (`layout.tsx`, `page.tsx`, `provider.tsx`)
- `components/` — UI-компоненты по слоям:
  - `ui/` — Chakra v3 snippets (color-mode, provider, toaster и т.п.), скопированы из CLI `npx @chakra-ui/cli snippet add`; менять можно
  - `base/` — низкоуровневые кастомные обёртки поверх Chakra-примитивов (Button, Dialog, RadioGroup, Toaster, …)
  - `common/` — переиспользуемые «бытовые» компоненты приложения
  - `icons/`, `typography/` — иконки и типографика
- `theme/primary/` — Chakra-тема (см. раздел 5)
- `api/` — клиенты API (axios + query-options)
- `constants/`, `utils/`, `types/` — общие константы, утилиты, типы
- `public/` — статика

Path-alias `@/*` → корень. Импорты: `@/components/...`, `@/theme/primary`, `@/api/...`.

## 4. Паттерн компонента (`components/base/<Name>/`)

- Папка на компонент: `index.tsx` + рецепт стилей `<name>.recipe.ts`.
- `'use client'` для интерактивных/клиентских компонентов.
- Стили — через рецепты Chakra v3:
  - одиночный компонент: `defineRecipe` + `useRecipe({ recipe })` → `css={styles}`
  - составной (несколько слотов): `defineSlotRecipe` + `useSlotRecipe({ recipe })` → `css={styles.slot}` (рецепт подключается локально, не обязательно регистрировать в теме)
- Типизация своих обёрток — через утилитарный тип `ChakraProps<Recipe, Props, Ref>` (см. `types/chakra.ts`).
- Размеры — в `rem` (базовый размер шрифта `html` = 62.5%, т.е. `1rem = 10px`; 10px = 1rem, 14px = 1.4rem и т.д.).
- Иконки — компонент `<Icon asChild>{svg}</Icon>`, цвет через `fill="currentColor"` и проп `color` (семантический токен); анимация вращения — keyframe `rotation` (`animation="rotation 0.7s infinite linear"`).

## 5. Тема (`theme/primary/`)

Собирается через `createSystem(defaultBaseConfig, config)`; `config = defineConfig({...})`.

Структура:
- `tokens/` — палитра (`colors`), шрифты (`fonts`), тени (`shadows`), анимации
- `semanticTokens/` (или `semanticColors` внутри `tokens/colors.ts`) — токены с разрешением по color-mode (`_light`/`_dark`)
- `recipes/`, `slotRecipes/` — варианты для одиночных и составных компонентов
- `textStyles.ts` — текстовые стили (заголовки, body, subtitle, …)
- `keyframes.ts` — keyframes (`rotation`, `fade-in/out`, `slide-*`, `scale-*`)
- `breakpoints.ts`
- `globalCss.ts` — глобальные CSS-правила (например `body.fontFamily → 'body'`)
- `index.ts` — собирает всё в `defineConfig` → `createSystem`

**Цвета — только через semantic tokens (обязательное правило):**
- Цвета всех элементов берутся строго из semantic tokens (экспорт `semanticColors` в `theme/primary/tokens/colors.ts`), по семантическим именам: `bg="background.quaternary"`, `color="text.quaternary"`, `color="alert.error.bg"` и т.п.
- Запрещено: хардкодить hex/rgb()/именованные CSS-цвета в компонентах и рецептах.
- Запрещено: ссылаться напрямую на «сырые» токены палитры (`spaceCadet.light`, `status.error.dark`, …) — это базовые значения, на которые мапятся semantic tokens.
- Новый цвет: сперва добавить semantic token в `semanticColors` (с `_light`/`_dark`), затем использовать его по имени. Один источник правды + корректный color-mode.

## 6. Цепочка провайдеров

Сверху вниз (`app/layout.tsx` → `app/provider.tsx` → `components/ui/provider.tsx`):

```
<RootLayout>                         ← Server Component, force-dynamic
  <Suspense>                         ← root Suspense (защита useSearchParams + streaming SSR)
    <CommonProviders>                ← 'use client'
      <QueryClientProvider>          ← TanStack Query, SSR-safe синглтон
        <ReactQueryDevtools/>
        <Provider>                   ← Chakra snippet (components/ui/provider.tsx)
          <ChakraProvider value={theme}>
            <ColorModeProvider/>     ← next-themes, light/dark через class на <html>
            <Toaster/>
            {children}
```

## 7. Утилитарные типы (`types/`)

- `types/next.ts` — `LayoutProps<Params>` и `PageProps<Params, SearchParams>`. Использовать как тип ВСЕХ пропсов (не `children`). В Next 15+ `params`/`searchParams` — Promise:
  ```ts
  export default async function Page({ params }: PageProps<'orderId'>) {
    const { orderId } = await params
  }
  ```
- `types/chakra.ts` — `ChakraProps<Recipe, Props, Ref>` для типизации компонентов поверх recipes.

## 8. Особенности конфигурации (`next.config.ts`)

- `output: 'standalone'` — минимальный Docker-образ (`node server.js`)
- `force-dynamic` + `revalidate=0` на root-layout — отключают статический рендер (обязательно для авторизованных разделов / личного кабинета)
- `<Suspense>` на root — защита от "useSearchParams should be wrapped in a suspense boundary" + streaming SSR
- `experimental.optimizePackageImports: ['@chakra-ui/react']` — ускоряет HMR, уменьшает бандл
- `typedRoutes: false` по умолчанию

## 9. CI/CD (общий каркас)

- `Dockerfile` — multi-stage (deps → builder → runner) под `output: 'standalone'`; базовый образ node-alpine; `CMD ["node", "server.js"]`
- `.dockerignore`, `.gitlab-ci.yml` — на месте; пайплайн: linter (dockerfile/helm) → build:docker → deploy:k8s:helm; ветки `dev`/`master` (или `master`/`main`) с разными `values` и `ENV_FILE`
- `.env`-файлы: `.env`, `.env.development`, `.env.production`, `.env.build.development`, `.env.build.production` — публичные ключи `NEXT_PUBLIC_*` (значения проставляются под проект)
- `.helm/` — `Chart.yaml`, `values.dev.yaml`, `values.prod.yaml`, `templates/*`

Конкретные значения (URL бэкенда, хостнеймы, namespace, имя образа, basePath) — проектные, сюда не входят.

## 10. AI-тулинг (общий для всех проектов)

Skills (Chakra UI) — markdown-инструкции для AI-агентов, активируются по триггерам:
- `chakra-ui-builder` — строит компоненты по правилам Chakra v3
- `chakra-ui-migrate` — миграция v2 → v3
- `chakra-ui-refactor` — code review против правил v3
- `chakra-ui-charts` — работа с `@chakra-ui/charts`
- `chakra-ui-components` — decision tree «какой компонент выбрать»
- `chakra-ui-theming` — токены, semantic tokens, recipes, slot recipes, typegen

Где лежат (реальные папки, не симлинки — переносятся через git):
- `.agents/skills/` — для Cursor и универсальных агентов
- `.claude/skills/` — для Claude Code
- `skills-lock.json` — версии CLI-управляемых скиллов (builder/migrate/refactor)

Обновление: `npm run skills:update` (на Windows — через Git Bash). После клона делать ничего не нужно — скиллы работают из коробки.

MCP-сервер Chakra UI (`@chakra-ui/react-mcp`) — динамический доступ к API Chakra (`list_components`, `get_component_props`, `get_component_example`, `get_theme`, `theme_customization`, `v2_to_v3_code_review`). Данные читаются из установленной версии `@chakra-ui/react` в `node_modules`. Конфиги в репе: `.mcp.json` (Claude Code), `.cursor/mcp.json` (Cursor). Сам сервер на npm, запускается через `npx -y @chakra-ui/react-mcp`, самообновляется. После клона — один раз перезапустить AI-инструмент.

Skills vs MCP: skills грузятся один раз в контекст (общие паттерны), MCP вызывается в момент работы (точные данные по API). Не конкурируют — держать оба.

CLAUDE.md в обоих инструментах: Claude Code читает `CLAUDE.md` автоматически; для Cursor — `.cursor/rules/project-context.mdc` с `alwaysApply:true` и `@CLAUDE.md` reference. Один источник правды, два механизма доступа.

## 11. Gotchas

- **Toaster-синглтон под Next 16 + Turbopack**: `export const toaster = createToaster(...)` на уровне модуля может инстанцироваться дважды (чанк страницы vs чанк дерева провайдеров) → `toaster.create()` пишет «не туда». Решение — кеш синглтона на `window` (на сервере создавать свежий, чтобы не ловить hydration mismatch):
  ```ts
  const createT = () => createToaster({ ... })
  const g = globalThis as unknown as { __toaster?: ReturnType<typeof createT> }
  export const toaster = typeof window === 'undefined' ? createT() : (g.__toaster ??= createT())
  ```
  Под Next 15 + webpack модуль дедуплицируется — голый export работает.

## 12. Язык

Общение и комментарии — на русском; технические термины и имена сущностей — на английском, если так принято в коде.

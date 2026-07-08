# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2026-07-08

Initial release. A Django-style ORM for Node.js, published as `qorm`.

### Added

- **Models & fields** — `defineModel` (typed) or class + `Model.register()`; auto `id`
  primary key; Auto/BigAuto, Char, Text, Email, UUID, Integer, BigInteger, Float,
  Decimal, Boolean, Date, DateTime (`autoNow`/`autoNowAdd`), JSON, ForeignKey,
  OneToOne, and ManyToMany (auto through-table, self-referential); validation via
  `fullClean()`.
- **QuerySet** — immutable, lazy, thenable, async-iterable; the full Django-style
  surface (`filter`, `exclude`, `orderBy`, `annotate`, `aggregate`, `values`,
  `selectRelated`, `prefetchRelated`, `union`/`intersection`/`difference`, `create`,
  `getOrCreate`, `updateOrCreate`, `bulkCreate`, `bulkUpdate`, and more).
- **Lookups** — the full field-lookup set, spanning relations in both directions.
- **Expressions** — `Q`, `F`, aggregates (`Count`/`Sum`/`Avg`/`Min`/`Max`), database
  functions (`Lower`/`Upper`/`Coalesce`/`Concat`/`Cast`/…), and window functions
  (`Window` + `RowNumber`/`Rank`/`DenseRank`).
- **Relations** — forward descriptors, reverse managers, and M2M managers in both
  directions, with prefetch support.
- **Runtime** — transactions with savepoint nesting (over `AsyncLocalStorage`),
  signals (`preSave`/`postSave`/`preDelete`/`postDelete`/`m2mChanged`), and multi-DB
  routing via `using`.
- **Migrations** — autodetector (including interactive renames), reversible
  operations, squashing, `--fake`, targets, SQL preview, and a recorder table.
- **Backends** — SQLite (built-in `node:sqlite`, zero-dependency), PostgreSQL (`pg`),
  and MySQL 8 (`mysql2`); the server drivers are optional peer dependencies.
- **CLI** — the `dorm` command (`makemigrations`, `migrate`, `showmigrations`,
  `squashmigrations`, `sqlmigrate`, `check`, `flush`, `shell`, `dbshell`, `inspectdb`).

[Unreleased]: https://github.com/rohansingh9001/dormjs/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/rohansingh9001/dormjs/releases/tag/v0.0.1

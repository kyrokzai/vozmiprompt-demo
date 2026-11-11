# VOZMI PROMPT 2.0

Статический сайт AI-креативной студии. HTML, CSS, JavaScript; без сборщика и внешних клиентских зависимостей.

Запуск: `python3 -m http.server 8000 --bind 127.0.0.1` из корня проекта.
Проверки: `node tests/smoke.cjs` (Playwright и Chromium из среды). BASE_URL позволяет проверить подкаталог.

- `index.html`: новая версия.
- `assets/css/site.css`, `assets/js/site.js`: интерфейс и поведение.
- `assets/js/projects.json`: реальные проекты.
- `assets/images`, `assets/videos`: оригиналы и оптимизированные копии.
- `assets/js/comparison.js`: неподключённый компонент до/после.
- `docs/media-manifest.json`: SHA-256 оригиналов.
- `docs/RELEASE.md`: публикация, ограничения и откат.
- `PREPARATION.md`: исходный аудит.

Публикация — только после явного разрешения владельца. Для зависимых от домена SEO-полей сначала подтвердить реальный URL и выполнить scripts/site-metadata.py; не подставлять предположительный домен.

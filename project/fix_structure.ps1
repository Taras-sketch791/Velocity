# fix_structure.ps1
Write-Host "Исправление структуры проекта..." -ForegroundColor Green

# 1. Находим папку project
$projectPath = Get-ChildItem -Path "D:\PythonProject1" -Filter "project" -Recurse -Directory | Select-Object -First 1 -ExpandProperty FullName

if (-not $projectPath) {
    Write-Host "Папка 'project' не найдена!" -ForegroundColor Red
    exit 1
}

Write-Host "Найдена папка project: $projectPath" -ForegroundColor Yellow

# 2. Находим manage.py
$managePyPath = Get-ChildItem -Path "D:\PythonProject1" -Filter "manage.py" -Recurse -File | Select-Object -First 1 -ExpandProperty FullName

if (-not $managePyPath) {
    Write-Host "manage.py не найден!" -ForegroundColor Red
    exit 1
}

Write-Host "Найден manage.py: $managePyPath" -ForegroundColor Yellow

# 3. Определяем корневую папку (где должен быть manage.py)
$manageDir = Split-Path $managePyPath -Parent
$projectDir = Split-Path $projectPath -Parent

Write-Host "`nТекущая структура:" -ForegroundColor Cyan
Write-Host "  Корень с manage.py: $manageDir"
Write-Host "  Папка project: $projectPath"

# 4. Проверяем, находятся ли они на одном уровне
if ($manageDir -eq $projectDir) {
    Write-Host "`n✓ Структура правильная!" -ForegroundColor Green
} else {
    Write-Host "`n✗ Структура неправильная!" -ForegroundColor Red
    Write-Host "  manage.py и project должны быть в одной папке" -ForegroundColor Yellow

    # Предлагаем исправить
    $choice = Read-Host "Переместить manage.py в ту же папку, где project? (y/n)"
    if ($choice -eq 'y') {
        # Перемещаем manage.py
        $newManagePath = Join-Path $projectDir "manage.py"
        Move-Item $managePyPath $newManagePath -Force
        Write-Host "✓ manage.py перемещен в: $newManagePath" -ForegroundColor Green
    }
}

# 5. Показываем команды для запуска
Write-Host "`nДля запуска Django:" -ForegroundColor Cyan
Write-Host "cd '$projectDir'"
Write-Host "python manage.py runserver"
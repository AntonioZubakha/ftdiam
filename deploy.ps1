# Переменные
$ARCHIVE_NAME = "dist_build.tar.gz"
$REMOTE_USER = "rii2jbigdjuy"
$REMOTE_HOST = "50.62.223.73"
$REMOTE_PATH = "public_html"
$SSH_PASS = "wTGpE0D#V8RX"
$SSH_PATH = "$REMOTE_USER@$REMOTE_HOST"

# Функция для запуска SSH команд с паролем
function Invoke-SshCommand {
    param (
        [string]$Command
    )
    
    $plink = "plink.exe"
    if (-not (Get-Command $plink -ErrorAction SilentlyContinue)) {
        $plink = "C:\Program Files\PuTTY\plink.exe"
    }
    
    Write-Host "  $REMOTE_HOST (port 22)"
    & $plink -batch -pw $SSH_PASS -P 22 $SSH_PATH $Command
}

# Функция для копирования файлов с паролем
function Copy-SshFile {
    param (
        [string]$Source,
        [string]$Destination
    )
    
    $pscp = "pscp.exe"
    if (-not (Get-Command $pscp -ErrorAction SilentlyContinue)) {
        $pscp = "C:\Program Files\PuTTY\pscp.exe"
    }
    
    & $pscp -batch -pw $SSH_PASS -P 22 $Source "$SSH_PATH`:$Destination"
}

# Проверка наличия PuTTY Tools
if (!(Get-Command plink -ErrorAction SilentlyContinue) -or !(Get-Command pscp -ErrorAction SilentlyContinue)) {
    Write-Host "PuTTY tools not found (plink, pscp)." -ForegroundColor Red
    Write-Host "Install PuTTY from https://www.putty.org/ or use: winget install PuTTY.PuTTY" -ForegroundColor Yellow
    exit 1
}

# 1. Сборка проекта
Write-Host "Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build error!" -ForegroundColor Red
    exit 1
}

# Проверка существования директории dist
if (!(Test-Path -Path "dist")) {
    Write-Host "Dist directory not found after build!" -ForegroundColor Red
    exit 1
}

# 2. Упаковка билда (используем 7-Zip если tar не доступен)
Write-Host "Packing dist to archive..." -ForegroundColor Cyan
if (Get-Command tar -ErrorAction SilentlyContinue) {
    tar -czf $ARCHIVE_NAME -C dist .
}
elseif (Get-Command 7z -ErrorAction SilentlyContinue) {
    7z a -ttar temp.tar ./dist/*
    7z a -tgzip $ARCHIVE_NAME temp.tar
    Remove-Item temp.tar
}
else {
    Write-Host "tar or 7-Zip not found!" -ForegroundColor Red
    Write-Host "Install 7-Zip: winget install 7zip.7zip" -ForegroundColor Yellow
    exit 1
}

# 3. Очистка на хостинге, но с сохранением аналитики
Write-Host "Backing up analytics and cleaning remote directory..." -ForegroundColor Cyan
Invoke-SshCommand "mkdir -p ~/backup && cp -f $REMOTE_PATH/data/analytics.json ~/backup/ 2>/dev/null || echo 'No analytics file to backup'"
Invoke-SshCommand "rm -rf $REMOTE_PATH/*"
Invoke-SshCommand "mkdir -p $REMOTE_PATH/data && mv ~/backup/analytics.json $REMOTE_PATH/data/ 2>/dev/null || echo 'No analytics to restore'"

# 4. Загрузка архива на сервер
Write-Host "Uploading archive to server..." -ForegroundColor Cyan
Copy-SshFile $ARCHIVE_NAME "."

# 5. Распаковка архива на сервере
Write-Host "Extracting archive on server..." -ForegroundColor Cyan
# Проверяем, существует ли файл, и где именно
Invoke-SshCommand "ls -la | grep $ARCHIVE_NAME"
# Пробуем распаковать (предполагая, что он в текущей директории)
Invoke-SshCommand "mkdir -p $REMOTE_PATH && tar -xzf $ARCHIVE_NAME -C $REMOTE_PATH && rm $ARCHIVE_NAME"

# 5.1 Копирование JSON-файла для аналитики
Write-Host "Copying analytics JSON file..." -ForegroundColor Cyan
# Создаем директории перед копированием файлов
Invoke-SshCommand "mkdir -p $REMOTE_PATH/api $REMOTE_PATH/data"
Invoke-SshCommand "chmod 755 $REMOTE_PATH/api $REMOTE_PATH/data"

# Копируем JSON файлы на сервер
Copy-SshFile "api/analytics.json" "$REMOTE_PATH/api/analytics.json"
Copy-SshFile ".htaccess" "$REMOTE_PATH/.htaccess"

# Устанавливаем права на JSON файл
Invoke-SshCommand "chmod 644 $REMOTE_PATH/api/analytics.json"

# 6. Установка прав доступа
Write-Host "Setting permissions..." -ForegroundColor Cyan
Invoke-SshCommand "chmod -R 755 $REMOTE_PATH"
Invoke-SshCommand "find $REMOTE_PATH -type f -exec chmod 644 {} \;"
Invoke-SshCommand "chmod 755 $REMOTE_PATH/api"
Invoke-SshCommand "chmod 755 $REMOTE_PATH/data"
Invoke-SshCommand "touch $REMOTE_PATH/data/analytics.json"
Invoke-SshCommand "chmod 666 $REMOTE_PATH/data/analytics.json"

# 7. Удаление локального архива
Remove-Item $ARCHIVE_NAME
Write-Host "Done!" -ForegroundColor Green 
#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$ROOT_DIR/apps/playground"
RUNTIME_DIR="$ROOT_DIR/.runtime"
PID_FILE="$RUNTIME_DIR/playground.pid"
LOG_FILE="$RUNTIME_DIR/playground.log"
PORT="${PROTOTYPE_PORT:-5173}"
URL="http://localhost:${PORT}/"

mkdir -p "$RUNTIME_DIR"

open_url() {
  if [[ "${PROTOTYPE_OPEN_BROWSER:-1}" == "1" ]] && command -v open >/dev/null 2>&1; then
    open "$URL"
  fi
}

if [[ -f "$PID_FILE" ]]; then
  PID="$(cat "$PID_FILE")"
  if kill -0 "$PID" 2>/dev/null; then
    echo "Prototype is already running: $URL"
    open_url
    exit 0
  fi
  rm -f "$PID_FILE"
fi

LISTENER_PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -n 1 || true)"
if [[ -n "$LISTENER_PID" ]]; then
  LISTENER_CWD="$(lsof -a -p "$LISTENER_PID" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -n 1)"
  if [[ "$LISTENER_CWD" == "$ROOT_DIR"* ]]; then
    echo "$LISTENER_PID" > "$PID_FILE"
    echo "Prototype is already running: $URL"
    open_url
    exit 0
  fi

  echo "Port $PORT is already used by another process (PID $LISTENER_PID)."
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required but was not found."
  exit 1
fi

if [[ ! -x "$APP_DIR/node_modules/.bin/vite" ]]; then
  echo "Installing project dependencies..."
  (cd "$ROOT_DIR" && pnpm install)
fi

echo "Starting prototype..."
(
  cd "$APP_DIR"
  nohup "$APP_DIR/node_modules/.bin/vite" \
    --host 0.0.0.0 \
    --port "$PORT" \
    --strictPort \
    > "$LOG_FILE" 2>&1 &
  echo "$!" > "$PID_FILE"
)

PID="$(cat "$PID_FILE")"
for _ in $(seq 1 40); do
  if curl -fsS "$URL" >/dev/null 2>&1; then
    echo "Prototype started: $URL"
    echo "Log: $LOG_FILE"
    open_url
    exit 0
  fi

  if ! kill -0 "$PID" 2>/dev/null; then
    break
  fi
  sleep 0.25
done

echo "Prototype failed to start. Check: $LOG_FILE"
rm -f "$PID_FILE"
exit 1

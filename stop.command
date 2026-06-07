#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
RUNTIME_DIR="$ROOT_DIR/.runtime"
PID_FILE="$RUNTIME_DIR/playground.pid"
PORT="${PROTOTYPE_PORT:-5173}"

belongs_to_project() {
  local pid="$1"
  local cwd
  cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -n 1)"
  [[ "$cwd" == "$ROOT_DIR"* ]]
}

stop_pid() {
  local pid="$1"

  if ! kill -0 "$pid" 2>/dev/null; then
    return
  fi

  if ! belongs_to_project "$pid"; then
    echo "Refusing to stop PID $pid because it does not belong to this project."
    exit 1
  fi

  kill "$pid"
  for _ in $(seq 1 20); do
    if ! kill -0 "$pid" 2>/dev/null; then
      return
    fi
    sleep 0.25
  done

  kill -9 "$pid"
}

if [[ -f "$PID_FILE" ]]; then
  PID="$(cat "$PID_FILE")"
  stop_pid "$PID"
  rm -f "$PID_FILE"
  echo "Prototype stopped."
  exit 0
fi

LISTENER_PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -n 1 || true)"
if [[ -n "$LISTENER_PID" ]] && belongs_to_project "$LISTENER_PID"; then
  stop_pid "$LISTENER_PID"
  echo "Prototype stopped."
  exit 0
fi

echo "Prototype is not running."

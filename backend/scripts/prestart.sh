#! /usr/bin/env bash

set -e
set -x


# #####################################################
# In mac、ubuntu

# Run migrations
alembic upgrade head

# Create initial data in DB
python app/initial_data.py


# #######################################################################################
# In Windows + WSL Bash, uv exposes virtual-environment entry points as *.exe.

if command -v python >/dev/null 2>&1; then
    PYTHON=python
elif command -v python.exe >/dev/null 2>&1; then
    PYTHON=python.exe
else
    echo "Python executable not found in the active environment." >&2
    exit 1
fi

# Run migrations
$PYTHON -m alembic upgrade head

# Create initial data in DB
$PYTHON app/initial_data.py

# Sourced by the scripts in this directory.

# Work from the repo root regardless of where the script is called from.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# compose.yaml runs the container as this user. Bash doesn't export $UID and has no $GID.
export HOST_UID="$(id -u)"
export HOST_GID="$(id -g)"

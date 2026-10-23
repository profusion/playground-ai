#!/bin/bash
# Sourced by the hooks in this directory.
# /bin/bash is already on macOS and Linux. These rules do not call
# commitlint, Node, Python, or any other program you would install.
# https://www.conventionalcommits.org/en/v1.0.0/

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
  printf '%s\n' "Source this file from .githooks/pre-commit, commit-msg, or pre-push." >&2
  exit 1
fi

# Conventional Commit header: type, optional scope, optional !, then a
# description. The description is the text after ": " and must be present.
# This is the header pattern used by Conventional Commits, checked here
# because bash 3.2 (the bash macOS ships) can run it with no added tools.
CONVENTIONAL_SUBJECT_RE='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([A-Za-z0-9][A-Za-z0-9./_-]*\))?(!)?: [^[:space:]].*$'

profusion_email_ok() {
  local email=$1
  local was_off=0
  local matched=1
  shopt -q nocasematch || was_off=1
  shopt -s nocasematch
  if [[ "$email" == ?*@profusion.mobi ]]; then
    matched=0
  fi
  if [[ "$was_off" -eq 1 ]]; then
    shopt -u nocasematch
  fi
  return "$matched"
}

identity_email() {
  # $1 is GIT_AUTHOR_EMAIL or GIT_COMMITTER_EMAIL. An exported value wins.
  # Otherwise use the repository's user.email.
  case "$1" in
    GIT_AUTHOR_EMAIL)
      if [[ -n "${GIT_AUTHOR_EMAIL:-}" ]]; then
        printf '%s' "$GIT_AUTHOR_EMAIL"
        return 0
      fi
      ;;
    GIT_COMMITTER_EMAIL)
      if [[ -n "${GIT_COMMITTER_EMAIL:-}" ]]; then
        printf '%s' "$GIT_COMMITTER_EMAIL"
        return 0
      fi
      ;;
  esac
  git config user.email 2>/dev/null || true
}

check_one_email() {
  local label=$1
  local email=$2
  local where=$3
  if profusion_email_ok "$email"; then
    return 0
  fi
  printf '%s\n' "$where: $label email must end with @profusion.mobi (got '${email:-<empty>}')." >&2
  return 1
}

check_identity_emails() {
  local where=$1
  local failed=0
  local author
  local committer
  author=$(identity_email GIT_AUTHOR_EMAIL)
  committer=$(identity_email GIT_COMMITTER_EMAIL)
  check_one_email author "$author" "$where" || failed=1
  check_one_email committer "$committer" "$where" || failed=1
  return "$failed"
}

reject_subject() {
  local where=$1
  local subject=$2
  printf '%s\n' "$where: commit subject must be a Conventional Commit with a description." >&2
  printf '%s\n' "  expected: type: description" >&2
  printf '%s\n' "  example: docs: add commit lint for Profusion email" >&2
  printf '%s\n' "  types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert" >&2
  printf '%s\n' "  a scope is optional: docs(quickstart): record the decision" >&2
  printf '%s\n' "  got: ${subject:-<empty>}" >&2
}

validate_subject() {
  local where=$1
  local subject=$2
  if [[ ! "$subject" =~ $CONVENTIONAL_SUBJECT_RE ]]; then
    reject_subject "$where" "$subject"
    return 1
  fi
  if [[ "${#subject}" -gt 100 ]]; then
    printf '%s\n' "$where: commit subject must be 100 characters or fewer (got ${#subject})." >&2
    return 1
  fi
  return 0
}

subject_from_file() {
  local file=$1
  local line
  while IFS= read -r line || [[ -n "$line" ]]; do
    line=${line%$'\r'}
    case "$line" in
      ''|'#'*) continue ;;
      *)
        printf '%s' "$line"
        return 0
        ;;
    esac
  done < "$file"
  return 1
}

check_commit_message_file() {
  local where=$1
  local file=$2
  local subject
  subject=$(subject_from_file "$file") || subject=
  validate_subject "$where" "$subject"
}

is_merge_commit() {
  local commit=$1
  git rev-parse --verify -q "$commit^2" >/dev/null 2>&1
}

check_commit_object() {
  local commit=$1
  local failed=0
  local author
  local committer
  local subject
  local short
  author=$(git log -1 --format='%ae' "$commit")
  committer=$(git log -1 --format='%ce' "$commit")
  subject=$(git log -1 --format='%s' "$commit")
  short=$(git rev-parse --short "$commit")

  check_one_email author "$author" "pre-push $short" || failed=1
  check_one_email committer "$committer" "pre-push $short" || failed=1
  if is_merge_commit "$commit"; then
    return "$failed"
  fi
  validate_subject "pre-push $short" "$subject" || failed=1
  return "$failed"
}

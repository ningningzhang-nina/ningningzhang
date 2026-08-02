import json
from pathlib import Path

DATA = Path('public/dashboard/data.json')
HISTORY = Path('public/dashboard/history.json')


def load(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    data = load(DATA)
    history = load(HISTORY)

    records = history.get('records', [])
    if not records:
        raise SystemExit('No history records found')

    latest = sorted(records, key=lambda x: x['date'])[-1]

    problems = []

    # progress consistency
    snapshot = latest.get('progressSnapshot', {})
    dashboard = {x['id']: x['value'] for x in data.get('progress', [])}
    for k, v in snapshot.items():
        if dashboard.get(k) != v:
            problems.append(f'progress mismatch: {k} history={v} dashboard={dashboard.get(k)}')

    # history -> dashboard summary consistency
    if latest['date'] == data.get('yesterdayDate'):
        if not data.get('yesterday'):
            problems.append('yesterday summary missing in dashboard')

    if problems:
        raise SystemExit('\n'.join(problems))

    print('Dashboard consistency check passed')


if __name__ == '__main__':
    main()

import json
from datetime import date, timedelta
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

    problems = []

    try:
        today = date.fromisoformat(data['todayDate'])
        yesterday = date.fromisoformat(data['yesterdayDate'])
    except (KeyError, TypeError, ValueError) as exc:
        raise SystemExit(f'invalid dashboard date: {exc}') from exc

    expected_yesterday = today - timedelta(days=1)
    if yesterday != expected_yesterday:
        problems.append(
            f'date mismatch: today={today} requires yesterday={expected_yesterday}, '
            f'got {yesterday}'
        )

    records_by_date = {}
    for record in records:
        record_date = record.get('date')
        if record_date in records_by_date:
            problems.append(f'duplicate history record: {record_date}')
        records_by_date[record_date] = record

    yesterday_record = records_by_date.get(data.get('yesterdayDate'))
    if yesterday_record is None:
        problems.append(f'missing history record: {data.get("yesterdayDate")}')
        yesterday_record = {}

    # progress consistency
    snapshot = yesterday_record.get('progressSnapshot', {})
    dashboard = {x['id']: x['value'] for x in data.get('progress', [])}
    for k, v in snapshot.items():
        if dashboard.get(k) != v:
            problems.append(f'progress mismatch: {k} history={v} dashboard={dashboard.get(k)}')

    # Yesterday's dashboard list must be sourced from the dated history record.
    expected_summary = yesterday_record.get('completed', [])
    if data.get('yesterday', []) != expected_summary:
        problems.append('yesterday summary does not match history')

    if problems:
        raise SystemExit('\n'.join(problems))

    print('Dashboard consistency check passed')


if __name__ == '__main__':
    main()

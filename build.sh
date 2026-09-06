#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Auto-create superuser
echo "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='jai').exists():
    User.objects.create_superuser('jai', 'jaichandranr28@gmail.com', 'jai1234')
    print('Superuser created!')
else:
    print('Superuser already exists.')
" | python manage.py shell
#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Force create or update superuser password
echo "
import os
from django.contrib.auth import get_user_model
User = get_user_model()
password = os.environ.get('ADMIN_PASSWORD', 'NewPassword@123')
if User.objects.filter(username='jai').exists():
    u = User.objects.get(username='jai')
    u.set_password(password)
    u.is_staff = True
    u.is_superuser = True
    u.save()
    print('Password updated!')
else:
    User.objects.create_superuser('jai', 'your@email.com', password)
    print('Superuser created!')
" | python manage.py shell
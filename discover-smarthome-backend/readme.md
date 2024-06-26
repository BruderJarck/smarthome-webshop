# Backend development setup
Set env var 

`DJANO_SETTINGS_MODULE=webshop.settings_dev`

Change in to working dir

`cd discover-smarthome-backen`

For initial setup migrate database

`python manage.py makemigrations `

`python manage.py migrate`

Start Backend

`python manage.py runserver 5000`


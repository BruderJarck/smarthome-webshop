# Generated by Django 3.2.9 on 2024-06-19 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webshop_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_picture',
            field=models.CharField(blank=True, default='https://res.cloudinary.com/discover-smarthome/image/upload/v1718802134/default_avatar_qxwysy.jpgS', help_text='This needs to the cloudinary url which represents the desired image', max_length=10000000, null=True),
        ),
    ]

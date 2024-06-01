# Generated by Django 3.2.9 on 2024-05-23 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webshop_app', '0009_alter_orderingmodel_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderingmodel',
            name='status',
            field=models.CharField(choices=[('OrderReceived', 'OrderReceived'), ('Processing', 'Processing'), ('Delivery', 'Delivery'), ('Issue', 'Issue')], default='OrderReceived', max_length=200),
        ),
    ]
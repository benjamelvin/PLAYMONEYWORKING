# Generated by Django 4.1.3 on 2022-12-08 22:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pmapp', '0003_rename_currentprice_portfolio_currentprice'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='portfolio',
            name='marketvalue',
        ),
    ]

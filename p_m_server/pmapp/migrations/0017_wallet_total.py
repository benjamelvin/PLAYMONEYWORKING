# Generated by Django 4.1.3 on 2022-12-14 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pmapp', '0016_alter_portfolio_totalcost'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='total',
            field=models.FloatField(null=True),
        ),
    ]

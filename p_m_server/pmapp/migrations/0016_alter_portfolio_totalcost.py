# Generated by Django 4.1.3 on 2022-12-12 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pmapp', '0015_alter_portfolio_buyprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolio',
            name='totalcost',
            field=models.DecimalField(decimal_places=2, max_digits=254, null=True),
        ),
    ]

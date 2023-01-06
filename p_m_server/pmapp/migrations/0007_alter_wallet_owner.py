# Generated by Django 4.1.3 on 2022-12-10 01:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pmapp', '0006_wallet'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wallet',
            name='owner',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wallet', to=settings.AUTH_USER_MODEL),
        ),
    ]
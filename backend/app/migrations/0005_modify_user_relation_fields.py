# Generated by Django 4.1 on 2022-10-05 03:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_modify_choice_field_in_answer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userrelation',
            name='follower_user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='following_relation', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userrelation',
            name='following_user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='follower_relation', to=settings.AUTH_USER_MODEL),
        ),
    ]
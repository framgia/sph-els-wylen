# Generated by Django 4.1 on 2022-10-13 03:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_modify_user_activity_fields'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useractivity',
            name='following_user',
        ),
        migrations.AddField(
            model_name='useractivity',
            name='following_relation',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.userrelation'),
        ),
    ]

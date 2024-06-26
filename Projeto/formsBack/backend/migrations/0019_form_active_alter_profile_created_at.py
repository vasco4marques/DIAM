# Generated by Django 5.0.3 on 2024-05-12 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_rename_user_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='form',
            name='active',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='profile',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='data de criacao do user'),
        ),
    ]

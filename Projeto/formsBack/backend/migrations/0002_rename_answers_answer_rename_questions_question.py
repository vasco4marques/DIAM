# Generated by Django 5.0.1 on 2024-04-16 12:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='answers',
            new_name='answer',
        ),
        migrations.RenameModel(
            old_name='questions',
            new_name='question',
        ),
    ]

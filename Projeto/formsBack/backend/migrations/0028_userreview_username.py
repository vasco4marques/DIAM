# Generated by Django 5.0.3 on 2024-05-13 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0027_userreview'),
    ]

    operations = [
        migrations.AddField(
            model_name='userreview',
            name='username',
            field=models.CharField(default='vasco', max_length=30),
            preserve_default=False,
        ),
    ]

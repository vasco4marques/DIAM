# Generated by Django 5.0.3 on 2024-05-12 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_remove_user_email_alter_form_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='rafaelcoias', max_length=30),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('Admin', 'Admin'), ('Default', 'Default')], max_length=30),
        ),
    ]

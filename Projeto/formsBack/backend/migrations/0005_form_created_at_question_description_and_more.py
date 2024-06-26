# Generated by Django 5.0.1 on 2024-04-17 11:53

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_answer_question'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='form',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='data de criacao do form'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='description',
            field=models.CharField(max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='form',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.form'),
        ),
        migrations.CreateModel(
            name='answerOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=300)),
                ('question', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.question')),
            ],
        ),
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=30)),
                ('user_type', models.CharField(choices=[('1', 'Admin'), ('2', 'Default')], max_length=30)),
                ('created_at', models.DateTimeField(verbose_name='data de criacao do user')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='form',
            name='user',
            field=models.OneToOneField(default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='backend.user'),
        ),
        migrations.CreateModel(
            name='userAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answerText', models.CharField(max_length=300, null=True)),
                ('answerOption', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.answeroption')),
                ('form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.form')),
                ('question', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.user')),
            ],
        ),
        migrations.DeleteModel(
            name='answer',
        ),
    ]

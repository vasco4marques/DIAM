# Generated by Django 5.0.1 on 2024-03-04 13:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Questao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('questao_texto', models.CharField(max_length=400)),
                ('pub_data', models.DateTimeField(verbose_name='data de publicacao')),
            ],
        ),
        migrations.CreateModel(
            name='Opcao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('opcao_texto', models.CharField(max_length=400)),
                ('votos', models.IntegerField(default=0)),
                ('questao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='votacao.questao')),
            ],
        ),
    ]

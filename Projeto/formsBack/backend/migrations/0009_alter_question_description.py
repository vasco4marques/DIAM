# Generated by Django 5.0.1 on 2024-04-17 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_alter_useranswer_answertext'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='description',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]
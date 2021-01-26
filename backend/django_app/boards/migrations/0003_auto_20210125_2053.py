# Generated by Django 3.1.4 on 2021-01-25 18:53

from django.db import migrations
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0002_auto_20210125_2023'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='board',
            name='imageV',
        ),
        migrations.RemoveField(
            model_name='post',
            name='imageV',
        ),
        migrations.RemoveField(
            model_name='thread',
            name='imageV',
        ),
        migrations.AlterField(
            model_name='board',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(blank=True, default=None, null=True, upload_to='', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(blank=True, default=None, null=True, upload_to='', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='thread',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(blank=True, default=None, null=True, upload_to='', verbose_name='Image'),
        ),
    ]
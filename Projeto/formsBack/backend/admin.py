from django.contrib import admin
from .models import *

# Register your models here.


admin.site.register(answerOption)
admin.site.register(question)
admin.site.register(form)
admin.site.register(Profile)
admin.site.register(userAnswer)


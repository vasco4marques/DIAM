from rest_framework import serializers
from .models import *


class formSerializer(serializers.ModelSerializer):
    class Meta:
        model = form
        fields = ["id","title","description"]


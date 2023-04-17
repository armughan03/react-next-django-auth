
from datetime import datetime, timezone
from rest_framework import serializers
from .models import UserAccount
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = '__all__'
        
class UserAccountsSerializers(serializers.ModelSerializer):
    class Meta():
        model = UserAccount
        fields = '__all__'
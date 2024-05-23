import cloudinary
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import ProductModel, SensorModel, SensorValueModel
from .fields import Base64ImageField

User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'price', 'img', 'description']


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorModel
        fields = ['id', 'user_id', 'location', 'name', 'ip_address']


class SensorValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorValueModel
        fields = ['id', 'sensor_id', 'temp', 'pres', 'hum', 'dt']


class PublicUserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        new_pic = cloudinary.uploader.upload(validated_data['profile_picture'])
        
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            profile_picture=new_pic['url']
        )

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'profile_picture']


class PrivateUserSerializer(serializers.ModelSerializer):

    # profile_picture = serializers.ImageField(
    #     max_length=None,
    #     use_url=True
    # )


    def create(self, validated_data):
            new_pic = cloudinary.uploader.upload(validated_data['profile_picture'])
            
            return User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password'],
                profile_picture=new_pic['url']
            )


    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'profile_picture', 'password']


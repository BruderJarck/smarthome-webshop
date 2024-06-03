import re
from django.db import models
from django.contrib.auth.models import AbstractUser

from webshop import settings
from cloudinary.models import CloudinaryField


def upload_path(instance, filename):
    return "/".join(["products", instance.name, filename]) or "/"
    
def upload_path_profile_img(instance, filename):
    return "/".join(["profile_pic", instance.username, filename]) or "/"

class ProductCategoryModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)

    def __str__(self) -> str:
        return f"{self.name}"
    

class ProductModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    price = models.IntegerField()
    img = models.URLField(help_text="this needs to the cloudinary url which represents the desired image")
    description = models.CharField(max_length=3000000)
    category = models.ForeignKey(ProductCategoryModel, on_delete=models.CASCADE, null=True)
    short_descriptions = models.CharField(max_length=402, blank=True, default="This is a shortdescription of a webshop product")
    def __str__(self) -> str:
        return f"{self.name}"

class SensorModel(models.Model):
    id =  models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, null=True)
    location = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    ip_address = models.GenericIPAddressField()

    def __str__(self) -> str:
        return f"{self.name} belonging to {self.user_id}, located in {self.location}"

class SensorValueModel(models.Model):
    id = models.AutoField(primary_key=True)
    sensor = models.ForeignKey(SensorModel, on_delete=models.CASCADE, null=True)
    temp = models.FloatField()
    hum = models.FloatField()
    pres = models.FloatField()
    dt = models.DateTimeField()

    def __str__(self) -> str:
        return f"{self.id} belonging to {self.sensor}, at {self.dt}"
        
class UserProfile(AbstractUser):
    email = models.EmailField(
        help_text='Required. example: jon.doe@email.com')
    profile_picture = models.CharField(blank=True, null=True,
        max_length=10000000,
        help_text="This needs to the cloudinary url which represents the desired image")

    def __str__(self) -> str:
        return f"User {self.username}"

class OrderingModel(models.Model):
    class StateChoices(models.TextChoices):
        recveived_order = "OrderReceived", "OrderReceived"
        processing = "Processing", "Processing"
        delivery = "Delivery", "Delivery"
        issue = "Issue", "Issue"

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    status = models.CharField(max_length=200, choices=StateChoices.choices, default=StateChoices.recveived_order)

    def __str__(self) -> str:
        return f"{self.id} has status '{self.status}'"
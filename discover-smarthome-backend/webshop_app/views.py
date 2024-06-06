from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import viewsets, filters 
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import decorators
from django_filters.rest_framework import DjangoFilterBackend

import random
import datetime
import webshop.settings as settings

from webshop_app import serializers
from webshop_app import models
from webshop_app import filters as CustomFilters

User = get_user_model()


class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.ProductModel.objects.all()
    serializer_class = serializers.ProductSerializer    
    lookup_field = "name"
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = CustomFilters.ProductFilter
    ordering_fields = ['name', 'price', 'category']
    ordering = ['name']
    
class SensorViewset(viewsets.ModelViewSet):
    queryset = models.SensorModel.objects.all()
    serializer_class = serializers.SensorSerializer    
    search_fields = ['user_id__id']
    filter_backends = (filters.SearchFilter, )
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]

class SensorValueViewset(viewsets.ModelViewSet):
    queryset = models.SensorValueModel.objects.all()
    serializer_class = serializers.SensorValueSerializer    
    search_fields = ['sensor_id__id']
    filter_backends = (filters.SearchFilter, )
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]

class CustomUserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.PublicUserSerializer
    search_fields = ['username']
    filter_backends = (filters.SearchFilter, )
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]

class OrderingViewSet(viewsets.ModelViewSet):
    queryset = models.OrderingModel.objects.all()
    serializer_class = serializers.OrderingSerializer
    search_field = ['id', 'user', 'product']
    filter_backends = (filters.SearchFilter, )
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = models.ProductCategoryModel.objects.all()
    serializer_class = serializers.ProductCategorySerializer    
    lookup_field = "name"

@decorators.api_view(['POST'])
@decorators.permission_classes([AllowAny])
def register_new_user(request):
    serializer = serializers.PublicUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=201)
    return Response(serializer.errors, status=400)

@decorators.api_view(['GET'])
@decorators.permission_classes([AllowAny])
def verifiy_user(request):
    
    serializer = serializers.PrivateUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=201)
    return Response(serializer.errors, status=400)

@decorators.api_view(['POST'])
@decorators.permission_classes([AllowAny])
def submit_order(request):
    print(request.__dict__)
    request = request.data
    email = request['email']
    products = request['products']

    try:
        user = User.objects.filter(email=email)[0]
    except IndexError:
        # send_mail(
        #         subject=f'congrats for the purchase of { name } smarthome project',
        #         message=f'dear { user.username }, \nthank you for purchasing a discover-smarthome-product\nthe {name} will arrive sometime xD\n\nthe discover-smarthome-team',
        #         html_message= f'<h1>dear { user.username },</h1><h2>thank you for purchasing a discover-smarthome-product <br><img src={product.img}><br>\n\nthe discover-smarthome-team</h2>',
        #         from_mail=settings.EMAIL_HOST,
        #         recipient_list=[str(user.email)],
        #         auth_user=settings.EMAIL_HOST_USER,
        #         auth_password=settings.EMAIL_HOST_PASSWORD,
        #         fail_silently=False,
        #     )
        return Response(f"no user found in db related to { email }, sending product email anyways, consider registering on discover-smarthome-wesite", status=404)


    for i, product in enumerate(products):
        try:
            product_type = models.ProductModel.objects.filter(name=product['name'])[0]
        except IndexError:
            return Response(f"{ product } not found in db", status=500)

        for i in range(product.ammount):
            new_sensor = models.SensorModel(
                user=user, 
                product=product_type, 
                location=location, 
                name=name, 
                ip_address=ip_address
                )

            new_sensor.save()

            # generate random test data
            for x in range(30):
                val = models.SensorValueModel.objects.create(sensor=new_sensor,temp=random.randint(0,100),hum=random.randint(0,100),pres=random.randint(0,1000),dt=datetime.datetime.now())
                val.save()

    send_mail(
        subject=f'congrats for the purchase of { name } smarthome project',
        message=f'dear { user.username }, \nthank you for purchasing a discover-smarthome-product\nthe {name} will arrive somtime xD\n\nthe discover-smarthome-team',
        html_message= f'<h1>dear { user.username },</h1><h3>thank you for purchasing a discover-smarthome-product <br><br><img src={product.img}><br><br>\n\nthe discover-smarthome-team</h3>',
        from_email="huestajarck@gmail.com",
        recipient_list=[str(user.email)],
        fail_silently=False,
    )

    return Response(f"created new sensor for { email }", status=201)
        
        
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *


class RegisterUser(APIView):
  def post(self, request, format=None):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListUser(generics.ListAPIView):
  queryset = AppUser.objects.all()
  serializer_class = UserSerializer


class GetUpdateDeleteUser(generics.RetrieveUpdateDestroyAPIView):
  queryset = AppUser.objects.all()
  serializer_class = UserSerializer

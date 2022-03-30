from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework.authtoken.views import ObtainAuthToken
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),

]
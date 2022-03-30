from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework.authtoken.views import ObtainAuthToken
from .views import *

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', ObtainAuthToken.as_view()),

]
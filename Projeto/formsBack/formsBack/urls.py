from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from backend.views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'forms',FormViewSet, basename="forms")

urlpatterns = [ 
    path('admin/', admin.site.urls),
    path("", include(router.urls)),
    path("formDetails/<int:pk>", FormDetailView.as_view()),
    path("create-form/", FormViewSet.as_view({'post': 'create_form'}), name='create-form'),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
]

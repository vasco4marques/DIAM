from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from backend.views import *
from rest_framework import routers

# O que esta comentado sao os URLs usados no frontend. 
# Apenas falta implementa-los, lER FICHEIRO README.MD !

# from .views import (
#     LoginView, RegisterView, FormListView, FormDetailView, 
#     FormCreateView, FormUpdateView, AnswerCreateView
# )


router = routers.DefaultRouter()
router.register(r'forms',FormViewSet, basename="forms")

urlpatterns = [ 
    path('admin/', admin.site.urls),
    path("", include(router.urls)),
    path("formDetails/<int:pk>", FormDetailView.as_view()),
    path("create-form/", FormViewSet.as_view({'post': 'create_form'}), name='create-form'),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    # path('forms/<int:user_id>/', FormListView.as_view(), name='form-list'),
    # path('forms/new/', FormCreateView.as_view(), name='form-create'),
    # path('forms/edit/<int:pk>/', FormUpdateView.as_view(), name='form-update'),
    # path('answer/', AnswerCreateView.as_view(), name='answer-create'),
]

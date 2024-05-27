from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from backend.views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'forms',FormViewSet, basename="forms")
router.register(r'questions',QuestionViewSet, basename="questions")
router.register(r'options',AnswerOptionViewSet, basename="options")
router.register(r'userAnswers',UserAnswerViewSet, basename="userAnswers")
router.register(r'userReviews',userReviewViewSet, basename="userReviews")
router.register(r'users', userViewSet, basename="users")

urlpatterns = [ 
    path("", include(router.urls)),
    path('admin/', admin.site.urls),
    path("formDetails/<int:pk>/", FormDetailView.as_view()),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("formPerUser/<int:pk>/", FormPerUser.as_view(), name="formPer"),
    path("formByIdActive/<int:pk>/", FormByIdActive.as_view(), name="formByIdActive"),
    path("reviewByUser/<int:pk>/", userReviewView.as_view(), name="reviewByUser"), 
    path("userAnswersByForm/<int:pk>/", UserAnswerByForm.as_view(), name="userAnswersByForm"),
]

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

class Profile(models.Model):
    user_type_choices = (
        ("Admin", "Admin"),
        ("Default", "Default")
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=30)
    user_type = models.CharField(max_length=30, choices=user_type_choices)
    created_at = models.DateTimeField("data de criacao do user", auto_now_add=True, blank=True)

    def __str__(self):
        return self.user.username


class form(models.Model):
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=500)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField("data de criacao do form", auto_now_add=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class question(models.Model):
    answerType_choices = (
        (0, "text"),
        (1, "radio")
    )

    form = models.ForeignKey(form, on_delete=models.CASCADE, related_name="question_list")
    type = models.CharField(max_length=300, choices=answerType_choices)
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=300, null=True, blank=True)
    mandatory = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class answerOption(models.Model):
    text = models.CharField(max_length=300)
    question = models.ForeignKey(question, on_delete=models.CASCADE, related_name="options")
    voteCount = models.IntegerField(default=0)

    def __str__(self):
        return self.text + " + " + self.question.form.title


class userAnswer(models.Model):
    question = models.ForeignKey(question, on_delete=models.CASCADE)
    form = models.ForeignKey(form, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    answerText = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return str(self.user) + " -> " + self.answerOption.text + " -> " + self.answerOption.question.text + " -> " + self.form.title


class userReview(models.Model):
    user = models.OneToOneField(Profile, on_delete=models.CASCADE)
    username = models.CharField(max_length=30)
    review = models.CharField(max_length=300)
    grade = models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(5)])
